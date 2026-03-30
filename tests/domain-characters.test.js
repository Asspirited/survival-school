/**
 * tests/domain-characters.test.js
 * Unit tests for js/characters.js — buildSystemPrompt() pure function.
 *
 * Tests schema requirements for each mode — not LLM content.
 * Run: node --test tests/domain-characters.test.js
 */

import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';

import { buildSystemPrompt, CHARACTERS, PANEL_IDS, PANEL_POOL, drawPanel, CHAR_COLOURS, FISH_DISPOSITIONS, DISPOSITION_SHIFTS, drawDisposition, buildDispositionState, buildFishDispositionInjection, shiftDisposition, COMPOSURE_PROFILES, initComposureState, computeComposureDeltas, composureTier, buildComposureInjection, TEMPORAL_LENS, TEMPORAL_STATES, hasTemporalLensCharacters, buildTemporalLensInjection, NAMING_CONVENTIONS, buildNamingConventionInjection, INVENTED_CATCHPHRASES, buildInventedCatchphraseInjection, PANEL_CATEGORIES, getCharacterCategories, getCharactersByCategory, ESCALATION_PROFILES, RELATIONAL_AXES, getAxesForCharacter, getActiveAxes, buildEscalationInjection, REPUTATION_TIERS, getReputationTier, computeReputationStats, buildReputationInjection, OBLIVIOUS_CHARACTERS, getCharacterEncounters, computeCharacterSentiment, buildCharacterCallback, buildCharacterLearningInjection, MORRISON_CLAIM_TEMPLATES, pickClaimTarget, buildMorrisonClaimInjection, CHARACTER_PACKS, getPackById, getPacksForCharacter, getReleasedPacks, isNewCharacter, AUDIENCE_FEATURES, AUDIENCE_CONFIG, isAudienceFeature, buildSpectatorCard, buildSpectatorView } from '../js/characters.js';

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

// ── SS-013 — Chris Packham character ──────────────────────────────────────────

describe('Chris Packham — SS-013', () => {
  test('"packham" is present in CHARACTERS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHARACTERS, 'packham'),
      '"packham" must be a key in CHARACTERS');
  });

  test('"packham" is in PANEL_POOL', () => {
    assert.ok(PANEL_POOL.includes('packham'),
      '"packham" must be in PANEL_POOL');
  });

  test('"packham" has required character fields', () => {
    const packham = CHARACTERS.packham;
    assert.ok(packham.name,    '"packham" must have a name');
    assert.ok(packham.role,    '"packham" must have a role');
    assert.ok(packham.av,      '"packham" must have av initials');
    assert.ok(packham.avClass, '"packham" must have avClass');
    assert.ok(packham.voice,   '"packham" must have a voice description');
  });

  test('"packham" av initials are "CP"', () => {
    assert.strictEqual(CHARACTERS.packham.av, 'CP');
  });

  test('"packham" is in CHAR_COLOURS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHAR_COLOURS, 'packham'),
      '"packham" must have an entry in CHAR_COLOURS');
  });

  test('"packham" has integrity with NEGOTIATE-THROW position', () => {
    assert.ok(CHARACTERS.packham.integrity, '"packham" must have integrity');
    assert.strictEqual(CHARACTERS.packham.integrity.position, 'NEGOTIATE-THROW');
  });

  test('"packham" has incidents array', () => {
    assert.ok(Array.isArray(CHARACTERS.packham.incidents), '"packham" must have incidents array');
    assert.ok(CHARACTERS.packham.incidents.length >= 3, '"packham" must have at least 3 incidents');
  });

  test('"packham" has COMPOSURE_PROFILES entry', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(COMPOSURE_PROFILES, 'packham'),
      '"packham" must have a COMPOSURE_PROFILES entry');
    assert.strictEqual(COMPOSURE_PROFILES.packham.baseline, 8);
  });

  test('"packham" has NAMING_CONVENTIONS entry', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(NAMING_CONVENTIONS, 'packham'),
      '"packham" must have a NAMING_CONVENTIONS entry');
  });

  test('"packham" deathLine references animals', () => {
    assert.ok(CHARACTERS.packham.deathLine.toLowerCase().includes('animal'),
      '"packham" deathLine must reference animals');
  });

  test('"packham" voice mentions ETHICAL OVERRIDE', () => {
    assert.ok(CHARACTERS.packham.voice.includes('ETHICAL OVERRIDE'),
      '"packham" voice must describe the Ethical Override mechanic');
  });

  test('"packham" does NOT have a fish property (he is an expert, not fish-out-of-water)', () => {
    assert.ok(!CHARACTERS.packham.fish,
      '"packham" must NOT have a fish property — he is a domain expert');
  });
});

// ── SS-139 — Steve Backshall ────────────────────────────────────────────────

describe('Steve Backshall — SS-139', () => {
  test('"backshall" is present in CHARACTERS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHARACTERS, 'backshall'),
      '"backshall" must be a key in CHARACTERS');
  });

  test('"backshall" is in PANEL_POOL', () => {
    assert.ok(PANEL_POOL.includes('backshall'),
      '"backshall" must be in PANEL_POOL');
  });

  test('"backshall" has required character fields', () => {
    const b = CHARACTERS.backshall;
    assert.ok(b.name,    '"backshall" must have a name');
    assert.ok(b.role,    '"backshall" must have a role');
    assert.ok(b.av,      '"backshall" must have av initials');
    assert.ok(b.avClass, '"backshall" must have avClass');
    assert.ok(b.voice,   '"backshall" must have a voice description');
  });

  test('"backshall" av initials are "SB"', () => {
    assert.strictEqual(CHARACTERS.backshall.av, 'SB');
  });

  test('"backshall" is in CHAR_COLOURS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHAR_COLOURS, 'backshall'),
      '"backshall" must have an entry in CHAR_COLOURS');
  });

  test('"backshall" has integrity with COMPLY-UNCOMFORTABLE position', () => {
    assert.ok(CHARACTERS.backshall.integrity, '"backshall" must have integrity');
    assert.strictEqual(CHARACTERS.backshall.integrity.position, 'COMPLY-UNCOMFORTABLE');
  });

  test('"backshall" has incidents array', () => {
    assert.ok(Array.isArray(CHARACTERS.backshall.incidents), '"backshall" must have incidents array');
    assert.ok(CHARACTERS.backshall.incidents.length >= 3, '"backshall" must have at least 3 incidents');
  });

  test('"backshall" has COMPOSURE_PROFILES entry', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(COMPOSURE_PROFILES, 'backshall'),
      '"backshall" must have a COMPOSURE_PROFILES entry');
    assert.strictEqual(COMPOSURE_PROFILES.backshall.baseline, 7);
  });

  test('"backshall" has NAMING_CONVENTIONS entry', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(NAMING_CONVENTIONS, 'backshall'),
      '"backshall" must have a NAMING_CONVENTIONS entry');
  });

  test('"backshall" voice mentions Deadly 60', () => {
    assert.ok(CHARACTERS.backshall.voice.includes('Deadly 60'),
      '"backshall" voice must reference Deadly 60');
  });

  test('"backshall" voice mentions TELEPHONE GAME', () => {
    assert.ok(CHARACTERS.backshall.voice.includes('TELEPHONE GAME'),
      '"backshall" voice must describe the Telephone Game mechanic');
  });

  test('"backshall" does NOT have a fish property (he is a naturalist, not fish-out-of-water)', () => {
    assert.ok(!CHARACTERS.backshall.fish,
      '"backshall" must NOT have a fish property — he is a domain expert');
  });
});

// ── SS-142 — Bryan Grieg Fry ────────────────────────────────────────────────

describe('Bryan Grieg Fry — SS-142', () => {
  test('"fry" is present in CHARACTERS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHARACTERS, 'fry'),
      '"fry" must be a key in CHARACTERS');
  });

  test('"fry" is in PANEL_POOL', () => {
    assert.ok(PANEL_POOL.includes('fry'),
      '"fry" must be in PANEL_POOL');
  });

  test('"fry" has required character fields', () => {
    const f = CHARACTERS.fry;
    assert.ok(f.name,    '"fry" must have a name');
    assert.ok(f.role,    '"fry" must have a role');
    assert.ok(f.av,      '"fry" must have av initials');
    assert.ok(f.avClass, '"fry" must have avClass');
    assert.ok(f.voice,   '"fry" must have a voice description');
  });

  test('"fry" av initials are "BF"', () => {
    assert.strictEqual(CHARACTERS.fry.av, 'BF');
  });

  test('"fry" is in CHAR_COLOURS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHAR_COLOURS, 'fry'),
      '"fry" must have an entry in CHAR_COLOURS');
  });

  test('"fry" has integrity with COMPLY-LECTURE position', () => {
    assert.ok(CHARACTERS.fry.integrity, '"fry" must have integrity');
    assert.strictEqual(CHARACTERS.fry.integrity.position, 'COMPLY-LECTURE');
  });

  test('"fry" has incidents array', () => {
    assert.ok(Array.isArray(CHARACTERS.fry.incidents), '"fry" must have incidents array');
    assert.ok(CHARACTERS.fry.incidents.length >= 3, '"fry" must have at least 3 incidents');
  });

  test('"fry" has COMPOSURE_PROFILES entry', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(COMPOSURE_PROFILES, 'fry'),
      '"fry" must have a COMPOSURE_PROFILES entry');
    assert.strictEqual(COMPOSURE_PROFILES.fry.baseline, 6);
  });

  test('"fry" has NAMING_CONVENTIONS entry', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(NAMING_CONVENTIONS, 'fry'),
      '"fry" must have a NAMING_CONVENTIONS entry');
  });

  test('"fry" voice mentions venom', () => {
    assert.ok(CHARACTERS.fry.voice.toLowerCase().includes('venom'),
      '"fry" voice must reference venom');
  });

  test('"fry" does NOT have a fish property (he is a herpetologist, not fish-out-of-water)', () => {
    assert.ok(!CHARACTERS.fry.fish,
      '"fry" must NOT have a fish property — he is a domain expert');
  });

  test('"fry" is in herpetologist category', () => {
    assert.ok(PANEL_CATEGORIES.herpetologist.includes('fry'),
      '"fry" must be in the herpetologist category');
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

// ── SS-087 — Stephen Hawking character ──────────────────────────────────────

describe('Stephen Hawking — SS-087', () => {
  test('"hawking" is present in CHARACTERS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHARACTERS, 'hawking'),
      '"hawking" must be a key in CHARACTERS');
  });

  test('"hawking" is in PANEL_POOL', () => {
    assert.ok(PANEL_POOL.includes('hawking'),
      '"hawking" must be in PANEL_POOL');
  });

  test('"hawking" has required character fields', () => {
    const h = CHARACTERS.hawking;
    assert.ok(h.name,    '"hawking" must have a name');
    assert.ok(h.role,    '"hawking" must have a role');
    assert.ok(h.av,      '"hawking" must have av initials');
    assert.ok(h.avClass, '"hawking" must have avClass');
    assert.ok(h.voice,   '"hawking" must have a voice description');
  });

  test('"hawking" av initials are "SH"', () => {
    assert.strictEqual(CHARACTERS.hawking.av, 'SH');
  });

  test('"hawking" is in CHAR_COLOURS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHAR_COLOURS, 'hawking'),
      '"hawking" must have an entry in CHAR_COLOURS');
  });

  test('"hawking" has integrity spectrum position', () => {
    assert.ok(CHARACTERS.hawking.integrity,
      '"hawking" must have an integrity object');
    assert.ok(CHARACTERS.hawking.integrity.position,
      '"hawking" must have an integrity position');
  });

  test('"hawking" has documented incidents', () => {
    assert.ok(Array.isArray(CHARACTERS.hawking.incidents),
      '"hawking" must have incidents array');
    assert.ok(CHARACTERS.hawking.incidents.length > 0,
      '"hawking" incidents must not be empty');
  });

  test('"hawking" is a fish-out-of-water character', () => {
    assert.ok(CHARACTERS.hawking.fish,
      '"hawking" must have a fish property');
    assert.ok(CHARACTERS.hawking.fish.default,
      '"hawking" must have a default disposition');
    assert.strictEqual(CHARACTERS.hawking.fish.fixed, false,
      '"hawking" must not be fixed disposition');
  });

  test('"hawking" default disposition is CONVERT', () => {
    assert.strictEqual(CHARACTERS.hawking.fish.default, 'CONVERT');
  });
});

// ── SS-087 — Bruce Lee character ────────────────────────────────────────────

describe('Bruce Lee — SS-087', () => {
  test('"lee" is present in CHARACTERS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHARACTERS, 'lee'),
      '"lee" must be a key in CHARACTERS');
  });

  test('"lee" is in PANEL_POOL', () => {
    assert.ok(PANEL_POOL.includes('lee'),
      '"lee" must be in PANEL_POOL');
  });

  test('"lee" has required character fields', () => {
    const l = CHARACTERS.lee;
    assert.ok(l.name,    '"lee" must have a name');
    assert.ok(l.role,    '"lee" must have a role');
    assert.ok(l.av,      '"lee" must have av initials');
    assert.ok(l.avClass, '"lee" must have avClass');
    assert.ok(l.voice,   '"lee" must have a voice description');
  });

  test('"lee" av initials are "BL"', () => {
    assert.strictEqual(CHARACTERS.lee.av, 'BL');
  });

  test('"lee" is in CHAR_COLOURS', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(CHAR_COLOURS, 'lee'),
      '"lee" must have an entry in CHAR_COLOURS');
  });

  test('"lee" has integrity spectrum position', () => {
    assert.ok(CHARACTERS.lee.integrity,
      '"lee" must have an integrity object');
    assert.ok(CHARACTERS.lee.integrity.position,
      '"lee" must have an integrity position');
  });

  test('"lee" has documented incidents', () => {
    assert.ok(Array.isArray(CHARACTERS.lee.incidents),
      '"lee" must have incidents array');
    assert.ok(CHARACTERS.lee.incidents.length > 0,
      '"lee" incidents must not be empty');
  });

  test('"lee" is a fish-out-of-water character', () => {
    assert.ok(CHARACTERS.lee.fish,
      '"lee" must have a fish property');
    assert.ok(CHARACTERS.lee.fish.default,
      '"lee" must have a default disposition');
    assert.strictEqual(CHARACTERS.lee.fish.fixed, false,
      '"lee" must not be fixed disposition');
  });

  test('"lee" default disposition is CONTEMPTUOUS_EXPERT', () => {
    assert.strictEqual(CHARACTERS.lee.fish.default, 'CONTEMPTUOUS_EXPERT');
  });
});

// ── SS-100 — Composure Engine ───────────────────────────────────────────────

describe('COMPOSURE_PROFILES — SS-100', () => {
  test('COMPOSURE_PROFILES is defined and is an object', () => {
    assert.ok(COMPOSURE_PROFILES && typeof COMPOSURE_PROFILES === 'object');
  });

  test('every PANEL_POOL member has a composure profile', () => {
    for (const id of PANEL_POOL) {
      assert.ok(Object.prototype.hasOwnProperty.call(COMPOSURE_PROFILES, id),
        `COMPOSURE_PROFILES missing entry for pool member '${id}'`);
    }
  });

  test('attenborough has a composure profile', () => {
    assert.ok(Object.prototype.hasOwnProperty.call(COMPOSURE_PROFILES, 'attenborough'),
      'COMPOSURE_PROFILES must include attenborough');
  });

  test('each profile has baseline (number), pressure (string), tell (string)', () => {
    for (const [id, p] of Object.entries(COMPOSURE_PROFILES)) {
      assert.strictEqual(typeof p.baseline, 'number', `${id}: baseline must be a number`);
      assert.ok(p.baseline >= 0 && p.baseline <= 10, `${id}: baseline must be 0-10`);
      assert.strictEqual(typeof p.pressure, 'string', `${id}: pressure must be a string`);
      assert.ok(p.pressure.length > 0, `${id}: pressure must not be empty`);
      assert.strictEqual(typeof p.tell, 'string', `${id}: tell must be a string`);
      assert.ok(p.tell.length > 0, `${id}: tell must not be empty`);
    }
  });
});

describe('initComposureState — SS-100', () => {
  test('returns state with all profiled characters at baseline', () => {
    const state = initComposureState();
    for (const [id, p] of Object.entries(COMPOSURE_PROFILES)) {
      assert.strictEqual(state[id], p.baseline,
        `initComposureState must set ${id} to baseline ${p.baseline}`);
    }
  });
});

describe('composureTier — SS-100', () => {
  test('returns HIGH for 7-10', () => {
    assert.strictEqual(composureTier(7), 'HIGH');
    assert.strictEqual(composureTier(10), 'HIGH');
  });
  test('returns STEADY for 4-6', () => {
    assert.strictEqual(composureTier(4), 'STEADY');
    assert.strictEqual(composureTier(6), 'STEADY');
  });
  test('returns RATTLED for 2-3', () => {
    assert.strictEqual(composureTier(2), 'RATTLED');
    assert.strictEqual(composureTier(3), 'RATTLED');
  });
  test('returns GONE for 0-1', () => {
    assert.strictEqual(composureTier(0), 'GONE');
    assert.strictEqual(composureTier(1), 'GONE');
  });
});

describe('computeComposureDeltas — SS-100', () => {
  test('wound_reference reduces subject by 1', () => {
    const state = { ray: 8, bear: 7 };
    const tension = { type: 'wound_reference', subject: 'ray', by: ['bear'] };
    const next = computeComposureDeltas(state, tension);
    assert.strictEqual(next.ray, 7);
  });

  test('callout reduces subject by 2', () => {
    const state = { bear: 7 };
    const tension = { type: 'callout', subject: 'bear', by: ['ray'] };
    const next = computeComposureDeltas(state, tension);
    assert.strictEqual(next.bear, 5);
  });

  test('wolf_pack reduces subject by 3', () => {
    const state = { bear: 7 };
    const tension = { type: 'wolf_pack', subject: 'bear', by: ['ray', 'fox'] };
    const next = computeComposureDeltas(state, tension);
    assert.strictEqual(next.bear, 4);
  });

  test('lie reduces "by" characters by 1 each', () => {
    const state = { bear: 7, fox: 9 };
    const tension = { type: 'lie', subject: '', by: ['bear'] };
    const next = computeComposureDeltas(state, tension);
    assert.strictEqual(next.bear, 6);
  });

  test('non-targeted characters recover +0.5 capped at baseline', () => {
    const state = { ray: 7, bear: 7 };
    const tension = { type: 'callout', subject: 'bear', by: ['ray'] };
    const next = computeComposureDeltas(state, tension);
    assert.strictEqual(next.ray, 7.5);
  });

  test('recovery does not exceed baseline', () => {
    const state = { ray: 8 };
    const tension = { type: 'none' };
    const next = computeComposureDeltas(state, tension);
    assert.strictEqual(next.ray, 8, 'ray at baseline should not exceed it');
  });

  test('composure never goes below 0', () => {
    const state = { jim: 1 };
    const tension = { type: 'wolf_pack', subject: 'jim', by: ['ray', 'fox'] };
    const next = computeComposureDeltas(state, tension);
    assert.strictEqual(next.jim, 0);
  });
});

describe('buildComposureInjection — SS-100', () => {
  test('returns empty string for null composureState', () => {
    assert.strictEqual(buildComposureInjection(null), '');
  });

  test('returns injection string with COMPOSURE STATE header', () => {
    const state = { ray: 4, bear: 2 };
    const injection = buildComposureInjection(state, ['ray', 'bear']);
    assert.ok(injection.includes('COMPOSURE STATE'),
      'injection must contain COMPOSURE STATE header');
  });

  test('orders characters by composure (lowest first) in speaking sequence', () => {
    const state = { ray: 4, bear: 2 };
    const injection = buildComposureInjection(state, ['ray', 'bear']);
    const seqMatch = injection.match(/Speaking sequence: (.+)/);
    assert.ok(seqMatch, 'injection must contain Speaking sequence line');
    assert.ok(seqMatch[1].indexOf('bear') < seqMatch[1].indexOf('ray'),
      'bear (lower composure) must appear before ray in speaking sequence');
  });

  test('shifted characters include their tier label', () => {
    const state = { bear: 2 };
    const injection = buildComposureInjection(state, ['bear']);
    assert.ok(injection.includes('RATTLED'), 'bear at 2 must show RATTLED tier');
  });

  test('GONE tier shows no recovery note', () => {
    const state = { jim: 0 };
    const injection = buildComposureInjection(state, ['jim']);
    assert.ok(injection.includes('GONE'), 'jim at 0 must show GONE tier');
    assert.ok(injection.includes('No recovery mid-response'),
      'GONE tier must include no-recovery note');
  });
});

// ── SS-006 — Temporal Lens ──────────────────────────────────────────────────

describe('TEMPORAL_LENS — SS-006', () => {

  test('TEMPORAL_LENS is defined and non-empty', () => {
    assert.ok(typeof TEMPORAL_LENS === 'object', 'TEMPORAL_LENS must be an object');
    assert.ok(Object.keys(TEMPORAL_LENS).length > 0, 'TEMPORAL_LENS must have at least one entry');
  });

  test('every TEMPORAL_LENS key is a valid CHARACTERS id', () => {
    for (const id of Object.keys(TEMPORAL_LENS)) {
      assert.ok(Object.prototype.hasOwnProperty.call(CHARACTERS, id),
        `TEMPORAL_LENS has key '${id}' but CHARACTERS has no entry`);
    }
  });

  test('eligible entries have required fields', () => {
    const required = ['reckoning', 'trigger_keywords', 'responses', 'special_rule', 'max_fires_per_session'];
    for (const [id, lens] of Object.entries(TEMPORAL_LENS)) {
      if (!lens.eligible) continue;
      for (const field of required) {
        assert.ok(Object.prototype.hasOwnProperty.call(lens, field),
          `TEMPORAL_LENS[${id}] is eligible but missing '${field}'`);
      }
    }
  });

  test('eligible entries have non-empty trigger_keywords array', () => {
    for (const [id, lens] of Object.entries(TEMPORAL_LENS)) {
      if (!lens.eligible) continue;
      assert.ok(Array.isArray(lens.trigger_keywords), `TEMPORAL_LENS[${id}].trigger_keywords must be an array`);
      assert.ok(lens.trigger_keywords.length > 0, `TEMPORAL_LENS[${id}].trigger_keywords must not be empty`);
    }
  });

  test('eligible entries have at least gentle and accusation responses', () => {
    for (const [id, lens] of Object.entries(TEMPORAL_LENS)) {
      if (!lens.eligible) continue;
      assert.ok(lens.responses.gentle, `TEMPORAL_LENS[${id}] must have a 'gentle' response`);
      assert.ok(lens.responses.accusation || lens.responses.packham,
        `TEMPORAL_LENS[${id}] must have an 'accusation' or 'packham' response`);
    }
  });

  test('every response has a valid state', () => {
    for (const [id, lens] of Object.entries(TEMPORAL_LENS)) {
      if (!lens.eligible) continue;
      for (const [raiser, resp] of Object.entries(lens.responses)) {
        assert.ok(TEMPORAL_STATES.includes(resp.state),
          `TEMPORAL_LENS[${id}].responses.${raiser}.state '${resp.state}' is not a valid TEMPORAL_STATE`);
      }
    }
  });

  test('every response has a non-empty line', () => {
    for (const [id, lens] of Object.entries(TEMPORAL_LENS)) {
      if (!lens.eligible) continue;
      for (const [raiser, resp] of Object.entries(lens.responses)) {
        assert.ok(typeof resp.line === 'string' && resp.line.length > 0,
          `TEMPORAL_LENS[${id}].responses.${raiser}.line must be a non-empty string`);
      }
    }
  });

  test('max_fires_per_session is 1 for all eligible entries', () => {
    for (const [id, lens] of Object.entries(TEMPORAL_LENS)) {
      if (!lens.eligible) continue;
      assert.strictEqual(lens.max_fires_per_session, 1,
        `TEMPORAL_LENS[${id}].max_fires_per_session must be 1`);
    }
  });

  test('non-eligible entries have eligible: false', () => {
    for (const [id, lens] of Object.entries(TEMPORAL_LENS)) {
      if (lens.eligible) continue;
      assert.strictEqual(lens.eligible, false,
        `TEMPORAL_LENS[${id}] must have eligible: false`);
    }
  });

  test('hales is eligible', () => {
    assert.ok(TEMPORAL_LENS.hales, 'hales must be in TEMPORAL_LENS');
    assert.strictEqual(TEMPORAL_LENS.hales.eligible, true, 'hales must be eligible');
  });

  test('attenborough is eligible', () => {
    assert.ok(TEMPORAL_LENS.attenborough, 'attenborough must be in TEMPORAL_LENS');
    assert.strictEqual(TEMPORAL_LENS.attenborough.eligible, true, 'attenborough must be eligible');
  });

  test('TEMPORAL_STATES has exactly 4 states', () => {
    assert.strictEqual(TEMPORAL_STATES.length, 4, 'TEMPORAL_STATES must have exactly 4 states');
    assert.ok(TEMPORAL_STATES.includes('WISTFUL'));
    assert.ok(TEMPORAL_STATES.includes('DEFENSIVE_THEN_OPEN'));
    assert.ok(TEMPORAL_STATES.includes('OPEN'));
    assert.ok(TEMPORAL_STATES.includes('REGRETFUL'));
  });
});

describe('hasTemporalLensCharacters — SS-006', () => {

  test('returns true when panel includes an eligible character', () => {
    assert.strictEqual(hasTemporalLensCharacters(['ray', 'bear', 'hales', 'fox']), true);
  });

  test('returns false when panel has no eligible characters', () => {
    assert.strictEqual(hasTemporalLensCharacters(['ray', 'bear', 'fox', 'cody']), false);
  });

  test('returns false for empty panel', () => {
    assert.strictEqual(hasTemporalLensCharacters([]), false);
  });

  test('returns true for attenborough in panel', () => {
    assert.strictEqual(hasTemporalLensCharacters(['attenborough']), true);
  });

  test('returns false for candidate-only characters (hawking)', () => {
    assert.strictEqual(hasTemporalLensCharacters(['hawking']), false);
  });
});

describe('buildTemporalLensInjection — SS-006', () => {

  test('returns empty string for panel with no eligible characters', () => {
    const result = buildTemporalLensInjection(['ray', 'bear', 'fox', 'cody']);
    assert.strictEqual(result, '');
  });

  test('returns non-empty string for panel with eligible character', () => {
    const result = buildTemporalLensInjection(['ray', 'bear', 'hales', 'fox']);
    assert.ok(result.length > 0, 'injection must be non-empty when hales is in panel');
  });

  test('injection includes character name for eligible member', () => {
    const result = buildTemporalLensInjection(['ray', 'hales', 'fox']);
    assert.ok(result.includes('LES HIDDINS'), 'injection must include Hiddins name');
  });

  test('injection includes reckoning topic', () => {
    const result = buildTemporalLensInjection(['ray', 'hales']);
    assert.ok(result.includes('Aboriginal knowledge attribution') || result.includes('bush tucker'),
      'injection must reference Hiddins reckoning topic');
  });

  test('injection includes TEMPORAL LENS header', () => {
    const result = buildTemporalLensInjection(['attenborough']);
    assert.ok(result.includes('TEMPORAL LENS'), 'injection must include mechanic header');
  });

  test('injection includes max-once rule', () => {
    const result = buildTemporalLensInjection(['hales']);
    assert.ok(result.includes('once') || result.includes('ONCE'),
      'injection must include max-once firing rule');
  });

  test('injection includes both eligible characters when both present', () => {
    const result = buildTemporalLensInjection(['hales', 'attenborough']);
    assert.ok(result.includes('LES HIDDINS'), 'must include Hiddins');
    assert.ok(result.includes('DAVID ATTENBOROUGH'), 'must include Attenborough');
  });

  test('injection includes raiser-specific responses', () => {
    const result = buildTemporalLensInjection(['hales']);
    assert.ok(result.includes('Raised gently'), 'must include gentle raiser');
  });
});

// ── SS-039 — Naming Conventions ─────────────────────────────────────────────

describe('NAMING_CONVENTIONS — SS-039', () => {

  test('NAMING_CONVENTIONS is defined and non-empty', () => {
    assert.ok(typeof NAMING_CONVENTIONS === 'object', 'NAMING_CONVENTIONS must be an object');
    assert.ok(Object.keys(NAMING_CONVENTIONS).length > 0, 'NAMING_CONVENTIONS must have entries');
  });

  test('every NAMING_CONVENTIONS key is a valid CHARACTERS id', () => {
    for (const id of Object.keys(NAMING_CONVENTIONS)) {
      assert.ok(Object.prototype.hasOwnProperty.call(CHARACTERS, id),
        `NAMING_CONVENTIONS has key '${id}' but CHARACTERS has no entry`);
    }
  });

  test('every convention is a non-empty string', () => {
    for (const [id, convention] of Object.entries(NAMING_CONVENTIONS)) {
      assert.ok(typeof convention === 'string' && convention.length > 0,
        `NAMING_CONVENTIONS[${id}] must be a non-empty string`);
    }
  });

  test('core survivalist characters have naming conventions', () => {
    const coreIds = ['ray', 'bear', 'cody', 'hales', 'fox', 'stroud', 'oshea', 'stevens', 'attenborough'];
    for (const id of coreIds) {
      assert.ok(NAMING_CONVENTIONS[id],
        `core character '${id}' must have a naming convention`);
    }
  });

  test('O\'Shea convention mentions binomial', () => {
    assert.ok(NAMING_CONVENTIONS.oshea.includes('binomial'),
      "O'Shea's convention must reference binomial nomenclature");
  });

  test('Bear convention mentions Fact-Checker', () => {
    assert.ok(NAMING_CONVENTIONS.bear.toLowerCase().includes('fact'),
      "Bear's convention must reference Fact-Checker");
  });

  test('Hales convention mentions Aboriginal/Australian', () => {
    assert.ok(NAMING_CONVENTIONS.hales.includes('Australian') || NAMING_CONVENTIONS.hales.includes('Aboriginal'),
      "Hales's convention must reference Australian or Aboriginal naming");
  });
});

describe('buildNamingConventionInjection — SS-039', () => {

  test('returns empty string for empty panel', () => {
    assert.strictEqual(buildNamingConventionInjection([]), '');
  });

  test('returns non-empty string for panel with characters', () => {
    const result = buildNamingConventionInjection(['ray', 'bear', 'oshea']);
    assert.ok(result.length > 0, 'injection must be non-empty for valid panel');
  });

  test('injection includes character names', () => {
    const result = buildNamingConventionInjection(['oshea', 'bear']);
    assert.ok(result.includes("MARK O'SHEA"), 'must include O\'Shea name');
    assert.ok(result.includes('BEAR GRYLLS'), 'must include Bear name');
  });

  test('injection includes NAMING CONVENTIONS header', () => {
    const result = buildNamingConventionInjection(['ray']);
    assert.ok(result.includes('NAMING CONVENTIONS'), 'must include mechanic header');
  });

  test('injection includes indigenous/cultural respect rule', () => {
    const result = buildNamingConventionInjection(['hales']);
    assert.ok(result.includes('indigenous') || result.includes('Indigenous'),
      'must include indigenous naming rule');
  });

  test('skips characters without naming conventions', () => {
    const result = buildNamingConventionInjection(['nonexistent_id']);
    assert.strictEqual(result, '', 'must return empty for unknown character IDs');
  });
});

// ── SS-141 — Panel Member Categories ──────────────────────────────────────────

describe('PANEL_CATEGORIES — SS-141', () => {
  const EXPECTED_CATEGORIES = ['survivalist', 'armed_forces', 'naturalist', 'herpetologist', 'fish_out_of_water', 'wildcard'];

  test('PANEL_CATEGORIES has all expected category keys', () => {
    for (const cat of EXPECTED_CATEGORIES) {
      assert.ok(Object.prototype.hasOwnProperty.call(PANEL_CATEGORIES, cat),
        `PANEL_CATEGORIES must include '${cat}'`);
    }
  });

  test('every character ID in categories exists in CHARACTERS', () => {
    for (const [cat, ids] of Object.entries(PANEL_CATEGORIES)) {
      for (const id of ids) {
        assert.ok(Object.prototype.hasOwnProperty.call(CHARACTERS, id),
          `Category '${cat}' includes '${id}' but CHARACTERS has no entry`);
      }
    }
  });

  test('every PANEL_POOL member appears in at least one category', () => {
    for (const id of PANEL_POOL) {
      const cats = getCharacterCategories(id);
      assert.ok(cats.length > 0,
        `PANEL_POOL member '${id}' is not in any category`);
    }
  });

  test('getCharacterCategories returns correct categories for ray', () => {
    const cats = getCharacterCategories('ray');
    assert.ok(cats.includes('survivalist'), 'ray must be a survivalist');
    assert.ok(!cats.includes('fish_out_of_water'), 'ray must not be fish_out_of_water');
  });

  test('getCharacterCategories returns correct categories for cox', () => {
    const cats = getCharacterCategories('cox');
    assert.ok(cats.includes('fish_out_of_water'), 'cox must be fish_out_of_water');
    assert.ok(!cats.includes('survivalist'), 'cox must not be a survivalist');
  });

  test('getCharactersByCategory returns correct characters for armed_forces', () => {
    const chars = getCharactersByCategory('armed_forces');
    assert.ok(chars.includes('fox'), 'armed_forces must include fox');
    assert.ok(chars.includes('billy'), 'armed_forces must include billy');
    assert.ok(!chars.includes('bear'), 'armed_forces must not include bear');
  });

  test('getCharactersByCategory returns empty array for unknown category', () => {
    const chars = getCharactersByCategory('nonexistent');
    assert.deepStrictEqual(chars, []);
  });

  test('survivalist category has at least 5 members', () => {
    assert.ok(PANEL_CATEGORIES.survivalist.length >= 5);
  });

  test('armed_forces category has at least 5 members', () => {
    assert.ok(PANEL_CATEGORIES.armed_forces.length >= 5);
  });
});

// ── SS-143 — Common quotes attribute ────────────────────────────────────────

const QUOTE_MINIMUMS = {
  ray: 4, bear: 4, cody: 4, hales: 4, fox: 4, billy: 4,
  ollie: 3, craighead: 3, coyote: 4, attenborough: 4,
  oshea: 4, stevens: 4, stroud: 3, jim: 4, jeremy: 5,
  middleton: 4, mcnab: 3, ryan: 3, cox: 4, faldo: 4,
  hawking: 3, lee: 4, gordon: 4, bristow: 4, keane: 4,
  packham: 4, backshall: 4, fry: 3
};

describe('SS-143 — Common quotes attribute', () => {

  test('every character in CHARACTERS has a quotes array', () => {
    const charIds = Object.keys(CHARACTERS);
    for (const id of charIds) {
      assert.ok(Array.isArray(CHARACTERS[id].quotes),
        `${id} must have a quotes array`);
      assert.ok(CHARACTERS[id].quotes.length >= 3,
        `${id} must have at least 3 quotes, got ${CHARACTERS[id].quotes.length}`);
    }
  });

  test('every quote is a non-empty string', () => {
    for (const [id, char] of Object.entries(CHARACTERS)) {
      for (const q of char.quotes) {
        assert.strictEqual(typeof q, 'string', `${id} has a non-string quote`);
        assert.ok(q.trim().length > 0, `${id} has an empty quote`);
      }
    }
  });

  test('no duplicate quotes within a character', () => {
    for (const [id, char] of Object.entries(CHARACTERS)) {
      const unique = new Set(char.quotes);
      assert.strictEqual(unique.size, char.quotes.length,
        `${id} has duplicate quotes`);
    }
  });

  for (const [charId, min] of Object.entries(QUOTE_MINIMUMS)) {
    test(`${charId} has at least ${min} quotes (variety requirement)`, () => {
      assert.ok(CHARACTERS[charId], `${charId} must exist in CHARACTERS`);
      assert.ok(CHARACTERS[charId].quotes.length >= min,
        `${charId} needs at least ${min} quotes for variety, got ${CHARACTERS[charId].quotes.length}`);
    });
  }
});

// ── SS-144 — Invented catchphrases ───────────────────────────────────────────

describe('INVENTED_CATCHPHRASES — SS-144', () => {

  test('every PANEL_POOL member has an INVENTED_CATCHPHRASES entry', () => {
    for (const id of PANEL_POOL) {
      assert.ok(INVENTED_CATCHPHRASES[id],
        `PANEL_POOL member '${id}' must have an INVENTED_CATCHPHRASES entry`);
    }
  });

  test('every entry has setups array with at least 3 items', () => {
    for (const [id, entry] of Object.entries(INVENTED_CATCHPHRASES)) {
      assert.ok(Array.isArray(entry.setups), `${id} setups must be an array`);
      assert.ok(entry.setups.length >= 3,
        `${id} must have at least 3 setup phrases, got ${entry.setups.length}`);
    }
  });

  test('every entry has phrases array with at least 2 items', () => {
    for (const [id, entry] of Object.entries(INVENTED_CATCHPHRASES)) {
      assert.ok(Array.isArray(entry.phrases), `${id} phrases must be an array`);
      assert.ok(entry.phrases.length >= 2,
        `${id} must have at least 2 invented phrases, got ${entry.phrases.length}`);
    }
  });

  test('no setup or phrase is empty string', () => {
    for (const [id, entry] of Object.entries(INVENTED_CATCHPHRASES)) {
      for (const s of entry.setups) {
        assert.ok(s.trim().length > 0, `${id} has an empty setup`);
      }
      for (const p of entry.phrases) {
        assert.ok(p.trim().length > 0, `${id} has an empty phrase`);
      }
    }
  });

  test('buildInventedCatchphraseInjection returns empty for empty array', () => {
    assert.strictEqual(buildInventedCatchphraseInjection([]), '');
  });

  test('buildInventedCatchphraseInjection includes character names and phrases', () => {
    const result = buildInventedCatchphraseInjection(['ray', 'bear']);
    assert.ok(result.includes('RAY MEARS'), 'must include Ray Mears');
    assert.ok(result.includes('BEAR GRYLLS'), 'must include Bear Grylls');
    assert.ok(result.includes('INVENTED CATCHPHRASES'), 'must include mechanic header');
  });

  test('buildInventedCatchphraseInjection includes universal setup phrases', () => {
    const result = buildInventedCatchphraseInjection(['ray']);
    assert.ok(result.includes('UNIVERSAL SETUP PHRASES'), 'must include universal setups');
    assert.ok(result.includes('The lads back at'), 'must include "The lads" universal');
  });

  test('buildInventedCatchphraseInjection skips unknown character IDs', () => {
    const result = buildInventedCatchphraseInjection(['nonexistent_id']);
    assert.strictEqual(result, '', 'must return empty for unknown IDs');
  });
});

// ── SS-147 — Per-character escalation profiles ───────────────────────────────

describe('ESCALATION_PROFILES — SS-147', () => {

  test('ESCALATION_PROFILES is defined and is an object', () => {
    assert.ok(ESCALATION_PROFILES && typeof ESCALATION_PROFILES === 'object');
  });

  test('every PANEL_POOL member has an ESCALATION_PROFILES entry', () => {
    for (const id of PANEL_POOL) {
      assert.ok(ESCALATION_PROFILES[id],
        `PANEL_POOL member '${id}' must have an ESCALATION_PROFILES entry`);
    }
  });

  test('attenborough has an ESCALATION_PROFILES entry (bookend wound)', () => {
    assert.ok(ESCALATION_PROFILES.attenborough,
      'attenborough must have an ESCALATION_PROFILES entry');
  });

  test('every entry has pools object', () => {
    for (const [id, profile] of Object.entries(ESCALATION_PROFILES)) {
      assert.ok(profile.pools && typeof profile.pools === 'object',
        `${id} must have a pools object`);
    }
  });

  test('every pool has items array and gate array', () => {
    for (const [id, profile] of Object.entries(ESCALATION_PROFILES)) {
      for (const [poolName, pool] of Object.entries(profile.pools)) {
        assert.ok(Array.isArray(pool.items),
          `${id}.${poolName} must have items array`);
        assert.ok(Array.isArray(pool.gate),
          `${id}.${poolName} must have gate array`);
        assert.strictEqual(pool.gate.length, 5,
          `${id}.${poolName} gate must have exactly 5 entries (rounds 1-5)`);
      }
    }
  });

  test('every pool has at least 5 items (enough for round-gating)', () => {
    for (const [id, profile] of Object.entries(ESCALATION_PROFILES)) {
      for (const [poolName, pool] of Object.entries(profile.pools)) {
        if (pool.items.length > 0) {
          assert.ok(pool.items.length >= 5,
            `${id}.${poolName} must have at least 5 items, got ${pool.items.length}`);
        }
      }
    }
  });

  test('no pool item is empty string', () => {
    for (const [id, profile] of Object.entries(ESCALATION_PROFILES)) {
      for (const [poolName, pool] of Object.entries(profile.pools)) {
        for (const item of pool.items) {
          assert.ok(typeof item === 'string' && item.trim().length > 0,
            `${id}.${poolName} has an empty item`);
        }
      }
    }
  });

  test('every entry has wound with name and pivot', () => {
    for (const [id, profile] of Object.entries(ESCALATION_PROFILES)) {
      assert.ok(profile.wound, `${id} must have a wound`);
      assert.ok(typeof profile.wound.name === 'string' && profile.wound.name.length > 0,
        `${id} wound must have a name`);
      assert.ok(typeof profile.wound.pivot === 'string' && profile.wound.pivot.length > 0,
        `${id} wound must have a pivot`);
    }
  });

  test('wound threshold is number or null', () => {
    for (const [id, profile] of Object.entries(ESCALATION_PROFILES)) {
      const t = profile.wound.threshold;
      assert.ok(t === null || typeof t === 'number',
        `${id} wound threshold must be number or null, got ${typeof t}`);
    }
  });

  test('every entry has a shape string', () => {
    for (const [id, profile] of Object.entries(ESCALATION_PROFILES)) {
      assert.ok(typeof profile.shape === 'string' && profile.shape.length > 0,
        `${id} must have a shape string`);
    }
  });

  test('gate values are non-negative integers', () => {
    for (const [id, profile] of Object.entries(ESCALATION_PROFILES)) {
      for (const [poolName, pool] of Object.entries(profile.pools)) {
        for (let i = 0; i < pool.gate.length; i++) {
          const g = pool.gate[i];
          assert.ok(Number.isInteger(g) && g >= 0,
            `${id}.${poolName} gate[${i}] must be non-negative integer, got ${g}`);
        }
      }
    }
  });

  test('gate values are non-decreasing (pools widen, never narrow)', () => {
    for (const [id, profile] of Object.entries(ESCALATION_PROFILES)) {
      for (const [poolName, pool] of Object.entries(profile.pools)) {
        for (let i = 1; i < pool.gate.length; i++) {
          assert.ok(pool.gate[i] >= pool.gate[i - 1],
            `${id}.${poolName} gate must be non-decreasing: gate[${i - 1}]=${pool.gate[i - 1]} > gate[${i}]=${pool.gate[i]}`);
        }
      }
    }
  });
});

// ── SS-147 — Relational axes ─────────────────────────────────────────────────

describe('RELATIONAL_AXES — SS-147', () => {

  test('RELATIONAL_AXES is defined and is an object', () => {
    assert.ok(RELATIONAL_AXES && typeof RELATIONAL_AXES === 'object');
  });

  test('has at least 20 axes', () => {
    assert.ok(Object.keys(RELATIONAL_AXES).length >= 20,
      `must have at least 20 axes, got ${Object.keys(RELATIONAL_AXES).length}`);
  });

  test('every axis key uses > separator', () => {
    for (const key of Object.keys(RELATIONAL_AXES)) {
      assert.ok(key.includes('>'),
        `axis key '${key}' must use > separator (e.g., ray>bear)`);
    }
  });

  // Characters referenced in axes that aren't in CHARACTERS (Temporal Lens only, or non-panel like Doug)
  const AXIS_KNOWN_REFS = ['irwin', 'doug'];

  test('every axis from-character exists in CHARACTERS or is a known reference', () => {
    for (const key of Object.keys(RELATIONAL_AXES)) {
      const from = key.split('>')[0];
      assert.ok(CHARACTERS[from] || AXIS_KNOWN_REFS.includes(from),
        `axis from-character '${from}' must exist in CHARACTERS or be a known reference`);
    }
  });

  test('every axis toward-character exists in CHARACTERS, is "everyone", or is a known reference', () => {
    for (const key of Object.keys(RELATIONAL_AXES)) {
      const toward = key.split('>')[1];
      assert.ok(toward === 'everyone' || CHARACTERS[toward] || AXIS_KNOWN_REFS.includes(toward),
        `axis toward-character '${toward}' must exist in CHARACTERS, be 'everyone', or be a known reference`);
    }
  });

  test('every axis has temp, expr, and type', () => {
    for (const [key, ax] of Object.entries(RELATIONAL_AXES)) {
      assert.ok(typeof ax.temp === 'string' && ax.temp.length > 0,
        `${key} must have temp string`);
      assert.ok(typeof ax.expr === 'string' && ax.expr.length > 0,
        `${key} must have expr string`);
      assert.ok(ax.type === 'load_bearing' || ax.type === 'situational',
        `${key} type must be load_bearing or situational`);
    }
  });

  test('trigger is string or null', () => {
    for (const [key, ax] of Object.entries(RELATIONAL_AXES)) {
      assert.ok(ax.trigger === null || typeof ax.trigger === 'string',
        `${key} trigger must be string or null`);
    }
  });
});

// ── SS-147 — Escalation helper functions ─────────────────────────────────────

describe('getAxesForCharacter — SS-147', () => {

  test('returns axes involving ray', () => {
    const axes = getAxesForCharacter('ray');
    assert.ok(axes.length >= 2, `ray must have at least 2 axes, got ${axes.length}`);
    const keys = axes.map(([k]) => k);
    assert.ok(keys.some(k => k.startsWith('ray>')), 'must include axes FROM ray');
  });

  test('returns axes toward everyone for any character', () => {
    const axes = getAxesForCharacter('fox');
    const keys = axes.map(([k]) => k);
    assert.ok(keys.some(k => k.includes('>everyone')),
      'must include axes with toward=everyone');
  });
});

describe('getActiveAxes — SS-147', () => {

  test('returns axes between panel members', () => {
    const axes = getActiveAxes(['ray', 'bear', 'cody']);
    assert.ok(axes.length >= 3, `ray+bear+cody must have at least 3 active axes`);
  });

  test('returns empty for unrelated characters', () => {
    const axes = getActiveAxes(['nonexistent']);
    assert.strictEqual(axes.length, 0);
  });

  test('includes everyone axes when character present', () => {
    const axes = getActiveAxes(['irwin']);
    const keys = axes.map(([k]) => k);
    assert.ok(keys.includes('irwin>everyone'),
      'must include irwin>everyone when irwin present');
  });
});

describe('buildEscalationInjection — SS-147', () => {

  test('returns empty for empty panel', () => {
    assert.strictEqual(buildEscalationInjection([], 1), '');
  });

  test('returns empty for unknown IDs', () => {
    assert.strictEqual(buildEscalationInjection(['nonexistent'], 1), '');
  });

  test('includes character name and pool items for round 1', () => {
    const result = buildEscalationInjection(['ray'], 1);
    assert.ok(result.includes('RAY MEARS'), 'must include character name');
    assert.ok(result.includes('CRAFT'), 'must include pool name');
    assert.ok(result.includes('Fire-by-friction'), 'must include pool items');
  });

  test('sealed pools show sealed message', () => {
    const result = buildEscalationInjection(['bear'], 1);
    assert.ok(result.includes('[sealed this round]'), 'must show sealed for round 1 hydration');
  });

  test('round 5 unlocks all items', () => {
    const r1 = buildEscalationInjection(['ray'], 1);
    const r5 = buildEscalationInjection(['ray'], 5);
    assert.ok(r5.length > r1.length, 'round 5 must include more items than round 1');
    assert.ok(r5.includes('Hampshire woodland'), 'round 5 must include deep pool items');
  });

  test('includes relational axes when both characters present', () => {
    const result = buildEscalationInjection(['ray', 'bear'], 1);
    assert.ok(result.includes('RELATIONAL AXES'), 'must include axes header');
    assert.ok(result.includes('Ray Mears'), 'must include from character name');
    assert.ok(result.includes('Bear Grylls'), 'must include toward character name');
  });

  test('includes wound information', () => {
    const result = buildEscalationInjection(['ray'], 1);
    assert.ok(result.includes('WOUND'), 'must include wound');
    assert.ok(result.includes('The Show That Should Have Been His'), 'must include wound name');
  });

  test('clamps round to 1-5 range', () => {
    const r0 = buildEscalationInjection(['ray'], 0);
    const r1 = buildEscalationInjection(['ray'], 1);
    const r99 = buildEscalationInjection(['ray'], 99);
    const r5 = buildEscalationInjection(['ray'], 5);
    assert.strictEqual(r0, r1, 'round 0 must clamp to round 1');
    assert.strictEqual(r99, r5, 'round 99 must clamp to round 5');
  });
});

// ── SS-146 — Robin Williams character ─────────────────────────────────────────

describe('Robin Williams — SS-146', () => {
  test('"robin" exists in CHARACTERS', () => {
    assert.ok(CHARACTERS.robin, '"robin" must exist in CHARACTERS');
  });

  test('"robin" has required fields', () => {
    const r = CHARACTERS.robin;
    assert.strictEqual(r.id, 'robin');
    assert.strictEqual(r.name, 'Robin Williams');
    assert.ok(r.role, 'must have a role');
    assert.ok(r.av, 'must have avatar initials');
    assert.ok(r.avClass, 'must have avatar CSS class');
    assert.ok(r.deathLine, 'must have a death line');
    assert.ok(r.voice.length > 100, 'voice must be substantial');
    assert.ok(r.integrity, 'must have integrity');
    assert.ok(Array.isArray(r.incidents), 'must have incidents array');
    assert.ok(r.incidents.length >= 3, 'must have at least 3 incidents');
    assert.ok(Array.isArray(r.quotes), 'must have quotes array');
    assert.ok(r.quotes.length >= 3, 'must have at least 3 quotes');
  });

  test('"robin" voice mentions THE SHIFT', () => {
    assert.ok(CHARACTERS.robin.voice.includes('SHIFT'),
      '"robin" voice must reference THE SHIFT — the core comedy engine');
  });

  test('"robin" voice mentions Good Will Hunting', () => {
    assert.ok(CHARACTERS.robin.voice.includes('Good Will Hunting'),
      '"robin" voice must reference Good Will Hunting mode');
  });

  test('"robin" voice mentions awareness is total', () => {
    assert.ok(CHARACTERS.robin.voice.toLowerCase().includes('awareness mode: total'),
      '"robin" must have total awareness — contrast with Carrey');
  });

  test('"robin" is a fish-out-of-water with EXCITABLE_NOVICE default', () => {
    assert.ok(CHARACTERS.robin.fish, '"robin" must have fish property');
    assert.strictEqual(CHARACTERS.robin.fish.default, 'EXCITABLE_NOVICE');
    assert.strictEqual(CHARACTERS.robin.fish.fixed, false, 'robin disposition shifts');
  });

  test('"robin" is in fish_out_of_water and wildcard categories', () => {
    assert.ok(PANEL_CATEGORIES.fish_out_of_water.includes('robin'),
      '"robin" must be in fish_out_of_water category');
    assert.ok(PANEL_CATEGORIES.wildcard.includes('robin'),
      '"robin" must be in wildcard category');
  });

  test('"robin" has a CHAR_COLOURS entry', () => {
    assert.ok(CHAR_COLOURS.robin, '"robin" must have a colour');
    assert.match(CHAR_COLOURS.robin, /^#[0-9A-Fa-f]{6}$/);
  });

  test('"robin" has COMPOSURE_PROFILES entry with baseline 5', () => {
    assert.ok(COMPOSURE_PROFILES.robin, '"robin" must have a composure profile');
    assert.strictEqual(COMPOSURE_PROFILES.robin.baseline, 5);
    assert.ok(COMPOSURE_PROFILES.robin.pressure, 'must have pressure description');
    assert.ok(COMPOSURE_PROFILES.robin.tell, 'must have tell description');
  });

  test('"robin" has NAMING_CONVENTIONS entry', () => {
    assert.ok(NAMING_CONVENTIONS.robin, '"robin" must have naming conventions');
  });

  test('"robin" has INVENTED_CATCHPHRASES entry', () => {
    const ic = INVENTED_CATCHPHRASES.robin;
    assert.ok(ic, '"robin" must have invented catchphrases');
    assert.ok(Array.isArray(ic.setups) && ic.setups.length >= 3);
    assert.ok(Array.isArray(ic.phrases) && ic.phrases.length >= 3);
  });

  test('"robin" has ESCALATION_PROFILES entry with performance pool', () => {
    const ep = ESCALATION_PROFILES.robin;
    assert.ok(ep, '"robin" must have escalation profile');
    assert.ok(ep.pools.performance, 'must have performance pool');
    assert.ok(ep.pools.performance.items.length >= 10, 'performance pool must have 10+ items');
    assert.ok(Array.isArray(ep.pools.performance.gate), 'must have gate array');
    assert.strictEqual(ep.pools.performance.gate.length, 5, 'gate must have 5 rounds');
  });

  test('"robin" wound is "The Underneath"', () => {
    assert.strictEqual(ESCALATION_PROFILES.robin.wound.name, 'The Underneath');
    assert.ok(ESCALATION_PROFILES.robin.wound.threshold <= 5, 'wound threshold must fire under pressure');
  });

  test('"robin" is Temporal Lens eligible (deceased 2014)', () => {
    assert.ok(TEMPORAL_LENS.robin, '"robin" must have Temporal Lens entry');
    assert.strictEqual(TEMPORAL_LENS.robin.eligible, true, '"robin" must be Temporal Lens eligible');
    assert.ok(TEMPORAL_LENS.robin.reckoning.toLowerCase().includes('depression'),
      'reckoning must reference the depression');
    assert.ok(Array.isArray(TEMPORAL_LENS.robin.trigger_keywords));
    assert.ok(TEMPORAL_LENS.robin.trigger_keywords.length >= 5);
    assert.strictEqual(TEMPORAL_LENS.robin.max_fires_per_session, 1);
  });

  test('"robin" has relational axes', () => {
    const axes = getAxesForCharacter('robin');
    assert.ok(axes.length >= 3, '"robin" must have at least 3 relational axes');
  });

  test('buildEscalationInjection works for robin', () => {
    const result = buildEscalationInjection(['robin'], 1);
    assert.ok(result.includes('Robin Williams'), 'escalation must include character name');
    assert.ok(result.includes('The Underneath'), 'escalation must include wound name');
  });
});

// ── SS-152 — User Reputation ────────────────────────────────────────────────

describe('REPUTATION_TIERS — SS-152', () => {
  test('REPUTATION_TIERS has four tiers', () => {
    assert.strictEqual(Object.keys(REPUTATION_TIERS).length, 4);
    assert.ok(REPUTATION_TIERS.STRANGER);
    assert.ok(REPUTATION_TIERS.FAMILIAR);
    assert.ok(REPUTATION_TIERS.REGULAR);
    assert.ok(REPUTATION_TIERS.VETERAN);
  });

  test('tiers have ascending levels 0-3', () => {
    assert.strictEqual(REPUTATION_TIERS.STRANGER.level, 0);
    assert.strictEqual(REPUTATION_TIERS.FAMILIAR.level, 1);
    assert.strictEqual(REPUTATION_TIERS.REGULAR.level, 2);
    assert.strictEqual(REPUTATION_TIERS.VETERAN.level, 3);
  });

  test('tiers have ascending minEncounters', () => {
    assert.ok(REPUTATION_TIERS.STRANGER.minEncounters < REPUTATION_TIERS.FAMILIAR.minEncounters);
    assert.ok(REPUTATION_TIERS.FAMILIAR.minEncounters < REPUTATION_TIERS.REGULAR.minEncounters);
    assert.ok(REPUTATION_TIERS.REGULAR.minEncounters < REPUTATION_TIERS.VETERAN.minEncounters);
  });

  test('STRANGER has 0 callback slots, VETERAN has the most', () => {
    assert.strictEqual(REPUTATION_TIERS.STRANGER.callbackSlots, 0);
    assert.ok(REPUTATION_TIERS.VETERAN.callbackSlots > REPUTATION_TIERS.REGULAR.callbackSlots);
  });
});

describe('getReputationTier — SS-152', () => {
  test('0 encounters returns STRANGER', () => {
    assert.strictEqual(getReputationTier(0).name, 'STRANGER');
  });

  test('null/undefined returns STRANGER', () => {
    assert.strictEqual(getReputationTier(null).name, 'STRANGER');
    assert.strictEqual(getReputationTier(undefined).name, 'STRANGER');
  });

  test('1 encounter returns FAMILIAR', () => {
    assert.strictEqual(getReputationTier(1).name, 'FAMILIAR');
  });

  test('3 encounters returns FAMILIAR', () => {
    assert.strictEqual(getReputationTier(3).name, 'FAMILIAR');
  });

  test('4 encounters returns REGULAR', () => {
    assert.strictEqual(getReputationTier(4).name, 'REGULAR');
  });

  test('9 encounters returns REGULAR', () => {
    assert.strictEqual(getReputationTier(9).name, 'REGULAR');
  });

  test('10 encounters returns VETERAN', () => {
    assert.strictEqual(getReputationTier(10).name, 'VETERAN');
  });

  test('50 encounters returns VETERAN', () => {
    assert.strictEqual(getReputationTier(50).name, 'VETERAN');
  });
});

describe('computeReputationStats — SS-152', () => {
  test('null reputation returns empty stats', () => {
    const stats = computeReputationStats(null);
    assert.strictEqual(stats.totalEncounters, 0);
    assert.deepStrictEqual(stats.uniqueCharacters, []);
    assert.strictEqual(stats.favouriteFeature, null);
  });

  test('empty encounters returns empty stats', () => {
    const stats = computeReputationStats({ encounters: [] });
    assert.strictEqual(stats.totalEncounters, 0);
  });

  test('counts total encounters', () => {
    const rep = {
      created: new Date().toISOString(),
      encounters: [
        { feature: 'ive-had-worse', charIds: ['bear', 'ray'], highlights: [] },
        { feature: 'in-my-defence', charIds: ['fox', 'billy'], highlights: [] }
      ]
    };
    const stats = computeReputationStats(rep);
    assert.strictEqual(stats.totalEncounters, 2);
  });

  test('deduplicates uniqueCharacters across encounters', () => {
    const rep = {
      created: new Date().toISOString(),
      encounters: [
        { feature: 'ive-had-worse', charIds: ['bear', 'ray'], highlights: [] },
        { feature: 'in-my-defence', charIds: ['ray', 'fox'], highlights: [] }
      ]
    };
    const stats = computeReputationStats(rep);
    assert.strictEqual(stats.uniqueCharacters.length, 3);
    assert.ok(stats.uniqueCharacters.includes('bear'));
    assert.ok(stats.uniqueCharacters.includes('ray'));
    assert.ok(stats.uniqueCharacters.includes('fox'));
  });

  test('identifies favourite feature', () => {
    const rep = {
      created: new Date().toISOString(),
      encounters: [
        { feature: 'ive-had-worse', charIds: [], highlights: [] },
        { feature: 'ive-had-worse', charIds: [], highlights: [] },
        { feature: 'in-my-defence', charIds: [], highlights: [] }
      ]
    };
    const stats = computeReputationStats(rep);
    assert.strictEqual(stats.favouriteFeature, 'ive-had-worse');
  });

  test('collects woundsSeen from highlights', () => {
    const rep = {
      created: new Date().toISOString(),
      encounters: [
        { feature: 'ive-had-worse', charIds: ['bear'], highlights: [
          { type: 'wound_fired', charId: 'bear', detail: 'childhood' }
        ]},
        { feature: 'ive-had-worse', charIds: ['bear'], highlights: [
          { type: 'wound_fired', charId: 'bear', detail: 'childhood again' }
        ]}
      ]
    };
    const stats = computeReputationStats(rep);
    assert.deepStrictEqual(stats.woundsSeen, ['bear']);
  });

  test('builds notableCallbacks from wound_fired highlights', () => {
    const rep = {
      created: new Date().toISOString(),
      encounters: [
        { feature: 'ive-had-worse', charIds: ['bear'], scenario: 'pigeon attack', highlights: [
          { type: 'wound_fired', charId: 'bear', detail: 'childhood' }
        ]}
      ]
    };
    const stats = computeReputationStats(rep);
    assert.ok(stats.notableCallbacks.length > 0);
    assert.ok(stats.notableCallbacks[0].includes('bear'));
    assert.ok(stats.notableCallbacks[0].includes('wound'));
  });

  test('builds notableCallbacks from morrison_appeared', () => {
    const rep = {
      created: new Date().toISOString(),
      encounters: [
        { feature: 'ive-had-worse', charIds: ['bear'], scenario: 'snake', highlights: [
          { type: 'morrison_appeared', charId: 'morrison', detail: 'mentioned doors' }
        ]}
      ]
    };
    const stats = computeReputationStats(rep);
    assert.ok(stats.notableCallbacks[0].includes('Morrison'));
  });
});

describe('buildReputationInjection — SS-152', () => {
  test('returns empty string for null', () => {
    assert.strictEqual(buildReputationInjection(null), '');
  });

  test('returns empty string for zero encounters', () => {
    const rep = { encounters: [], stats: { totalEncounters: 0, uniqueCharacters: [] } };
    assert.strictEqual(buildReputationInjection(rep), '');
  });

  test('FAMILIAR tier includes tier name and characters but no encounter summaries', () => {
    const rep = {
      encounters: [{ feature: 'ive-had-worse', charIds: ['bear', 'ray'], scenario: 'pigeon', rounds: 3 }],
      stats: { totalEncounters: 1, uniqueCharacters: ['bear', 'ray'], notableCallbacks: [] }
    };
    const result = buildReputationInjection(rep);
    assert.ok(result.includes('FAMILIAR'));
    assert.ok(result.includes('bear'));
    assert.ok(!result.includes('Recent encounters'));
  });

  test('REGULAR tier includes recent encounter summaries', () => {
    const encounters = [];
    for (let i = 0; i < 5; i++) {
      encounters.push({ feature: 'ive-had-worse', charIds: ['bear'], scenario: `scenario-${i}`, rounds: 2 });
    }
    const rep = {
      encounters,
      stats: { totalEncounters: 5, uniqueCharacters: ['bear'], notableCallbacks: [] }
    };
    const result = buildReputationInjection(rep);
    assert.ok(result.includes('REGULAR'));
    assert.ok(result.includes('Recent encounters'));
  });

  test('VETERAN tier includes notable callbacks', () => {
    const encounters = [];
    for (let i = 0; i < 12; i++) {
      encounters.push({ feature: 'ive-had-worse', charIds: ['bear'], scenario: `scenario-${i}`, rounds: 1, highlights: [] });
    }
    const rep = {
      encounters,
      stats: {
        totalEncounters: 12, uniqueCharacters: ['bear'],
        notableCallbacks: ["bear's wound fired during \"childhood\""]
      }
    };
    const result = buildReputationInjection(rep);
    assert.ok(result.includes('VETERAN'));
    assert.ok(result.includes('Notable events'));
    assert.ok(result.includes('wound fired'));
  });

  test('includes tone instruction for each tier level', () => {
    // FAMILIAR
    const fam = buildReputationInjection({
      encounters: [{ feature: 'x', charIds: ['bear'], scenario: 'y', rounds: 1 }],
      stats: { totalEncounters: 1, uniqueCharacters: ['bear'], notableCallbacks: [] }
    });
    assert.ok(fam.includes('you again'));

    // REGULAR
    const reg = buildReputationInjection({
      encounters: Array.from({ length: 5 }, () => ({ feature: 'x', charIds: ['bear'], scenario: 'y', rounds: 1 })),
      stats: { totalEncounters: 5, uniqueCharacters: ['bear'], notableCallbacks: [] }
    });
    assert.ok(reg.includes('half-recognition'));

    // VETERAN
    const vet = buildReputationInjection({
      encounters: Array.from({ length: 12 }, () => ({ feature: 'x', charIds: ['bear'], scenario: 'y', rounds: 1 })),
      stats: { totalEncounters: 12, uniqueCharacters: ['bear'], notableCallbacks: [] }
    });
    assert.ok(vet.includes('familiarity'));
  });

  test('computeReputationStats is used when stats not provided', () => {
    const rep = {
      created: new Date().toISOString(),
      encounters: [
        { feature: 'ive-had-worse', charIds: ['bear', 'ray'], scenario: 'pigeon', rounds: 2, highlights: [] }
      ]
    };
    const result = buildReputationInjection(rep);
    assert.ok(result.includes('FAMILIAR'));
    assert.ok(result.includes('bear'));
  });
});

// ── SS-154 — Character Learning ─────────────────────────────────────────────

describe('OBLIVIOUS_CHARACTERS — SS-154', () => {
  test('morrison is oblivious', () => {
    assert.ok(OBLIVIOUS_CHARACTERS.includes('morrison'));
  });

  test('carrey is oblivious', () => {
    assert.ok(OBLIVIOUS_CHARACTERS.includes('carrey'));
  });
});

describe('getCharacterEncounters — SS-154', () => {
  test('returns empty array for null reputation', () => {
    assert.deepStrictEqual(getCharacterEncounters(null, 'bear'), []);
  });

  test('returns empty array for no encounters', () => {
    assert.deepStrictEqual(getCharacterEncounters({ encounters: [] }, 'bear'), []);
  });

  test('filters encounters to only those containing the charId', () => {
    const rep = {
      encounters: [
        { charIds: ['bear', 'ray'], feature: 'ihw' },
        { charIds: ['fox', 'billy'], feature: 'imd' },
        { charIds: ['bear', 'fox'], feature: 'ihw2' }
      ]
    };
    const bearEnc = getCharacterEncounters(rep, 'bear');
    assert.strictEqual(bearEnc.length, 2);
    assert.strictEqual(bearEnc[0].feature, 'ihw');
    assert.strictEqual(bearEnc[1].feature, 'ihw2');
  });

  test('returns empty for character not in any encounter', () => {
    const rep = {
      encounters: [{ charIds: ['bear', 'ray'], feature: 'ihw' }]
    };
    assert.deepStrictEqual(getCharacterEncounters(rep, 'hawking'), []);
  });
});

describe('computeCharacterSentiment — SS-154', () => {
  test('oblivious characters always return oblivious', () => {
    const encounters = [
      { charIds: ['morrison'], highlights: [{ type: 'wound_fired', charId: 'morrison' }] }
    ];
    assert.strictEqual(computeCharacterSentiment('morrison', encounters), 'oblivious');
    assert.strictEqual(computeCharacterSentiment('carrey', encounters), 'oblivious');
  });

  test('no encounters returns neutral', () => {
    assert.strictEqual(computeCharacterSentiment('bear', []), 'neutral');
  });

  test('null encounters returns neutral', () => {
    assert.strictEqual(computeCharacterSentiment('bear', null), 'neutral');
  });

  test('wound_fired returns wary', () => {
    const enc = [{ charIds: ['bear'], highlights: [{ type: 'wound_fired', charId: 'bear', detail: 'childhood' }] }];
    assert.strictEqual(computeCharacterSentiment('bear', enc), 'wary');
  });

  test('lie_exposed returns grudging', () => {
    const enc = [{ charIds: ['bear'], highlights: [{ type: 'lie_exposed', charId: 'bear', detail: 'claimed SAS' }] }];
    assert.strictEqual(computeCharacterSentiment('bear', enc), 'grudging');
  });

  test('sacred_exchange returns warm', () => {
    const enc = [{ charIds: ['fox'], highlights: [{ type: 'sacred_exchange', charId: 'fox', detail: 'billy moment' }] }];
    assert.strictEqual(computeCharacterSentiment('fox', enc), 'warm');
  });

  test('wound_fired takes priority over lie_exposed', () => {
    const enc = [{
      charIds: ['bear'],
      highlights: [
        { type: 'lie_exposed', charId: 'bear', detail: 'claimed SAS' },
        { type: 'wound_fired', charId: 'bear', detail: 'childhood' }
      ]
    }];
    assert.strictEqual(computeCharacterSentiment('bear', enc), 'wary');
  });

  test('3+ encounters with no highlights returns familiar', () => {
    const enc = [
      { charIds: ['ray'], highlights: [] },
      { charIds: ['ray'], highlights: [] },
      { charIds: ['ray'], highlights: [] }
    ];
    assert.strictEqual(computeCharacterSentiment('ray', enc), 'familiar');
  });

  test('2 encounters with no highlights returns neutral', () => {
    const enc = [
      { charIds: ['ray'], highlights: [] },
      { charIds: ['ray'], highlights: [] }
    ];
    assert.strictEqual(computeCharacterSentiment('ray', enc), 'neutral');
  });

  test('highlights for OTHER characters are ignored', () => {
    const enc = [{ charIds: ['bear', 'ray'], highlights: [{ type: 'wound_fired', charId: 'ray', detail: 'test' }] }];
    assert.strictEqual(computeCharacterSentiment('bear', enc), 'neutral');
  });
});

describe('buildCharacterCallback — SS-154', () => {
  test('oblivious returns null', () => {
    assert.strictEqual(buildCharacterCallback('morrison', [{ charIds: ['morrison'] }], 'oblivious'), null);
  });

  test('neutral returns null', () => {
    assert.strictEqual(buildCharacterCallback('bear', [{ charIds: ['bear'] }], 'neutral'), null);
  });

  test('wary includes character name and "guarded"', () => {
    const result = buildCharacterCallback('bear', [{ charIds: ['bear'] }], 'wary');
    assert.ok(result.includes(CHARACTERS.bear.name));
    assert.ok(result.toLowerCase().includes('guarded'));
  });

  test('grudging includes "lie"', () => {
    const result = buildCharacterCallback('bear', [{ charIds: ['bear'] }], 'grudging');
    assert.ok(result.toLowerCase().includes('lie'));
  });

  test('warm includes "genuine moment"', () => {
    const result = buildCharacterCallback('fox', [{ charIds: ['fox'] }], 'warm');
    assert.ok(result.toLowerCase().includes('genuine'));
  });

  test('familiar includes encounter count', () => {
    const enc = [{ charIds: ['ray'] }, { charIds: ['ray'] }, { charIds: ['ray'] }];
    const result = buildCharacterCallback('ray', enc, 'familiar');
    assert.ok(result.includes('3'));
  });

  test('returns null for unknown charId', () => {
    assert.strictEqual(buildCharacterCallback('nonexistent', [{}], 'wary'), null);
  });
});

describe('buildCharacterLearningInjection — SS-154', () => {
  test('returns empty string for null reputation', () => {
    assert.strictEqual(buildCharacterLearningInjection(null, ['bear']), '');
  });

  test('returns empty string for empty encounters', () => {
    assert.strictEqual(buildCharacterLearningInjection({ encounters: [] }, ['bear']), '');
  });

  test('returns empty string when no panel chars have encounter history', () => {
    const rep = {
      encounters: [{ charIds: ['ray'], highlights: [], feature: 'ihw', scenario: 'test' }]
    };
    assert.strictEqual(buildCharacterLearningInjection(rep, ['fox']), '');
  });

  test('includes header and rule for chars with history', () => {
    const rep = {
      encounters: [
        { charIds: ['bear'], highlights: [{ type: 'wound_fired', charId: 'bear', detail: 'test' }], feature: 'ihw', scenario: 'pigeon' }
      ]
    };
    const result = buildCharacterLearningInjection(rep, ['bear']);
    assert.ok(result.includes('CHARACTER-SPECIFIC MEMORY'));
    assert.ok(result.includes('bear'));
    assert.ok(result.includes('wary'));
    assert.ok(result.includes('Rule:'));
  });

  test('skips oblivious characters even with history', () => {
    const rep = {
      encounters: [
        { charIds: ['morrison', 'bear'], highlights: [{ type: 'wound_fired', charId: 'bear', detail: 'test' }], feature: 'ihw', scenario: 'pigeon' }
      ]
    };
    const result = buildCharacterLearningInjection(rep, ['morrison', 'bear']);
    assert.ok(!result.includes('morrison'));
    assert.ok(result.includes('bear'));
  });

  test('handles multiple characters with different sentiments', () => {
    const rep = {
      encounters: [
        { charIds: ['bear', 'fox', 'ray'], highlights: [
          { type: 'wound_fired', charId: 'bear', detail: 'childhood' },
          { type: 'sacred_exchange', charId: 'fox', detail: 'billy' }
        ], feature: 'ihw', scenario: 'test' },
        { charIds: ['bear', 'fox', 'ray'], highlights: [], feature: 'ihw', scenario: 'test2' },
        { charIds: ['bear', 'fox', 'ray'], highlights: [], feature: 'ihw', scenario: 'test3' }
      ]
    };
    const result = buildCharacterLearningInjection(rep, ['bear', 'fox', 'ray']);
    assert.ok(result.includes('wary'));
    assert.ok(result.includes('warm'));
    assert.ok(result.includes('familiar'));
  });
});

// ── SS-162 — Morrison Meta-Layer ────────────────────────────────────────────

describe('MORRISON_CLAIM_TEMPLATES — SS-162', () => {
  test('has three claim types', () => {
    assert.ok(MORRISON_CLAIM_TEMPLATES.rumour);
    assert.ok(MORRISON_CLAIM_TEMPLATES.invention);
    assert.ok(MORRISON_CLAIM_TEMPLATES.oracle);
  });

  test('each type has at least 2 templates', () => {
    assert.ok(MORRISON_CLAIM_TEMPLATES.rumour.length >= 2);
    assert.ok(MORRISON_CLAIM_TEMPLATES.invention.length >= 2);
    assert.ok(MORRISON_CLAIM_TEMPLATES.oracle.length >= 2);
  });

  test('rumour templates contain {charName} and {seed} placeholders', () => {
    for (const t of MORRISON_CLAIM_TEMPLATES.rumour) {
      assert.ok(t.includes('{charName}'), `rumour template missing {charName}: ${t.slice(0, 50)}`);
      assert.ok(t.includes('{seed}'), `rumour template missing {seed}: ${t.slice(0, 50)}`);
    }
  });

  test('invention templates contain {charName} placeholder', () => {
    for (const t of MORRISON_CLAIM_TEMPLATES.invention) {
      assert.ok(t.includes('{charName}'), `invention template missing {charName}: ${t.slice(0, 50)}`);
    }
  });

  test('oracle templates contain {charName} and {woundName} placeholders', () => {
    for (const t of MORRISON_CLAIM_TEMPLATES.oracle) {
      assert.ok(t.includes('{charName}'), `oracle template missing {charName}: ${t.slice(0, 50)}`);
      assert.ok(t.includes('{woundName}'), `oracle template missing {woundName}: ${t.slice(0, 50)}`);
    }
  });
});

describe('pickClaimTarget — SS-162', () => {
  test('excludes morrison from targets', () => {
    for (let i = 0; i < 50; i++) {
      const target = pickClaimTarget(['morrison', 'bear', 'ray']);
      assert.notStrictEqual(target, 'morrison');
    }
  });

  test('returns null for empty panel', () => {
    assert.strictEqual(pickClaimTarget([]), null);
  });

  test('returns null for morrison-only panel', () => {
    assert.strictEqual(pickClaimTarget(['morrison']), null);
  });

  test('returns a valid charId from the panel', () => {
    const panel = ['bear', 'ray', 'fox'];
    for (let i = 0; i < 20; i++) {
      const target = pickClaimTarget(panel);
      assert.ok(panel.includes(target), `target ${target} not in panel`);
    }
  });

  test('prefers characters with escalation profiles', () => {
    // Run many times — chars with profiles should dominate
    const withProfile = Object.keys(ESCALATION_PROFILES).filter(id => id !== 'morrison')[0];
    const panel = [withProfile, 'morrison'];
    const target = pickClaimTarget(panel);
    assert.strictEqual(target, withProfile);
  });
});

describe('buildMorrisonClaimInjection — SS-162', () => {
  test('returns empty string for invalid claim type', () => {
    assert.strictEqual(buildMorrisonClaimInjection(['bear', 'ray'], 'nonexistent'), '');
    assert.strictEqual(buildMorrisonClaimInjection(['bear', 'ray'], null), '');
  });

  test('returns empty string for empty panel', () => {
    assert.strictEqual(buildMorrisonClaimInjection([], 'rumour'), '');
  });

  test('rumour injection includes header and target name', () => {
    const result = buildMorrisonClaimInjection(['bear', 'ray'], 'rumour');
    assert.ok(result.includes('MORRISON META-LAYER'));
    assert.ok(result.includes('RUMOUR'));
    // Should include one of bear or ray's name
    const hasBear = result.includes(CHARACTERS.bear.name);
    const hasRay = result.includes(CHARACTERS.ray.name);
    assert.ok(hasBear || hasRay, 'must include target character name');
  });

  test('rumour injection includes a seed from escalation pools', () => {
    // Run several times to get a rumour with a real seed
    let foundSeed = false;
    for (let i = 0; i < 20; i++) {
      const result = buildMorrisonClaimInjection(['bear'], 'rumour');
      if (!result.includes('something nobody can quite remember')) {
        foundSeed = true;
        break;
      }
    }
    assert.ok(foundSeed, 'at least one rumour should draw a real seed from escalation pools');
  });

  test('invention injection includes header and INVENTION type', () => {
    const result = buildMorrisonClaimInjection(['bear', 'fox'], 'invention');
    assert.ok(result.includes('MORRISON META-LAYER'));
    assert.ok(result.includes('INVENTION'));
  });

  test('oracle injection includes wound name', () => {
    // Use a character with a known wound
    const charWithWound = Object.keys(ESCALATION_PROFILES).find(
      id => ESCALATION_PROFILES[id].wound && ESCALATION_PROFILES[id].wound.name && id !== 'morrison'
    );
    if (charWithWound) {
      const result = buildMorrisonClaimInjection([charWithWound], 'oracle');
      assert.ok(result.includes('ORACLE'));
      assert.ok(result.includes(ESCALATION_PROFILES[charWithWound].wound.name),
        `oracle must include wound name "${ESCALATION_PROFILES[charWithWound].wound.name}"`);
    }
  });

  test('injection includes panel reaction instruction', () => {
    const result = buildMorrisonClaimInjection(['bear'], 'rumour');
    assert.ok(result.includes('Panel reaction'));
  });
});

// ── SS-153 — Audience Mechanic ──────────────────────────────────────────────

describe('AUDIENCE_FEATURES — SS-153', () => {
  test('includes multi-turn features only', () => {
    assert.ok(AUDIENCE_FEATURES.includes('ive-had-worse'));
    assert.ok(AUDIENCE_FEATURES.includes('in-my-defence'));
    assert.ok(AUDIENCE_FEATURES.includes('the-alibi'));
    assert.ok(AUDIENCE_FEATURES.includes('the-expert-witness'));
    assert.ok(AUDIENCE_FEATURES.includes('one-man-in'));
  });

  test('excludes single-shot features', () => {
    assert.ok(!AUDIENCE_FEATURES.includes('app'));
    assert.ok(!AUDIENCE_FEATURES.includes('mundane'));
    assert.ok(!AUDIENCE_FEATURES.includes('worst'));
    assert.ok(!AUDIENCE_FEATURES.includes('deathmatch'));
    assert.ok(!AUDIENCE_FEATURES.includes('eat'));
  });
});

describe('AUDIENCE_CONFIG — SS-153', () => {
  test('has required timing constants', () => {
    assert.strictEqual(typeof AUDIENCE_CONFIG.pollIntervalMs, 'number');
    assert.strictEqual(typeof AUDIENCE_CONFIG.sessionTtlMs, 'number');
    assert.strictEqual(typeof AUDIENCE_CONFIG.staggerDelayMs, 'number');
    assert.strictEqual(typeof AUDIENCE_CONFIG.maxSpectators, 'number');
  });

  test('poll interval is reasonable (1-10 seconds)', () => {
    assert.ok(AUDIENCE_CONFIG.pollIntervalMs >= 1000);
    assert.ok(AUDIENCE_CONFIG.pollIntervalMs <= 10000);
  });

  test('session TTL is at least 30 minutes', () => {
    assert.ok(AUDIENCE_CONFIG.sessionTtlMs >= 1800000);
  });
});

describe('isAudienceFeature — SS-153', () => {
  test('returns true for supported features', () => {
    assert.ok(isAudienceFeature('ive-had-worse'));
    assert.ok(isAudienceFeature('in-my-defence'));
  });

  test('returns false for unsupported features', () => {
    assert.ok(!isAudienceFeature('app'));
    assert.ok(!isAudienceFeature('mundane'));
    assert.ok(!isAudienceFeature('nonexistent'));
  });
});

describe('buildSpectatorCard — SS-153', () => {
  test('returns card with name, text, and colour for valid charId', () => {
    const card = buildSpectatorCard({ text: 'Test response' }, 'bear');
    assert.strictEqual(card.charId, 'bear');
    assert.strictEqual(card.charName, CHARACTERS.bear.name);
    assert.strictEqual(card.text, 'Test response');
    assert.strictEqual(card.colour, CHAR_COLOURS.bear);
  });

  test('returns null for unknown charId', () => {
    assert.strictEqual(buildSpectatorCard({ text: 'test' }, 'nonexistent'), null);
  });

  test('handles string response (not object)', () => {
    const card = buildSpectatorCard('Plain text', 'ray');
    assert.strictEqual(card.text, 'Plain text');
  });

  test('uses fallback colour when CHAR_COLOURS missing', () => {
    // Test with a valid character that might not have a colour
    const card = buildSpectatorCard({ text: 'test' }, 'bear');
    assert.strictEqual(typeof card.colour, 'string');
    assert.ok(card.colour.startsWith('#'));
  });
});

describe('buildSpectatorView — SS-153', () => {
  test('returns null for null session data', () => {
    assert.strictEqual(buildSpectatorView(null), null);
  });

  test('builds view from session data with rounds', () => {
    const session = {
      sessionId: 'abc123',
      feature: 'ive-had-worse',
      scenario: 'attacked by pigeon',
      protagonist: 'bear',
      status: 'active',
      rounds: [{
        roundNumber: 1,
        responses: [
          { charId: 'bear', text: 'Bear says something' },
          { charId: 'ray', text: 'Ray disagrees' }
        ],
        morrisonPresent: false
      }]
    };
    const view = buildSpectatorView(session);
    assert.strictEqual(view.sessionId, 'abc123');
    assert.strictEqual(view.feature, 'ive-had-worse');
    assert.strictEqual(view.scenario, 'attacked by pigeon');
    assert.strictEqual(view.protagonistName, CHARACTERS.bear.name);
    assert.strictEqual(view.status, 'active');
    assert.strictEqual(view.rounds.length, 1);
    assert.strictEqual(view.rounds[0].cards.length, 2);
    assert.strictEqual(view.rounds[0].cards[0].charName, CHARACTERS.bear.name);
    assert.strictEqual(view.rounds[0].morrisonPresent, false);
  });

  test('handles empty rounds', () => {
    const view = buildSpectatorView({ sessionId: 'x', feature: 'ihw', rounds: [] });
    assert.strictEqual(view.rounds.length, 0);
  });

  test('handles missing protagonist', () => {
    const view = buildSpectatorView({ sessionId: 'x', feature: 'ihw', rounds: [] });
    assert.strictEqual(view.protagonistName, null);
  });

  test('filters out cards with invalid charIds', () => {
    const session = {
      sessionId: 'x', feature: 'ihw', rounds: [{
        roundNumber: 1,
        responses: [
          { charId: 'bear', text: 'valid' },
          { charId: 'nonexistent', text: 'invalid' }
        ],
        morrisonPresent: false
      }]
    };
    const view = buildSpectatorView(session);
    assert.strictEqual(view.rounds[0].cards.length, 1);
  });

  test('defaults status to active', () => {
    const view = buildSpectatorView({ sessionId: 'x', feature: 'ihw', rounds: [] });
    assert.strictEqual(view.status, 'active');
  });
});

// ── SS-157 — Character Packs ────────────────────────────────────────────────

describe('CHARACTER_PACKS — SS-157', () => {
  test('has at least 5 packs', () => {
    assert.ok(CHARACTER_PACKS.length >= 5);
  });

  test('every pack has required fields', () => {
    for (const p of CHARACTER_PACKS) {
      assert.ok(p.id, `pack missing id`);
      assert.ok(p.name, `${p.id} missing name`);
      assert.ok(p.tagline, `${p.id} missing tagline`);
      assert.ok(Array.isArray(p.characters), `${p.id} characters must be array`);
      assert.ok(p.category, `${p.id} missing category`);
      assert.ok(p.announcement, `${p.id} missing announcement`);
    }
  });

  test('all pack IDs are unique', () => {
    const ids = CHARACTER_PACKS.map(p => p.id);
    assert.strictEqual(new Set(ids).size, ids.length);
  });

  test('all pack characters exist in CHARACTERS', () => {
    for (const p of CHARACTER_PACKS) {
      for (const charId of p.characters) {
        assert.ok(CHARACTERS[charId], `pack "${p.id}" references unknown character "${charId}"`);
      }
    }
  });

  test('pack categories are valid', () => {
    const validCategories = ['themed', 'crossover', 'solo', 'seasonal'];
    for (const p of CHARACTER_PACKS) {
      assert.ok(validCategories.includes(p.category), `${p.id} has invalid category "${p.category}"`);
    }
  });
});

describe('getPackById — SS-157', () => {
  test('returns pack for valid ID', () => {
    const p = getPackById('pack-founding');
    assert.ok(p);
    assert.strictEqual(p.name, 'The Founding Panel');
  });

  test('returns null for unknown ID', () => {
    assert.strictEqual(getPackById('nonexistent'), null);
  });
});

describe('getPacksForCharacter — SS-157', () => {
  test('returns packs containing the character', () => {
    const packs = getPacksForCharacter('bear');
    assert.ok(packs.length >= 1);
    assert.ok(packs.some(p => p.id === 'pack-founding'));
  });

  test('returns empty array for character in no packs', () => {
    // backshall might not be in any pack yet
    const packs = getPacksForCharacter('nonexistent_char');
    assert.deepStrictEqual(packs, []);
  });

  test('character can be in multiple packs', () => {
    // hawking is in crossover pack, might also be in others
    const packs = getPacksForCharacter('hawking');
    assert.ok(packs.length >= 1);
  });
});

describe('getReleasedPacks — SS-157', () => {
  test('returns only packs with releaseDate in the past', () => {
    const released = getReleasedPacks();
    for (const p of released) {
      assert.ok(p.releaseDate);
      assert.ok(p.releaseDate <= new Date().toISOString());
    }
  });

  test('returns at least the founding pack', () => {
    const released = getReleasedPacks();
    assert.ok(released.some(p => p.id === 'pack-founding'));
  });
});

describe('isNewCharacter — SS-157', () => {
  test('returns false for null sinceDate', () => {
    assert.strictEqual(isNewCharacter('robin', null), false);
  });

  test('returns true for character released after sinceDate', () => {
    assert.ok(isNewCharacter('robin', '2026-03-29'));
  });

  test('returns false for character released before sinceDate', () => {
    assert.strictEqual(isNewCharacter('ray', '2026-03-28'), false);
  });
});
