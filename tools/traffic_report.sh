#!/usr/bin/env bash
#
# traffic_report.sh — langmaps.com のアクセスログから「流入元(リファラー)」を集計
#
# 使い方:
#   sudo bash tools/traffic_report.sh            # 保持されている全ログ(約2週間)
#   sudo bash tools/traffic_report.sh today      # 今日のログ(未ローテート分)だけ
#   TOP=50 sudo -E bash tools/traffic_report.sh  # 表示件数を変える
#   LOGGLOB='/var/log/nginx/langmaps.com.access.log.1' sudo -E bash tools/traffic_report.sh
#
# 前提: nginx デフォルト combined 形式
#   $remote_addr - $remote_user [$time_local] "$request" $status $bytes "$referer" "$ua"
# sudo が必要な理由: ログは www-data:adm / 640 で一般ユーザーは読めない。

set -euo pipefail
export LC_ALL=C

TOP="${TOP:-30}"                              # 各ランキングの表示件数
SELF='langmaps\.com|langmap\.heuron\.com'     # 自ドメイン(リファラーから除外)

# --- 対象ログの決定 -----------------------------------------------------------
if [[ "${1:-}" == "today" ]]; then
  FILES=(/var/log/nginx/langmaps.com.access.log)
elif [[ -n "${LOGGLOB:-}" ]]; then
  # shellcheck disable=SC2206
  FILES=($LOGGLOB)
else
  FILES=(/var/log/nginx/langmaps.com.access.log*)
fi

read_logs() { zcat -f "${FILES[@]}"; }        # .gz も平文もまとめて読む
hr() { printf '\n=== %s ===\n' "$1"; }

# --- 概況 ---------------------------------------------------------------------
hr "対象と期間"
printf 'files: %s\n' "${FILES[*]}"
read_logs | awk '
  NR==1 {first=$4} {last=$4; n++}
  END { gsub(/\[/,"",first); gsub(/\[/,"",last)
        printf "総リクエスト数: %d\n最初: %s\n最後: %s\n", n, first, last }'

# --- リファラー種別の内訳(直接 / 自サイト内 / 外部) --------------------------
hr "リファラー種別の内訳"
read_logs | awk -F'"' -v self="$SELF" '
  { r=$4
    if (r=="-")                     direct++
    else if (r ~ ("://(" self ")")) internal++
    else                            external++
    tot++ }
  END {
    printf "直接/不明(-)   : %9d (%.1f%%)\n", direct,   100*direct/tot
    printf "自サイト内遷移 : %9d (%.1f%%)\n", internal, 100*internal/tot
    printf "外部からの流入 : %9d (%.1f%%)  ← 下で詳細\n", external, 100*external/tot }'

# --- 外部リファラー: ドメイン別 上位 -----------------------------------------
hr "流入元ドメイン 上位${TOP}(自サイト・空を除外)"
read_logs \
  | awk -F'"' '{print $4}' \
  | grep -vE "^-$|://($SELF)" \
  | sed -E 's#^(https?://[^/]+).*#\1#' \
  | sort | uniq -c | sort -rn | head -n "$TOP"

# --- 外部リファラー: 完全URL 上位(どの記事/投稿から来たか) -------------------
hr "流入元URL(完全) 上位${TOP}"
read_logs \
  | awk -F'"' '{print $4}' \
  | grep -vE "^-$|://($SELF)" \
  | sort | uniq -c | sort -rn | head -n "$TOP"

# --- チャネル分類(検索 / SNS / その他外部) -----------------------------------
hr "流入チャネル分類(外部リファラーを分類)"
read_logs \
  | awk -F'"' '{print $4}' \
  | grep -vE "^-$|://($SELF)" \
  | awk '
    /google\.|bing\.|yahoo|duckduckgo|yandex|baidu|naver|ecosia|brave|startpage/ {s["検索エンジン"]++; next}
    /t\.co|twitter|x\.com|facebook|fb\.|instagram|reddit|youtube|linkedin|pinterest|tiktok|news\.ycombinator|lobste|mastodon|bsky|t\.me|telegram|whatsapp|line\./ {s["SNS/コミュニティ"]++; next}
    { s["その他サイト"]++ }
    END { for (k in s) printf "%-16s %9d\n", k, s[k] }' \
  | sort -k2 -rn

hr "完了"
