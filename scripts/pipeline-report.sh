#!/bin/bash
# pipeline-report.sh — Survival School full pipeline runner
# Six layers: L0 Auth → L1 Unit → L2 Contract → L3 Acceptance → L4 UI → L5 OAT
# Exits 1 if any layer is RED.
# Usage: bash scripts/pipeline-report.sh

cd "$(dirname "$0")/.."

export NVM_DIR="/home/rodent/.nvm"
# shellcheck disable=SC1091
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# ── Load token from env or .bashrc ──
if [ -z "${CLOUDFLARE_API_TOKEN:-}" ] && [ -f "$HOME/.bashrc" ]; then
  TOKEN_LINE=$(grep -E '^export CLOUDFLARE_API_TOKEN=' "$HOME/.bashrc" | tail -1)
  if [ -n "$TOKEN_LINE" ]; then
    eval "$TOKEN_LINE"
    export CLOUDFLARE_API_TOKEN
  fi
fi

ERRORS=0
START_TIME=$(date +%s)

# Timers
L0_TIME=0; L1_TIME=0; L2_TIME=0; L3_TIME=0; L4_TIME=0; L5_TIME=0
L0_RESULT="—"; L1_RESULT="—"; L2_RESULT="—"
L3_RESULT="SKIP"; L4_RESULT="SKIP"; L5_RESULT="SKIP"
L1_PASS=0; L1_FAIL=0; L2_PASS=0; L2_FAIL=0; L3_PASS=0; L3_FAIL=0

separator() { echo ""; echo "────────────────────────────────────────"; }

parse_pass() { echo "$1" | grep -oP '(?<=# pass )\d+' | tail -1 || echo "0"; }
parse_fail() { echo "$1" | grep -oP '(?<=# fail )\d+' | tail -1 || echo "0"; }

# ── L0: Auth canary ──
separator
echo "L0 — AUTH CANARY"
L0_START=$(date +%s%3N)
if bash scripts/check-auth.sh; then
  L0_RESULT="GREEN"
else
  L0_RESULT="RED"
  ERRORS=$((ERRORS+1))
fi
L0_END=$(date +%s%3N)
L0_TIME=$(( (L0_END - L0_START) ))
echo "L0: $L0_RESULT (${L0_TIME}ms)"

if [ "$L0_RESULT" = "RED" ]; then
  echo ""
  echo "PIPELINE STOPPED — auth failed. Fix L0 before proceeding."
  exit 1
fi

# ── L1: Unit tests (domain) ──
separator
echo "L1 — UNIT TESTS (domain)"
L1_START=$(date +%s%3N)
L1_OUT=$(node --test --experimental-test-coverage tests/domain.test.js tests/domain-worst.test.js tests/domain-characters.test.js 2>&1)
L1_EXIT=$?
L1_END=$(date +%s%3N)
L1_TIME=$(( (L1_END - L1_START) ))
L1_PASS=$(parse_pass "$L1_OUT")
L1_FAIL=$(parse_fail "$L1_OUT")
if [ $L1_EXIT -eq 0 ] && [ "$L1_FAIL" = "0" ]; then
  L1_RESULT="GREEN"
else
  L1_RESULT="RED"
  ERRORS=$((ERRORS+1))
fi
echo "$L1_OUT" | grep -E "(PASS|FAIL|coverage|statements|branches)" | head -20
echo "L1: $L1_RESULT — passed: $L1_PASS | failed: $L1_FAIL (${L1_TIME}ms)"

# ── L2: Contract tests ──
separator
echo "L2 — CONTRACT TESTS (PACT schema verification)"
L2_START=$(date +%s%3N)
L2_OUT=$(node --test tests/contract.verify.test.js 2>&1)
L2_EXIT=$?
L2_END=$(date +%s%3N)
L2_TIME=$(( (L2_END - L2_START) ))
L2_PASS=$(parse_pass "$L2_OUT")
L2_FAIL=$(parse_fail "$L2_OUT")
if [ $L2_EXIT -eq 0 ] && [ "$L2_FAIL" = "0" ]; then
  L2_RESULT="GREEN"
else
  L2_RESULT="RED"
  ERRORS=$((ERRORS+1))
fi
echo "$L2_OUT" | grep -E "(PASS|FAIL|ok|not ok)" | head -20
echo "L2: $L2_RESULT — passed: $L2_PASS | failed: $L2_FAIL (${L2_TIME}ms)"

# ── L3: Acceptance tests (Gherkin-derived) ──
separator
echo "L3 — ACCEPTANCE TESTS (Gherkin scenarios)"
L3_START=$(date +%s%3N)
L3_OUT=$(node --test tests/acceptance/acceptance.test.js 2>&1)
L3_EXIT=$?
L3_END=$(date +%s%3N)
L3_TIME=$(( (L3_END - L3_START) ))
L3_PASS=$(parse_pass "$L3_OUT")
L3_FAIL=$(parse_fail "$L3_OUT")
if [ $L3_EXIT -eq 0 ] && [ "$L3_FAIL" = "0" ]; then
  L3_RESULT="GREEN"
else
  L3_RESULT="RED"
  ERRORS=$((ERRORS+1))
fi
echo "$L3_OUT" | grep -E "(PASS|FAIL|ok|not ok)" | head -20
echo "L3: $L3_RESULT — passed: $L3_PASS | failed: $L3_FAIL (${L3_TIME}ms)"

# ── L4: UI tests (Playwright) ──
separator
echo "L4 — UI TESTS (Playwright)"
L4_START=$(date +%s%3N)
L4_PASS=0; L4_FAIL=0
if [ -f "tests/ui/ui.test.js" ] && [ -d "node_modules/@playwright/test" ]; then
  L4_OUT=$(npx playwright test --config playwright.config.js --reporter=list 2>&1)
  L4_EXIT=$?
  L4_END=$(date +%s%3N)
  L4_TIME=$(( (L4_END - L4_START) ))
  # Parse playwright output: "X passed" and "X failed"
  L4_PASS=$(echo "$L4_OUT" | grep -oP '\d+(?= passed)' | tail -1 || echo "0")
  L4_FAIL=$(echo "$L4_OUT" | grep -oP '\d+(?= failed)' | tail -1 || echo "0")
  [ -z "$L4_PASS" ] && L4_PASS=0
  [ -z "$L4_FAIL" ] && L4_FAIL=0
  echo "$L4_OUT" | grep -E "(PASS|FAIL|passed|failed|✓|✗|×)" | head -30
  if [ $L4_EXIT -eq 0 ] && [ "$L4_FAIL" = "0" ]; then
    L4_RESULT="GREEN"
  else
    L4_RESULT="RED"
    ERRORS=$((ERRORS+1))
  fi
  echo "L4: $L4_RESULT — passed: $L4_PASS | failed: $L4_FAIL (${L4_TIME}ms)"
else
  echo "L4: SKIP — run 'npm install' to enable Playwright UI tests"
  L4_RESULT="SKIP"
fi

# ── L5: OAT ──
separator
echo "L5 — OAT (Operational Acceptance)"
echo "L5: SKIP — OAT not yet defined"
L5_RESULT="SKIP"

# ── Summary ──
END_TIME=$(date +%s)
TOTAL_TIME=$(( END_TIME - START_TIME ))

separator
echo ""
echo "SURVIVAL SCHOOL — PIPELINE REPORT"
echo "$(date '+%Y-%m-%d %H:%M')"
echo ""
printf "  %-6s  %-12s  %s\n" "Layer" "Result" "Detail"
printf "  %-6s  %-12s  %s\n" "──────" "──────────" "──────"
printf "  %-6s  %-12s  %s\n" "L0" "$L0_RESULT" "Auth canary (${L0_TIME}ms)"
printf "  %-6s  %-12s  %s\n" "L1" "$L1_RESULT" "Unit — pass:$L1_PASS fail:$L1_FAIL (${L1_TIME}ms)"
printf "  %-6s  %-12s  %s\n" "L2" "$L2_RESULT" "Contract — pass:$L2_PASS fail:$L2_FAIL (${L2_TIME}ms)"
printf "  %-6s  %-12s  %s\n" "L3" "$L3_RESULT" "Acceptance — pass:$L3_PASS fail:$L3_FAIL (${L3_TIME}ms)"
printf "  %-6s  %-12s  %s\n" "L4" "$L4_RESULT" "UI/Playwright — pass:$L4_PASS fail:$L4_FAIL (${L4_TIME}ms)"
printf "  %-6s  %-12s  %s\n" "L5" "$L5_RESULT" "OAT"
echo ""

if [ $ERRORS -gt 0 ]; then
  echo "PIPELINE RED — $ERRORS layer(s) failed. Do not deploy."
  echo ""
  exit 1
else
  echo "PIPELINE GREEN — all layers pass. Safe to deploy."
  echo ""
  exit 0
fi
