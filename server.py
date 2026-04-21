#!/usr/bin/env python3
"""
LangMap dev server — serves static files + handles POST /submit.php
Usage: python3 server.py [port]   (default: 8001)
"""

import http.server
import json
import os
import hashlib
import secrets
import sys
from datetime import datetime
from pathlib import Path

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8001
SUBMISSIONS_DIR = Path(__file__).parent / 'submissions'
SUBMISSIONS_DIR.mkdir(exist_ok=True)

# Simple in-memory CSRF tokens and rate limiting
csrf_tokens = {}  # token -> timestamp
rate_limits = {}  # ip_hash -> [timestamps]

class LangMapHandler(http.server.SimpleHTTPRequestHandler):

    def do_GET(self):
        if self.path.startswith('/submit.php?csrf=1'):
            self._handle_csrf()
        else:
            super().do_GET()

    def do_POST(self):
        if self.path == '/submit.php':
            self._handle_submit()
        else:
            self.send_error(404)

    def _handle_csrf(self):
        token = secrets.token_hex(32)
        csrf_tokens[token] = datetime.now().timestamp()
        # Prune old tokens (>1hr)
        now = datetime.now().timestamp()
        for t in list(csrf_tokens):
            if now - csrf_tokens[t] > 3600:
                del csrf_tokens[t]
        self._json_response({'token': token})

    def _handle_submit(self):
        try:
            length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(length)
            data = json.loads(body)
        except Exception:
            self._json_response({'error': 'Invalid JSON'}, 400)
            return

        # Honeypot
        if data.get('website'):
            self._json_response({'ok': True})
            return

        # CSRF (best-effort)
        token = data.get('csrf_token', '')
        csrf_valid = token in csrf_tokens
        if csrf_valid:
            del csrf_tokens[token]

        # Rate limiting
        ip = self.client_address[0]
        ip_hash = hashlib.sha256(f'{ip}:langmap'.encode()).hexdigest()[:16]
        now = datetime.now().timestamp()
        hits = rate_limits.get(ip_hash, [])
        hits = [t for t in hits if now - t < 3600]
        if len(hits) >= 20:
            self._json_response({'error': 'Too many submissions'}, 429)
            return
        hits.append(now)
        rate_limits[ip_hash] = hits

        corrections = data.get('corrections', [])
        if not corrections:
            self._json_response({'error': 'No corrections'}, 400)
            return

        entry = {
            'timestamp': datetime.now().isoformat(),
            'ip_hash': ip_hash,
            'csrf_valid': csrf_valid,
            'name': (data.get('name') or 'Anonymous')[:100],
            'email': (data.get('email') or '')[:200],
            'corrections': corrections[:50],
        }

        # Save to date-based file
        date_str = datetime.now().strftime('%Y-%m-%d')
        filepath = SUBMISSIONS_DIR / f'{date_str}.json'
        existing = json.loads(filepath.read_text()) if filepath.exists() else []
        existing.append(entry)
        filepath.write_text(json.dumps(existing, ensure_ascii=False, indent=2))

        uuids = [c.get('uuid') for c in corrections if c.get('uuid')]
        self._json_response({'ok': True, 'count': len(corrections), 'uuids': uuids})
        print(f'  ✓ Submission received: {len(corrections)} correction(s) from {entry["name"]}')

    def _json_response(self, data, status=200):
        body = json.dumps(data).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', len(body))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format, *args):
        if '/submit.php' in (args[0] if args else ''):
            super().log_message(format, *args)

if __name__ == '__main__':
    os.chdir(Path(__file__).parent)
    with http.server.HTTPServer(('', PORT), LangMapHandler) as httpd:
        print(f'🌍 LangMap server running at http://localhost:{PORT}')
        print(f'   Static files + POST /submit.php')
        print(f'   Submissions saved to {SUBMISSIONS_DIR}/')
        httpd.serve_forever()
