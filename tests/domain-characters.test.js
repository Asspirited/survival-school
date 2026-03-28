/**
 * tests/domain-characters.test.js
 * Unit tests for js/characters.js — buildSystemPrompt() pure function.
 *
 * Tests schema requirements for each mode — not LLM content.
 * Run: node --test tests/domain-characters.test.js
 */

import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';

import { buildSystemPrompt, CHARACTERS, PANEL_IDS, PANEL_POOL, drawPanel, CHAR_COLOURS } from '../js/characters.js';

// ── SS-065 — Panel pool + drawPanel ──────────────────────────────────────────

describe('PANEL_POOL — SS-065', () => {
  test('PANEL_POOL is defined and non-empty', () => {
    assert.ok(Array.isArray(PANEL_POOL), 'PANEL_POOL must be an array');
    assert.ok(PANEL_POOL.length > 0, 'PANEL_POOL must have at least one entry');
  });

  test('attenborough is not in PANEL_POOL', () => {
    assert.ok(!PANEL_POOL.includes('attenborough'),
      'attenborough must not be in PANEL_POOL — he bookends only');
  });

  test('every pool member has a CHARACTERS entry', () => {
    for (const id of PANEL_POOL) {
      assert.ok(Object.prototype.hasOwnProperty.call(CHARACTERS, id),
        `PANEL_POOL includes '${id}' but CHARACTERS has no entry`);
    }
  });
});

describe('drawPanel — SS-065', () => {
  test('draws 4 or 5 characters', () => {
    for (let i = 0; i < 20; i++) {
      const drawn = drawPanel();
      assert.ok(drawn.length >= 4 && drawn.length <= 5,
        `drawPanel must return 4–5 characters, got ${drawn.length}`);
    }
  });

  test('drawn characters are all in PANEL_POOL', () => {
    const drawn = drawPanel();
    for (const id of drawn) {
      assert.ok(PANEL_POOL.includes(id),
        `drawn character '${id}' is not in PANEL_POOL`);
    }
  });

  test('no duplicates in drawn panel', () => {
    const drawn = drawPanel();
    const unique = new Set(drawn);
    assert.strictEqual(unique.size, drawn.length, 'drawPanel must not return duplicate characters');
  });

  test('attenborough is never drawn', () => {
    for (let i = 0; i < 20; i++) {
      const drawn = drawPanel();
      assert.ok(!drawn.includes('attenborough'), 'attenborough must never be drawn');
    }
  });
});

// ── SS-058 — Per-character colour map ────────────────────────────────────────

describe('CHAR_COLOURS — SS-058', () => {
  test('CHAR_COLOURS is defined and is an object', () => {
    assert.ok(CHAR_COLOURS && typeof CHAR_COLOURS === 'object', 'CHAR_COLOURS must be exported');
  });

  test('every PANEL_POOL member has a colour entry', () => {
    for (const id of PANEL_POOL) {
      assert.ok(Object.prototype.hasOwnProperty.call(CHAR_COLOURS, id),
        `CHAR_COLOURS missing entry for pool member '${id}'`);
    }
  });

  test('attenborough has a colour entry', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHAR_COLOURS, 'attenborough'),
      "CHAR_COLOURS must include 'attenborough'");
  });

  test('all colour values are valid 6-digit hex strings', () => {
    for (const [id, hex] of Object.entries(CHAR_COLOURS)) {
      assert.match(hex, /^#[0-9A-Fa-f]{6}$/,
        `CHAR_COLOURS['${id}'] must be a valid 6-digit hex colour, got '${hex}'`);
    }
  });
});

// ── CHARACTERS ───────────────────────────────────────────────────────────────

describe('CHARACTERS', () => {
  test('all PANEL_IDS have a corresponding character', () => {
    for (const id of PANEL_IDS) {
      assert.ok(Object.prototype.hasOwnProperty.call(CHARACTERS, id),
        `PANEL_IDS includes '${id}' but CHARACTERS has no entry for it`);
    }
  });

  test('attenborough is a character but not in PANEL_IDS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHARACTERS, 'attenborough'),
      'CHARACTERS must include attenborough');
    assert.ok(!PANEL_IDS.includes('attenborough'),
      'attenborough must NOT be in PANEL_IDS — he bookends, not panels');
  });

  test('each character has id, name, role, voice, deathLine', () => {
    for (const [key, char] of Object.entries(CHARACTERS)) {
      assert.ok(char.id, `${key}: missing id`);
      assert.ok(char.name, `${key}: missing name`);
      assert.ok(char.role, `${key}: missing role`);
      assert.ok(char.voice, `${key}: missing voice`);
      assert.ok('deathLine' in char, `${key}: missing deathLine`);
    }
  });
});

// ── buildSystemPrompt — shared contract ──────────────────────────────────────

describe('buildSystemPrompt — all modes return a string', () => {
  for (const mode of ['assessment', 'reaction', 'mundane', 'qa']) {
    test(`mode '${mode}' returns a non-empty string`, () => {
      const prompt = buildSystemPrompt(mode);
      assert.strictEqual(typeof prompt, 'string');
      assert.ok(prompt.length > 0, `prompt for mode '${mode}' must not be empty`);
    });
  }
});

// ── buildSystemPrompt('qa') — Panel Q&A mode ─────────────────────────────────

describe("buildSystemPrompt('qa') — Panel Q&A mode", () => {

  let prompt;
  before(() => { prompt = buildSystemPrompt('qa'); });

  // Schema fields
  test('prompt requires panel_dynamic in JSON output schema', () => {
    assert.ok(prompt.includes('panel_dynamic'),
      "qa prompt must reference 'panel_dynamic' in output schema");
  });

  test('prompt requires attenborough_opening in JSON output schema', () => {
    assert.ok(prompt.includes('attenborough_opening'),
      "qa prompt must reference 'attenborough_opening' in output schema");
  });

  test('prompt requires attenborough_verdict in JSON output schema', () => {
    assert.ok(prompt.includes('attenborough_verdict'),
      "qa prompt must reference 'attenborough_verdict' in output schema");
  });

  // Contradiction Engine
  test('prompt instructs contradiction engine with four valid types', () => {
    assert.ok(prompt.includes('one_wrong'),  "qa prompt must name 'one_wrong' type");
    assert.ok(prompt.includes('both_wrong'), "qa prompt must name 'both_wrong' type");
    assert.ok(prompt.includes('both_right'), "qa prompt must name 'both_right' type");
    assert.ok(prompt.includes('consensus'),  "qa prompt must name 'consensus' type");
  });

  test('prompt instructs Attenborough to bookend and not appear in panel array', () => {
    assert.ok(prompt.includes('Attenborough'),
      "qa prompt must reference Attenborough");
    assert.ok(
      prompt.toLowerCase().includes('bookend') ||
      prompt.includes('attenborough_opening'),
      "qa prompt must instruct Attenborough bookend structure"
    );
  });

  test('prompt instructs triage order — IMMEDIATE before COMEDY in triage section', () => {
    const triageIdx = prompt.indexOf('PANEL TRIAGE ORDER');
    assert.ok(triageIdx !== -1, "qa prompt must contain PANEL TRIAGE ORDER section");
    const triageSection = prompt.slice(triageIdx);
    const immediateIdx = triageSection.indexOf('IMMEDIATE');
    const comedyIdx = triageSection.indexOf('COMEDY');
    assert.ok(immediateIdx !== -1, "triage section must reference IMMEDIATE tier");
    assert.ok(comedyIdx !== -1, "triage section must reference COMEDY tier");
    assert.ok(immediateIdx < comedyIdx,
      "IMMEDIATE tier must appear before COMEDY tier in triage section");
  });

  // panel_dynamic schema completeness
  test('panel_dynamic.type must list all four contradiction types in schema', () => {
    const types = ['one_wrong', 'both_wrong', 'both_right', 'consensus'];
    for (const t of types) {
      assert.ok(prompt.includes(t), `qa prompt schema must include type '${t}'`);
    }
  });

  test('panel_dynamic.between must be referenced in schema', () => {
    assert.ok(prompt.includes('"between"') || prompt.includes("'between'") || prompt.includes('between'),
      "qa prompt schema must reference 'between' array field");
  });

  test('panel_dynamic.note must be referenced in schema', () => {
    assert.ok(prompt.includes('note'),
      "qa prompt schema must reference 'note' field for contradiction description");
  });
});
