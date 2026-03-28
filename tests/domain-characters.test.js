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

// ── SS-062 — Panel triage order in ALL panel modes ────────────────────────────
// Fails until PANEL TRIAGE ORDER block is added to assessment mode
// and OUTPUT schema order is corrected to ray → fox → bear.

describe('buildSystemPrompt — SS-062 triage order across all panel modes', () => {

  for (const mode of ['assessment', 'reaction', 'mundane', 'qa']) {
    test(`mode '${mode}' contains PANEL TRIAGE ORDER instruction`, () => {
      const prompt = buildSystemPrompt(mode);
      assert.ok(
        prompt.includes('PANEL TRIAGE ORDER') || prompt.includes('triage order'),
        `mode '${mode}' must contain a PANEL TRIAGE ORDER instruction`
      );
    });

    test(`mode '${mode}' IMMEDIATE tier precedes COMEDY tier in triage section`, () => {
      const prompt = buildSystemPrompt(mode);
      // Scope to the triage section — 'comedy' appears earlier in character voice descriptions
      const triageStart = prompt.indexOf('PANEL TRIAGE ORDER');
      const triageFallback = prompt.toLowerCase().indexOf('triage order');
      const sectionStart = triageStart !== -1 ? triageStart : triageFallback;
      assert.ok(sectionStart !== -1,
        `mode '${mode}' must contain a triage order section before checking IMMEDIATE/COMEDY order`);
      const section = prompt.slice(sectionStart);
      const immediateIdx = section.toUpperCase().indexOf('IMMEDIATE');
      const comedyIdx = section.toUpperCase().indexOf('COMEDY');
      assert.ok(immediateIdx !== -1, `mode '${mode}' triage section must name IMMEDIATE tier`);
      assert.ok(comedyIdx !== -1, `mode '${mode}' triage section must name COMEDY tier`);
      assert.ok(immediateIdx < comedyIdx,
        `mode '${mode}': IMMEDIATE tier must appear before COMEDY tier in triage section`);
    });
  }

  test("assessment mode per-character instructions: Fox (IMMEDIATE) listed before Bear (COMEDY)", () => {
    const prompt = buildSystemPrompt('assessment');
    // After the triage section is added, Fox's IMMEDIATE role must be stated before Bear's COMEDY role
    const upper = prompt.toUpperCase();
    // Find the first mention of FOX with IMMEDIATE tier context and BEAR with COMEDY tier context
    // We check the first occurrence of each in the character instruction block
    const foxImmediateIdx = upper.indexOf('FOX');
    const bearComedyIdx = upper.indexOf('BEAR');
    assert.ok(foxImmediateIdx !== -1, "assessment prompt must reference Fox");
    assert.ok(bearComedyIdx !== -1, "assessment prompt must reference Bear");
    // In triage section: Fox (IMMEDIATE, goes second) should be described before Bear (COMEDY)
    // Find the triage instruction block specifically
    const triageIdx = upper.indexOf('PANEL TRIAGE ORDER');
    assert.ok(triageIdx !== -1, "assessment prompt must have PANEL TRIAGE ORDER section");
    const triageSection = upper.slice(triageIdx);
    const foxInTriage = triageSection.indexOf('FOX');
    const bearInTriage = triageSection.indexOf('BEAR');
    assert.ok(foxInTriage !== -1, "triage section must reference Fox");
    assert.ok(bearInTriage !== -1, "triage section must reference Bear");
    assert.ok(foxInTriage < bearInTriage,
      "triage section: Fox (IMMEDIATE) must appear before Bear (COMEDY)");
  });

  test("reaction mode per-character instructions: Fox (IMMEDIATE) listed before Bear (COMEDY) in triage section", () => {
    const prompt = buildSystemPrompt('reaction');
    const upper = prompt.toUpperCase();
    const triageIdx = upper.indexOf('PANEL TRIAGE ORDER');
    assert.ok(triageIdx !== -1, "reaction prompt must have PANEL TRIAGE ORDER section");
    const triageSection = upper.slice(triageIdx);
    const foxInTriage = triageSection.indexOf('FOX');
    const bearInTriage = triageSection.indexOf('BEAR');
    assert.ok(foxInTriage < bearInTriage,
      "reaction triage section: Fox must appear before Bear");
  });
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
