#!/bin/bash

# 프로젝트 루트의 .env 파일에서 환경 변수 로드
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/../.env"
if [ -f "$ENV_FILE" ]; then
  export $(grep -v '^#' "$ENV_FILE" | xargs)
fi

# 프로젝트명, 현재 시간 설정
PROJECT_NAME=$(jq -r '.name // "unknown"' "$SCRIPT_DIR/../package.json" 2>/dev/null || basename "$SCRIPT_DIR/..")
CURRENT_TIME=$(date '+%Y-%m-%d %H:%M:%S')

# Claude Code가 전달하는 알림 메시지 파싱
INPUT=$(cat)
MSG=$(echo "$INPUT" | jq -r '.message // "새로운 알림"' 2>/dev/null || echo "새로운 알림")

# 슬랙 전송 페이로드 구성
PAYLOAD=$(jq -n \
  --arg project "$PROJECT_NAME" \
  --arg time "$CURRENT_TIME" \
  --arg msg "$MSG" \
  '{
    text: "🔔 *Claude Code 알림*",
    attachments: [
      {
        color: "#f0a500",
        fields: [
          { title: "프로젝트", value: $project, short: true },
          { title: "상태", value: "⏳ 응답 대기 중", short: true },
          { title: "시간", value: $time, short: true },
          { title: "메시지", value: $msg, short: false }
        ]
      }
    ]
  }')

curl -s -o /dev/null -X POST \
  -H 'Content-type: application/json' \
  -d "$PAYLOAD" \
  "${SLACK_WEBHOOK_URL}" 2>/dev/null || true
