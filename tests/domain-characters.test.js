/**
 * tests/domain-characters.test.js
 * Unit tests for js/characters.js — buildSystemPrompt() pure function.
 *
 * Tests schema requirements for each mode — not LLM content.
 * Run: node --test tests/domain-characters.test.js
 */

import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';

import { buildSystemPrompt, CHARACTERS, PANEL_IDS, PANEL_POOL, drawPanel, CHAR_COLOURS, FISH_DISPOSITIONS, DISPOSITION_SHIFTS, drawDisposition, buildDispositionState, buildFishDispositionInjection, shiftDisposition } from '../js/characters.js';

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

// ── SS-059 — Social Dynamics Engine ─────────────────────────────────────────
// Fails until SOCIAL DYNAMICS ENGINE block + panel_tension schema added to all modes,
// and characters have documented incidents.

describe('CHARACTERS — SS-059 documented incidents', () => {
  test('characters with documented incidents have incidents array', () => {
    // These characters must have incidents — the engine draws on them
    const mustHaveIncidents = ['bear', 'cody', 'stevens', 'oshea', 'stroud'];
    for (const id of mustHaveIncidents) {
      const char = CHARACTERS[id];
      assert.ok(char, `CHARACTERS must include '${id}'`);
      assert.ok(Array.isArray(char.incidents),
        `CHARACTERS['${id}'] must have an incidents array (SS-059)`);
      assert.ok(char.incidents.length > 0,
        `CHARACTERS['${id}'].incidents must not be empty`);
    }
  });
});

describe('buildSystemPrompt — SS-059 social dynamics engine in all panel modes', () => {

  for (const mode of ['assessment', 'reaction', 'mundane', 'qa']) {
    test(`mode '${mode}' contains SOCIAL DYNAMICS ENGINE instruction`, () => {
      const prompt = buildSystemPrompt(mode);
      assert.ok(
        prompt.includes('SOCIAL DYNAMICS ENGINE') || prompt.includes('panel_tension'),
        `mode '${mode}' must contain SOCIAL DYNAMICS ENGINE instruction (SS-059)`
      );
    });

    test(`mode '${mode}' OUTPUT schema includes panel_tension field`, () => {
      const prompt = buildSystemPrompt(mode);
      assert.ok(
        prompt.includes('panel_tension'),
        `mode '${mode}' OUTPUT schema must include panel_tension field (SS-059)`
      );
    });
  }

  test("panel_tension schema defines all required types", () => {
    const prompt = buildSystemPrompt('assessment');
    const types = ['wound_reference', 'lie', 'callout', 'wolf_pack', 'none'];
    for (const t of types) {
      assert.ok(prompt.includes(t),
        `SOCIAL DYNAMICS ENGINE must define panel_tension type '${t}'`);
    }
  });

  test("panel_tension schema includes subject and by fields", () => {
    const prompt = buildSystemPrompt('assessment');
    assert.ok(prompt.includes('subject'), "panel_tension schema must include 'subject' field");
    assert.ok(
      prompt.includes('"by"') || prompt.includes("'by'") || prompt.includes(': ["'),
      "panel_tension schema must include 'by' field"
    );
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

// ── SS-092 — Jim Carrey character ────────────────────────────────────────────

describe('Jim Carrey — SS-092', () => {
  test('"jim" is present in CHARACTERS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHARACTERS, 'jim'),
      '"jim" must be a key in CHARACTERS');
  });

  test('"jim" is in PANEL_POOL', () => {
    assert.ok(PANEL_POOL.includes('jim'),
      '"jim" must be in PANEL_POOL — auto-included via CHARACTERS filter');
  });

  test('"jim" has required character fields: name, role, av, avClass, voice', () => {
    const jim = CHARACTERS.jim;
    assert.ok(jim.name,    '"jim" must have a name');
    assert.ok(jim.role,    '"jim" must have a role');
    assert.ok(jim.av,      '"jim" must have av initials');
    assert.ok(jim.avClass, '"jim" must have avClass');
    assert.ok(jim.voice,   '"jim" must have a voice description');
  });

  test('"jim" av initials are "JC"', () => {
    assert.strictEqual(CHARACTERS.jim.av, 'JC', '"jim" av must be "JC"');
  });

  test('"jim" avClass is "av-yellow"', () => {
    assert.strictEqual(CHARACTERS.jim.avClass, 'av-yellow', '"jim" avClass must be "av-yellow"');
  });

  test('"jim" is in CHAR_COLOURS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHAR_COLOURS, 'jim'),
      '"jim" must have an entry in CHAR_COLOURS');
  });
});

// ── Jeremy Wade character ─────────────────────────────────────────────────────

describe('Jeremy Wade — new character', () => {
  test('"jeremy" is present in CHARACTERS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHARACTERS, 'jeremy'),
      '"jeremy" must be a key in CHARACTERS');
  });

  test('"jeremy" is in PANEL_POOL', () => {
    assert.ok(PANEL_POOL.includes('jeremy'),
      '"jeremy" must be in PANEL_POOL — auto-included via CHARACTERS filter');
  });

  test('"jeremy" has required character fields: name, role, av, avClass, voice', () => {
    const jeremy = CHARACTERS.jeremy;
    assert.ok(jeremy.name,    '"jeremy" must have a name');
    assert.ok(jeremy.role,    '"jeremy" must have a role');
    assert.ok(jeremy.av,      '"jeremy" must have av initials');
    assert.ok(jeremy.avClass, '"jeremy" must have avClass');
    assert.ok(jeremy.voice,   '"jeremy" must have a voice description');
  });

  test('"jeremy" av initials are "JW"', () => {
    assert.strictEqual(CHARACTERS.jeremy.av, 'JW', '"jeremy" av must be "JW"');
  });

  test('"jeremy" avClass is "av-teal"', () => {
    assert.strictEqual(CHARACTERS.jeremy.avClass, 'av-teal', '"jeremy" avClass must be "av-teal"');
  });

  test('"jeremy" is in CHAR_COLOURS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHAR_COLOURS, 'jeremy'),
      '"jeremy" must have an entry in CHAR_COLOURS');
  });
});

// ── SS-070 — Ant Middleton character ────────────────────────────────────────

describe('Ant Middleton — SS-070', () => {
  test('"middleton" is present in CHARACTERS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHARACTERS, 'middleton'),
      '"middleton" must be a key in CHARACTERS');
  });

  test('"middleton" is in PANEL_POOL', () => {
    assert.ok(PANEL_POOL.includes('middleton'),
      '"middleton" must be in PANEL_POOL');
  });

  test('"middleton" has required character fields', () => {
    const m = CHARACTERS.middleton;
    assert.ok(m.name,    '"middleton" must have a name');
    assert.ok(m.role,    '"middleton" must have a role');
    assert.ok(m.av,      '"middleton" must have av initials');
    assert.ok(m.avClass, '"middleton" must have avClass');
    assert.ok(m.voice,   '"middleton" must have a voice description');
  });

  test('"middleton" av initials are "AM"', () => {
    assert.strictEqual(CHARACTERS.middleton.av, 'AM');
  });

  test('"middleton" is in CHAR_COLOURS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHAR_COLOURS, 'middleton'),
      '"middleton" must have an entry in CHAR_COLOURS');
  });

  test('"middleton" has integrity spectrum position', () => {
    assert.ok(CHARACTERS.middleton.integrity,
      '"middleton" must have an integrity object');
    assert.ok(CHARACTERS.middleton.integrity.position,
      '"middleton" must have an integrity position');
  });

  test('"middleton" has documented incidents', () => {
    assert.ok(Array.isArray(CHARACTERS.middleton.incidents),
      '"middleton" must have incidents array');
    assert.ok(CHARACTERS.middleton.incidents.length > 0,
      '"middleton" incidents must not be empty');
  });
});

// ── SS-071 — Andy McNab character ──────────────────────────────────────────

describe('Andy McNab — SS-071', () => {
  test('"mcnab" is present in CHARACTERS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHARACTERS, 'mcnab'),
      '"mcnab" must be a key in CHARACTERS');
  });

  test('"mcnab" is in PANEL_POOL', () => {
    assert.ok(PANEL_POOL.includes('mcnab'),
      '"mcnab" must be in PANEL_POOL');
  });

  test('"mcnab" has required character fields', () => {
    const m = CHARACTERS.mcnab;
    assert.ok(m.name,    '"mcnab" must have a name');
    assert.ok(m.role,    '"mcnab" must have a role');
    assert.ok(m.av,      '"mcnab" must have av initials');
    assert.ok(m.avClass, '"mcnab" must have avClass');
    assert.ok(m.voice,   '"mcnab" must have a voice description');
  });

  test('"mcnab" av initials are "McN"', () => {
    assert.strictEqual(CHARACTERS.mcnab.av, 'McN');
  });

  test('"mcnab" is in CHAR_COLOURS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHAR_COLOURS, 'mcnab'),
      '"mcnab" must have an entry in CHAR_COLOURS');
  });

  test('"mcnab" has integrity spectrum position GONE', () => {
    assert.strictEqual(CHARACTERS.mcnab.integrity.position, 'GONE');
  });

  test('"mcnab" has documented incidents', () => {
    assert.ok(Array.isArray(CHARACTERS.mcnab.incidents),
      '"mcnab" must have incidents array');
    assert.ok(CHARACTERS.mcnab.incidents.length > 0,
      '"mcnab" incidents must not be empty');
  });
});

// ── SS-072 — Chris Ryan character ──────────────────────────────────────────

describe('Chris Ryan — SS-072', () => {
  test('"ryan" is present in CHARACTERS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHARACTERS, 'ryan'),
      '"ryan" must be a key in CHARACTERS');
  });

  test('"ryan" is in PANEL_POOL', () => {
    assert.ok(PANEL_POOL.includes('ryan'),
      '"ryan" must be in PANEL_POOL');
  });

  test('"ryan" has required character fields', () => {
    const r = CHARACTERS.ryan;
    assert.ok(r.name,    '"ryan" must have a name');
    assert.ok(r.role,    '"ryan" must have a role');
    assert.ok(r.av,      '"ryan" must have av initials');
    assert.ok(r.avClass, '"ryan" must have avClass');
    assert.ok(r.voice,   '"ryan" must have a voice description');
  });

  test('"ryan" av initials are "CR"', () => {
    assert.strictEqual(CHARACTERS.ryan.av, 'CR');
  });

  test('"ryan" is in CHAR_COLOURS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHAR_COLOURS, 'ryan'),
      '"ryan" must have an entry in CHAR_COLOURS');
  });

  test('"ryan" has integrity spectrum position GONE', () => {
    assert.strictEqual(CHARACTERS.ryan.integrity.position, 'GONE');
  });

  test('"ryan" has documented incidents', () => {
    assert.ok(Array.isArray(CHARACTERS.ryan.incidents),
      '"ryan" must have incidents array');
    assert.ok(CHARACTERS.ryan.incidents.length > 0,
      '"ryan" incidents must not be empty');
  });
});

// ── SS-098 — Cox character ──────────────────────────────────────────────────

describe('Prof Brian Cox — SS-098', () => {
  test('"cox" is present in CHARACTERS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHARACTERS, 'cox'),
      '"cox" must be a key in CHARACTERS');
  });

  test('"cox" is in PANEL_POOL', () => {
    assert.ok(PANEL_POOL.includes('cox'),
      '"cox" must be in PANEL_POOL');
  });

  test('"cox" has required character fields', () => {
    const cox = CHARACTERS.cox;
    assert.ok(cox.name,    '"cox" must have a name');
    assert.ok(cox.role,    '"cox" must have a role');
    assert.ok(cox.av,      '"cox" must have av initials');
    assert.ok(cox.avClass, '"cox" must have avClass');
    assert.ok(cox.voice,   '"cox" must have a voice description');
  });

  test('"cox" av initials are "BC"', () => {
    assert.strictEqual(CHARACTERS.cox.av, 'BC');
  });

  test('"cox" is in CHAR_COLOURS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHAR_COLOURS, 'cox'),
      '"cox" must have an entry in CHAR_COLOURS');
  });

  test('"cox" has fish property with valid default', () => {
    const fish = CHARACTERS.cox.fish;
    assert.ok(fish, '"cox" must have a fish property');
    assert.ok(Object.prototype.hasOwnProperty.call(FISH_DISPOSITIONS, fish.default),
      `"cox" fish.default "${fish.default}" must be a valid disposition`);
  });
});

// ── SS-098 — Faldo character ────────────────────────────────────────────────

describe('Sir Nick Faldo — SS-098', () => {
  test('"faldo" is present in CHARACTERS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHARACTERS, 'faldo'),
      '"faldo" must be a key in CHARACTERS');
  });

  test('"faldo" is in PANEL_POOL', () => {
    assert.ok(PANEL_POOL.includes('faldo'),
      '"faldo" must be in PANEL_POOL');
  });

  test('"faldo" has required character fields', () => {
    const faldo = CHARACTERS.faldo;
    assert.ok(faldo.name,    '"faldo" must have a name');
    assert.ok(faldo.role,    '"faldo" must have a role');
    assert.ok(faldo.av,      '"faldo" must have av initials');
    assert.ok(faldo.avClass, '"faldo" must have avClass');
    assert.ok(faldo.voice,   '"faldo" must have a voice description');
  });

  test('"faldo" av initials are "NF"', () => {
    assert.strictEqual(CHARACTERS.faldo.av, 'NF');
  });

  test('"faldo" is in CHAR_COLOURS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHAR_COLOURS, 'faldo'),
      '"faldo" must have an entry in CHAR_COLOURS');
  });

  test('"faldo" has fish property with valid default', () => {
    const fish = CHARACTERS.faldo.fish;
    assert.ok(fish, '"faldo" must have a fish property');
    assert.ok(Object.prototype.hasOwnProperty.call(FISH_DISPOSITIONS, fish.default),
      `"faldo" fish.default "${fish.default}" must be a valid disposition`);
  });
});

// ── SS-098 — Fish Disposition Engine ────────────────────────────────────────

describe('FISH_DISPOSITIONS — SS-098', () => {
  const EXPECTED_DISPOSITIONS = [
    'EXCITABLE_NOVICE', 'CONFIDENT_IGNORAMUS', 'RELUCTANT_CONSCRIPT',
    'CONTEMPTUOUS_EXPERT', 'CONVERT', 'TOTAL_DENIAL'
  ];

  test('FISH_DISPOSITIONS has all six entries', () => {
    for (const id of EXPECTED_DISPOSITIONS) {
      assert.ok(Object.prototype.hasOwnProperty.call(FISH_DISPOSITIONS, id),
        `FISH_DISPOSITIONS must include '${id}'`);
    }
  });

  test('each disposition has id, name, and prompt', () => {
    for (const [key, disp] of Object.entries(FISH_DISPOSITIONS)) {
      assert.strictEqual(disp.id, key, `${key}: id must match key`);
      assert.ok(disp.name, `${key}: must have a name`);
      assert.ok(disp.prompt, `${key}: must have a prompt`);
      assert.ok(disp.prompt.length > 20, `${key}: prompt must be substantial`);
    }
  });
});

describe('DISPOSITION_SHIFTS — SS-098', () => {
  test('all non-terminal dispositions have a valid shift target', () => {
    for (const [from, to] of Object.entries(DISPOSITION_SHIFTS)) {
      assert.ok(Object.prototype.hasOwnProperty.call(FISH_DISPOSITIONS, from),
        `shift source '${from}' must be a valid disposition`);
      if (to !== null) {
        assert.ok(Object.prototype.hasOwnProperty.call(FISH_DISPOSITIONS, to),
          `shift target '${to}' (from '${from}') must be a valid disposition`);
      }
    }
  });

  test('CONFIDENT_IGNORAMUS is terminal (null)', () => {
    assert.strictEqual(DISPOSITION_SHIFTS.CONFIDENT_IGNORAMUS, null,
      'CONFIDENT_IGNORAMUS must be terminal');
  });
});

describe('drawDisposition — SS-098', () => {
  test('returns null for non-fish character (ray)', () => {
    assert.strictEqual(drawDisposition('ray'), null,
      'drawDisposition must return null for survivalist characters');
  });

  test('returns null for non-existent character', () => {
    assert.strictEqual(drawDisposition('nonexistent'), null);
  });

  test('returns fixed disposition for Jim (EXCITABLE_NOVICE)', () => {
    for (let i = 0; i < 20; i++) {
      assert.strictEqual(drawDisposition('jim'), 'EXCITABLE_NOVICE',
        'Jim must always draw EXCITABLE_NOVICE (fixed)');
    }
  });

  test('returns valid disposition for Cox (weighted random)', () => {
    const valid = Object.keys(CHARACTERS.cox.fish.weights);
    for (let i = 0; i < 20; i++) {
      const result = drawDisposition('cox');
      assert.ok(valid.includes(result),
        `drawDisposition("cox") returned "${result}" which is not in cox's weights`);
    }
  });

  test('returns valid disposition for Faldo (weighted random)', () => {
    const valid = Object.keys(CHARACTERS.faldo.fish.weights);
    for (let i = 0; i < 20; i++) {
      const result = drawDisposition('faldo');
      assert.ok(valid.includes(result),
        `drawDisposition("faldo") returned "${result}" which is not in faldo's weights`);
    }
  });

  test('returns valid disposition for Jeremy (weighted random)', () => {
    const valid = Object.keys(CHARACTERS.jeremy.fish.weights);
    for (let i = 0; i < 20; i++) {
      const result = drawDisposition('jeremy');
      assert.ok(valid.includes(result),
        `drawDisposition("jeremy") returned "${result}" which is not in jeremy's weights`);
    }
  });
});

describe('buildDispositionState — SS-098', () => {
  test('returns empty state for survivalist-only panel', () => {
    const state = buildDispositionState(['ray', 'bear', 'fox', 'cody']);
    assert.deepStrictEqual(state, {});
  });

  test('returns state only for fish characters in mixed panel', () => {
    const state = buildDispositionState(['ray', 'cox', 'bear', 'faldo']);
    assert.ok(state.cox, 'state must include cox');
    assert.ok(state.faldo, 'state must include faldo');
    assert.strictEqual(state.ray, undefined, 'state must not include ray');
    assert.strictEqual(state.bear, undefined, 'state must not include bear');
  });

  test('all disposition values are valid disposition IDs', () => {
    const state = buildDispositionState(['cox', 'faldo', 'jim', 'jeremy']);
    for (const [charId, dispId] of Object.entries(state)) {
      assert.ok(Object.prototype.hasOwnProperty.call(FISH_DISPOSITIONS, dispId),
        `state[${charId}] = "${dispId}" must be a valid disposition`);
    }
  });
});

describe('buildFishDispositionInjection — SS-098', () => {
  test('returns empty string for empty disposition state', () => {
    assert.strictEqual(buildFishDispositionInjection({}), '');
  });

  test('returns prompt text for fish characters', () => {
    const state = { cox: 'EXCITABLE_NOVICE', faldo: 'CONTEMPTUOUS_EXPERT' };
    const injection = buildFishDispositionInjection(state);
    assert.ok(injection.length > 0, 'injection must not be empty');
    assert.ok(injection.includes('FISH-OUT-OF-WATER DISPOSITIONS'),
      'injection must include header');
    assert.ok(injection.includes('BRIAN COX'),
      'injection must include Cox\'s name');
    assert.ok(injection.includes('NICK FALDO'),
      'injection must include Faldo\'s name');
  });

  test('returns empty string for invalid charId in state', () => {
    const injection = buildFishDispositionInjection({ nonexistent: 'EXCITABLE_NOVICE' });
    assert.strictEqual(injection, '', 'invalid charId should produce empty injection');
  });
});

describe('shiftDisposition — SS-098', () => {
  test('shifts EXCITABLE_NOVICE to CONFIDENT_IGNORAMUS under callout', () => {
    const state = { cox: 'EXCITABLE_NOVICE' };
    const tension = { type: 'callout', subject: 'cox', by: ['ray'] };
    const result = shiftDisposition('cox', state, tension);
    assert.strictEqual(result.cox, 'CONFIDENT_IGNORAMUS');
  });

  test('shifts CONTEMPTUOUS_EXPERT to RELUCTANT_CONSCRIPT under wolf_pack', () => {
    const state = { faldo: 'CONTEMPTUOUS_EXPERT' };
    const tension = { type: 'wolf_pack', subject: 'faldo', by: ['ray', 'fox'] };
    const result = shiftDisposition('faldo', state, tension);
    assert.strictEqual(result.faldo, 'RELUCTANT_CONSCRIPT');
  });

  test('does not shift when no pressure targets character', () => {
    const state = { cox: 'EXCITABLE_NOVICE' };
    const tension = { type: 'callout', subject: 'bear', by: ['ray'] };
    const result = shiftDisposition('cox', state, tension);
    assert.strictEqual(result.cox, 'EXCITABLE_NOVICE');
  });

  test('does not shift when tension type is wound_reference', () => {
    const state = { cox: 'EXCITABLE_NOVICE' };
    const tension = { type: 'wound_reference', subject: 'cox', by: ['bear'] };
    const result = shiftDisposition('cox', state, tension);
    assert.strictEqual(result.cox, 'EXCITABLE_NOVICE');
  });

  test('does not shift terminal disposition (CONFIDENT_IGNORAMUS)', () => {
    const state = { cox: 'CONFIDENT_IGNORAMUS' };
    const tension = { type: 'callout', subject: 'cox', by: ['ray'] };
    const result = shiftDisposition('cox', state, tension);
    assert.strictEqual(result.cox, 'CONFIDENT_IGNORAMUS');
  });

  test('returns same state for non-fish character', () => {
    const state = { ray: undefined };
    const tension = { type: 'callout', subject: 'ray', by: ['bear'] };
    const result = shiftDisposition('ray', state, tension);
    assert.strictEqual(result.ray, undefined);
  });

  test('returns same state when panelTension is null', () => {
    const state = { cox: 'EXCITABLE_NOVICE' };
    const result = shiftDisposition('cox', state, null);
    assert.strictEqual(result.cox, 'EXCITABLE_NOVICE');
  });

  test('does not mutate original state', () => {
    const state = { cox: 'EXCITABLE_NOVICE' };
    const tension = { type: 'callout', subject: 'cox', by: ['ray'] };
    const result = shiftDisposition('cox', state, tension);
    assert.strictEqual(state.cox, 'EXCITABLE_NOVICE', 'original state must not be mutated');
    assert.strictEqual(result.cox, 'CONFIDENT_IGNORAMUS');
  });
});

// ── SS-098 — Fish property validation (all fish chars) ──────────────────────

describe('Fish property validation — SS-098', () => {
  const FISH_CHARS = Object.entries(CHARACTERS).filter(([, c]) => c.fish);

  test('at least 4 fish-out-of-water characters exist', () => {
    assert.ok(FISH_CHARS.length >= 4,
      `expected at least 4 fish chars, got ${FISH_CHARS.length}`);
  });

  test('every fish character has valid default disposition', () => {
    for (const [id, char] of FISH_CHARS) {
      assert.ok(Object.prototype.hasOwnProperty.call(FISH_DISPOSITIONS, char.fish.default),
        `${id}: fish.default "${char.fish.default}" must be a valid disposition`);
    }
  });

  test('every fish character weights sum to ~1.0', () => {
    for (const [id, char] of FISH_CHARS) {
      const sum = Object.values(char.fish.weights).reduce((a, b) => a + b, 0);
      assert.ok(Math.abs(sum - 1.0) < 0.01,
        `${id}: fish.weights must sum to ~1.0, got ${sum}`);
    }
  });

  test('every fish character weight key is a valid disposition', () => {
    for (const [id, char] of FISH_CHARS) {
      for (const key of Object.keys(char.fish.weights)) {
        assert.ok(Object.prototype.hasOwnProperty.call(FISH_DISPOSITIONS, key),
          `${id}: weight key "${key}" must be a valid disposition`);
      }
    }
  });

  test('fixed fish characters have only their default in weights', () => {
    for (const [id, char] of FISH_CHARS) {
      if (char.fish.fixed) {
        const keys = Object.keys(char.fish.weights);
        assert.strictEqual(keys.length, 1,
          `${id}: fixed fish must have exactly one weight entry`);
        assert.strictEqual(keys[0], char.fish.default,
          `${id}: fixed fish weight key must match default`);
      }
    }
  });
});
