/**
 * tests/contract.verify.test.js
 * Contract verification — ss-browser → ss-worker.
 *
 * Strategy: replay each GET/POST interaction from the PACT contract against
 * the live worker. Validates response status and schema shape — not content.
 * LLM responses are non-deterministic; schema is the contract.
 *
 * Requires: live worker at cusslab-api.leanspirited.workers.dev (env TOKEN not needed for GET)
 * Run: node --test tests/contract.verify.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACT_PATH = join(__dirname, 'contracts', 'ss-browser-ss-worker.pact.json');
const BASE_URL = 'https://cusslab-api.leanspirited.workers.dev';
const CONTRACT_TIMEOUT_MS = 20000;

const contract = JSON.parse(readFileSync(PACT_PATH, 'utf8'));

// ── Helpers ──
function assertSchemaFields(obj, fields, context) {
  for (const field of fields) {
    assert.ok(Object.prototype.hasOwnProperty.call(obj, field),
      `${context}: missing required field '${field}'`);
  }
}

// ── GET route verification ──
describe('GET routes — return HTML with 200', () => {

  const getInteractions = contract.interactions.filter(i => i.request.method === 'GET');

  for (const interaction of getInteractions) {
    test(interaction.description, async () => {
      const response = await fetch(`${BASE_URL}${interaction.request.path}`, {
        signal: AbortSignal.timeout(CONTRACT_TIMEOUT_MS)
      });
      assert.strictEqual(response.status, interaction.response.status,
        `${interaction.request.path}: expected status ${interaction.response.status}`);
      const ct = response.headers.get('content-type') || '';
      assert.ok(ct.includes('text/html'),
        `${interaction.request.path}: expected text/html, got ${ct}`);
    });
  }
});

// ── POST /survival-school/assess — assessment mode schema ──
describe('POST /survival-school/assess — assessment mode', () => {

  test('returns 200 with structured JSON containing required schema fields', async () => {
    const interaction = contract.interactions.find(i =>
      i.request.method === 'POST' && i.description.includes('assessment mode')
    );
    assert.ok(interaction, 'contract interaction for assessment mode not found');

    const response = await fetch(`${BASE_URL}${interaction.request.path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(interaction.request.body),
      signal: AbortSignal.timeout(CONTRACT_TIMEOUT_MS)
    });

    assert.strictEqual(response.status, 200, 'expected HTTP 200');

    const data = await response.json();

    assertSchemaFields(data, interaction.response.schema.required, 'assessment response');

    assert.ok(Array.isArray(data.panel), 'panel must be an array');
    assert.ok(data.panel.length > 0, 'panel must not be empty');

    for (const card of data.panel) {
      assertSchemaFields(card, interaction.response.schema.panel_required_fields, 'panel card');
      assert.ok(typeof card.charId === 'string' && card.charId.length > 0,
        'panel card charId must be a non-empty string');
      assert.ok(typeof card.text === 'string' && card.text.length > 0,
        'panel card text must be a non-empty string');
    }

    const prob = data.survival_probability;
    const [min, max] = interaction.response.schema.probability_range;
    assert.ok(typeof prob === 'number' && prob >= min && prob <= max,
      `survival_probability must be ${min}–${max}, got ${prob}`);

    assert.ok(Array.isArray(data.next_actions) && data.next_actions.length > 0,
      'next_actions must be a non-empty array');
  });
});

// ── POST /survival-school/assess — mundane mode schema ──
describe('POST /survival-school/assess — mundane mode', () => {

  test('returns 200 with structured JSON for mundane scenario', async () => {
    const interaction = contract.interactions.find(i =>
      i.request.method === 'POST' && i.description.includes('mundane mode')
    );
    assert.ok(interaction, 'contract interaction for mundane mode not found');

    const response = await fetch(`${BASE_URL}${interaction.request.path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(interaction.request.body),
      signal: AbortSignal.timeout(CONTRACT_TIMEOUT_MS)
    });

    assert.strictEqual(response.status, 200, 'expected HTTP 200');

    const data = await response.json();

    assertSchemaFields(data, interaction.response.schema.required, 'mundane response');
    assert.ok(Array.isArray(data.panel), 'panel must be an array');

    const prob = data.survival_probability;
    const [min, max] = interaction.response.schema.probability_range;
    assert.ok(typeof prob === 'number' && prob >= min && prob <= max,
      `survival_probability must be ${min}–${max}, got ${prob}`);
  });
});
