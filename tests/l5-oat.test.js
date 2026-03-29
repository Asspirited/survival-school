/**
 * tests/l5-oat.test.js
 * L5 — Operational Acceptance Testing (post-deploy)
 *
 * Validates the LIVE deployed worker for operational health:
 * - Liveness: every route responds correctly
 * - Performance: response times within thresholds
 * - Schema: POST endpoints return valid JSON with required fields
 * - Security: no secrets exposed in responses
 *
 * Distinct from L2 (contract tests): L5 runs post-deploy against the
 * just-released version. L2 runs pre-commit against whatever is deployed.
 *
 * Run: node --test tests/l5-oat.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

const BASE_URL = 'https://cusslab-api.leanspirited.workers.dev';
const GET_TIMEOUT_MS = 5000;
const POST_TIMEOUT_MS = 30000;

const GET_ROUTES = [
  '/survival-school',
  '/survival-school/app',
  '/survival-school/worst',
  '/survival-school/mundane',
  '/survival-school/eat',
  '/survival-school/deathmatch',
  '/survival-school/fact-checker',
  '/survival-school/coyote',
  '/survival-school/panel-qa',
  '/survival-school/rooms',
  '/survival-school/ive-had-worse',
  '/survival-school/in-my-defence',
  '/survival-school/irwin-memorial',
];

const SECRET_PATTERNS = ['sk-ant-', 'ANTHROPIC_API_KEY', 'CLOUDFLARE_API_TOKEN'];

// ── Helpers ──
async function timedFetch(url, options = {}) {
  const start = Date.now();
  const response = await fetch(url, options);
  const elapsed = Date.now() - start;
  return { response, elapsed };
}

// ── GET route liveness + performance ──
describe('L5 OAT — GET routes return HTML with 200 under 5s', () => {
  for (const route of GET_ROUTES) {
    test(`GET ${route}`, async () => {
      const { response, elapsed } = await timedFetch(`${BASE_URL}${route}`, {
        signal: AbortSignal.timeout(GET_TIMEOUT_MS),
      });
      assert.strictEqual(response.status, 200, `${route}: expected 200, got ${response.status}`);
      const ct = response.headers.get('content-type') || '';
      assert.ok(ct.includes('text/html'), `${route}: expected text/html, got ${ct}`);
      assert.ok(elapsed < GET_TIMEOUT_MS, `${route}: response took ${elapsed}ms (limit ${GET_TIMEOUT_MS}ms)`);
    });
  }
});

// ── POST /assess schema + performance ──
describe('L5 OAT — POST /assess returns valid schema under 30s', () => {
  test('POST /survival-school/assess', async () => {
    const { response, elapsed } = await timedFetch(`${BASE_URL}/survival-school/assess`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system: 'You are the Survival School panel. Respond ONLY with valid JSON matching exactly: {"survival_probability":<integer 0-100>,"attenborough_opening":"<string>","panel":[{"charId":"<string>","text":"<string>","death":<bool>}],"attenborough_verdict":"<string>","next_actions":["<string>"]}. No markdown. No prose. JSON only.',
        situation: 'Location: jungle\nSituation: lost after river crossing',
      }),
      signal: AbortSignal.timeout(POST_TIMEOUT_MS),
    });
    assert.strictEqual(response.status, 200, `Expected 200, got ${response.status}`);
    const ct = response.headers.get('content-type') || '';
    assert.ok(ct.includes('application/json'), `Expected application/json, got ${ct}`);

    const body = await response.json();
    assert.ok(typeof body.survival_probability === 'number',
      `survival_probability should be number, got ${typeof body.survival_probability}`);
    assert.ok(body.survival_probability >= 0 && body.survival_probability <= 100,
      `survival_probability ${body.survival_probability} out of 0-100 range`);
    assert.ok(Array.isArray(body.panel) && body.panel.length > 0,
      'panel should be a non-empty array');
    assert.ok(elapsed < POST_TIMEOUT_MS,
      `Response took ${elapsed}ms (limit ${POST_TIMEOUT_MS}ms)`);
  });
});

// ── POST /ive-had-worse schema + performance ──
describe('L5 OAT — POST /ive-had-worse returns valid schema under 30s', () => {
  test('POST /survival-school/ive-had-worse', async () => {
    const { response, elapsed } = await timedFetch(`${BASE_URL}/survival-school/ive-had-worse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        protagonist: 'grylls',
        predicament: 'Stuck on a cliff with a broken rope',
        round: 1,
        history: [],
        composureState: {},
      }),
      signal: AbortSignal.timeout(POST_TIMEOUT_MS),
    });
    assert.strictEqual(response.status, 200, `Expected 200, got ${response.status}`);
    const ct = response.headers.get('content-type') || '';
    assert.ok(ct.includes('application/json'), `Expected application/json, got ${ct}`);
    assert.ok(elapsed < POST_TIMEOUT_MS,
      `Response took ${elapsed}ms (limit ${POST_TIMEOUT_MS}ms)`);
  });
});

// ── No secrets in responses ──
describe('L5 OAT — No secrets exposed in GET responses', () => {
  for (const route of GET_ROUTES) {
    test(`No secrets in ${route}`, async () => {
      const response = await fetch(`${BASE_URL}${route}`, {
        signal: AbortSignal.timeout(GET_TIMEOUT_MS),
      });
      const body = await response.text();
      for (const pattern of SECRET_PATTERNS) {
        assert.ok(!body.includes(pattern),
          `${route}: response body contains secret pattern "${pattern}"`);
      }
    });
  }
});
