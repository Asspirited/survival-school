#!/bin/bash
# check-auth.sh — Survival School auth canary
# Exits 0 (GREEN) if auth is valid. Exits 1 (RED) if not.
# Usage: bash scripts/check-auth.sh
# Requires: CLOUDFLARE_API_TOKEN in env or ~/.bashrc

ERRORS=0

# ── Load token from ~/.bashrc if not in env ──
if [ -z "${CLOUDFLARE_API_TOKEN:-}" ] && [ -f "$HOME/.bashrc" ]; then
  TOKEN_LINE=$(grep -E '^export CLOUDFLARE_API_TOKEN=' "$HOME/.bashrc" | tail -1)
  if [ -n "$TOKEN_LINE" ]; then
    eval "$TOKEN_LINE"
    export CLOUDFLARE_API_TOKEN
  fi
fi

# ── Check 1: Token present ──
if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
  echo "RED: CLOUDFLARE_API_TOKEN not set"
  echo "     Get token: dash.cloudflare.com → My Profile → API Tokens → Edit Cloudflare Workers"
  ERRORS=$((ERRORS+1))
else
  echo "GREEN: CLOUDFLARE_API_TOKEN present"
fi

# ── Check 2: Token valid (wrangler whoami) ──
if [ -n "${CLOUDFLARE_API_TOKEN:-}" ]; then
  WHOAMI=$(CLOUDFLARE_API_TOKEN="$CLOUDFLARE_API_TOKEN" npx wrangler whoami 2>&1)
  if echo "$WHOAMI" | grep -qi "leanspirited@gmail.com"; then
    echo "GREEN: Cloudflare auth valid (leanspirited@gmail.com)"
  else
    echo "RED: Cloudflare auth failed — token may be expired"
    echo "     Fix: dash.cloudflare.com → My Profile → API Tokens → Create Token → Edit Cloudflare Workers"
    ERRORS=$((ERRORS+1))
  fi
else
  echo "SKIP: wrangler whoami skipped (no token)"
fi

# ── Check 3: Worker endpoint reachable ──
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  "https://cusslab-api.leanspirited.workers.dev/survival-school" 2>/dev/null || echo "000")
if [ "$HTTP_STATUS" = "200" ]; then
  echo "GREEN: Worker endpoint reachable (HTTP 200)"
else
  echo "RED: Worker endpoint returned HTTP $HTTP_STATUS"
  ERRORS=$((ERRORS+1))
fi

if [ $ERRORS -gt 0 ]; then
  echo ""
  echo "AUTH FAILED — $ERRORS error(s). Stop. Fix auth before continuing."
  exit 1
fi

echo ""
echo "AUTH OK"
exit 0
