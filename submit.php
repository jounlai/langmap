<?php
/**
 * LangMap Community Correction Receiver
 *
 * Endpoints:
 *   GET  ?csrf=1       → returns a CSRF token
 *   POST (JSON body)   → saves corrections to date-based file
 *
 * Anti-abuse: CSRF token, honeypot field, IP rate limiting
 */

header('Content-Type: application/json; charset=utf-8');

// ── CSRF token endpoint ────────────────────────────
if (isset($_GET['csrf'])) {
    session_start();
    $token = bin2hex(random_bytes(32));
    $_SESSION['csrf_token'] = $token;
    $_SESSION['csrf_time'] = time();
    echo json_encode(['token' => $token]);
    exit;
}

// ── Only POST accepted ─────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

session_start();

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// ── Honeypot check (bot trap) ──────────────────────
if (!empty($input['website'])) {
    // Silently accept to not tip off bots
    echo json_encode(['ok' => true]);
    exit;
}

// ── CSRF validation ────────────────────────────────
$token = $input['csrf_token'] ?? '';
$sessionToken = $_SESSION['csrf_token'] ?? '';
$tokenAge = time() - ($_SESSION['csrf_time'] ?? 0);

if (empty($token) || $token !== $sessionToken || $tokenAge > 3600) {
    http_response_code(403);
    echo json_encode(['error' => 'Invalid or expired token']);
    exit;
}

// ── IP rate limiting (max 20 submissions/hour) ─────
$dir = __DIR__ . '/submissions';
if (!is_dir($dir)) mkdir($dir, 0755, true);

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ipHash = hash('sha256', $ip . 'langmap-salt-2026');
$rateFile = "$dir/.ratelimit.json";

$rates = file_exists($rateFile) ? json_decode(file_get_contents($rateFile), true) : [];
$now = time();
$oneHourAgo = $now - 3600;

// Prune old entries
foreach ($rates as $h => $times) {
    $rates[$h] = array_values(array_filter($times, fn($t) => $t > $oneHourAgo));
    if (empty($rates[$h])) unset($rates[$h]);
}

$myHits = $rates[$ipHash] ?? [];
if (count($myHits) >= 20) {
    http_response_code(429);
    echo json_encode(['error' => 'Too many submissions. Please try again later.']);
    exit;
}

$myHits[] = $now;
$rates[$ipHash] = $myHits;
file_put_contents($rateFile, json_encode($rates));

// ── Validate & sanitize corrections ────────────────
$corrections = $input['corrections'] ?? [];
if (empty($corrections) || !is_array($corrections)) {
    http_response_code(400);
    echo json_encode(['error' => 'No corrections provided']);
    exit;
}

// Limit to 50 corrections per submission
$corrections = array_slice($corrections, 0, 50);

$entry = [
    'timestamp' => date('c'),
    'ip_hash' => $ipHash,
    'name' => mb_substr($input['name'] ?? 'Anonymous', 0, 100),
    'email' => mb_substr($input['email'] ?? '', 0, 200),
    'corrections' => $corrections,  // Each correction has client-side UUID
];

// ── Save to date-based file ────────────────────────
$date = date('Y-m-d');
$filepath = "$dir/$date.json";

$existing = file_exists($filepath)
    ? json_decode(file_get_contents($filepath), true)
    : [];
$existing[] = $entry;

file_put_contents(
    $filepath,
    json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE),
    LOCK_EX
);

// ── Invalidate CSRF token (single use) ─────────────
unset($_SESSION['csrf_token']);

// Return UUIDs of received corrections for client-side tracking
$uuids = array_map(fn($c) => $c['uuid'] ?? null, $corrections);
echo json_encode([
    'ok' => true,
    'count' => count($corrections),
    'uuids' => array_filter($uuids),
]);
