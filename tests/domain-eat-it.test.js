/**
 * tests/domain-eat-it.test.js
 * Unit tests for js/eat-it-species.js — species edibility database
 * SS-168 — Will You Eat It deep content
 *
 * Run: node --test tests/domain-eat-it.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import {
  EDIBILITY_LEVELS, EAT_IT_CATEGORIES, EAT_IT_SPECIES,
  getSpeciesByCategory, getSpeciesById, getEdibilityLevel,
  buildEatItPromptContext
} from '../js/eat-it-species.js';

// ── Constants ───────────────────────────────────────────────────────────────

describe('EDIBILITY_LEVELS — SS-168', () => {
  test('has 5 levels in order', () => {
    assert.deepStrictEqual(EDIBILITY_LEVELS, ['SAFE', 'CAUTION', 'RISKY', 'POISONOUS', 'DEADLY']);
  });
});

describe('EAT_IT_CATEGORIES — SS-168', () => {
  test('has 6 categories', () => {
    assert.strictEqual(EAT_IT_CATEGORIES.length, 6);
    assert.ok(EAT_IT_CATEGORIES.includes('mushrooms'));
    assert.ok(EAT_IT_CATEGORIES.includes('berries'));
    assert.ok(EAT_IT_CATEGORIES.includes('insects'));
    assert.ok(EAT_IT_CATEGORIES.includes('reptiles'));
    assert.ok(EAT_IT_CATEGORIES.includes('plants'));
    assert.ok(EAT_IT_CATEGORIES.includes('marine'));
  });
});

// ── Species database integrity ──────────────────────────────────────────────

describe('EAT_IT_SPECIES — SS-168', () => {
  test('has at least 50 species', () => {
    assert.ok(EAT_IT_SPECIES.length >= 50, `expected ≥50 species, got ${EAT_IT_SPECIES.length}`);
  });

  test('every species has required fields', () => {
    for (const s of EAT_IT_SPECIES) {
      assert.ok(s.id, `species missing id: ${JSON.stringify(s).slice(0, 80)}`);
      assert.ok(s.commonName, `${s.id} missing commonName`);
      assert.ok(s.scientificName, `${s.id} missing scientificName`);
      assert.ok(s.category, `${s.id} missing category`);
      assert.ok(s.edibility, `${s.id} missing edibility`);
      assert.ok(s.keyFact, `${s.id} missing keyFact`);
    }
  });

  test('all species IDs are unique', () => {
    const ids = EAT_IT_SPECIES.map(s => s.id);
    const unique = new Set(ids);
    assert.strictEqual(unique.size, ids.length, `duplicate IDs found: ${ids.filter((id, i) => ids.indexOf(id) !== i)}`);
  });

  test('all edibility levels are valid', () => {
    for (const s of EAT_IT_SPECIES) {
      assert.ok(EDIBILITY_LEVELS.includes(s.edibility),
        `${s.id} has invalid edibility "${s.edibility}"`);
    }
  });

  test('all categories are valid', () => {
    for (const s of EAT_IT_SPECIES) {
      assert.ok(EAT_IT_CATEGORIES.includes(s.category),
        `${s.id} has invalid category "${s.category}"`);
    }
  });

  test('every category has at least 5 species', () => {
    for (const cat of EAT_IT_CATEGORIES) {
      const count = EAT_IT_SPECIES.filter(s => s.category === cat).length;
      assert.ok(count >= 5, `category "${cat}" has only ${count} species (need ≥5)`);
    }
  });

  test('every category has at least one SAFE and one DEADLY species', () => {
    for (const cat of EAT_IT_CATEGORIES) {
      const species = EAT_IT_SPECIES.filter(s => s.category === cat);
      assert.ok(species.some(s => s.edibility === 'SAFE'),
        `category "${cat}" has no SAFE species`);
      assert.ok(species.some(s => s.edibility === 'DEADLY'),
        `category "${cat}" has no DEADLY species`);
    }
  });

  test('death cap is DEADLY', () => {
    const dc = EAT_IT_SPECIES.find(s => s.id === 'death_cap');
    assert.ok(dc);
    assert.strictEqual(dc.edibility, 'DEADLY');
    assert.ok(dc.keyFact.includes('90%'));
  });

  test('witchetty grub is SAFE', () => {
    const wg = EAT_IT_SPECIES.find(s => s.id === 'witchetty_grub');
    assert.ok(wg);
    assert.strictEqual(wg.edibility, 'SAFE');
    assert.ok(wg.keyFact.includes('Hiddins'));
  });

  test('manchineel is DEADLY', () => {
    const m = EAT_IT_SPECIES.find(s => s.id === 'manchineel');
    assert.ok(m);
    assert.strictEqual(m.edibility, 'DEADLY');
    assert.ok(m.keyFact.toLowerCase().includes('apple of death'));
  });
});

// ── Lookup functions ────────────────────────────────────────────────────────

describe('getSpeciesByCategory — SS-168', () => {
  test('returns all mushroom species', () => {
    const mushrooms = getSpeciesByCategory('mushrooms');
    assert.ok(mushrooms.length >= 5);
    assert.ok(mushrooms.every(s => s.category === 'mushrooms'));
  });

  test('returns empty array for unknown category', () => {
    assert.deepStrictEqual(getSpeciesByCategory('nonexistent'), []);
  });
});

describe('getSpeciesById — SS-168', () => {
  test('returns species for valid ID', () => {
    const s = getSpeciesById('death_cap');
    assert.ok(s);
    assert.strictEqual(s.commonName, 'Death cap');
  });

  test('returns null for unknown ID', () => {
    assert.strictEqual(getSpeciesById('nonexistent'), null);
  });
});

describe('getEdibilityLevel — SS-168', () => {
  test('returns level for valid ID', () => {
    assert.strictEqual(getEdibilityLevel('death_cap'), 'DEADLY');
    assert.strictEqual(getEdibilityLevel('blackberry'), 'SAFE');
  });

  test('returns null for unknown ID', () => {
    assert.strictEqual(getEdibilityLevel('nonexistent'), null);
  });
});

describe('buildEatItPromptContext — SS-168', () => {
  test('returns formatted prompt context for valid species', () => {
    const ctx = buildEatItPromptContext('death_cap');
    assert.ok(ctx.includes('Death cap'));
    assert.ok(ctx.includes('Amanita phalloides'));
    assert.ok(ctx.includes('DEADLY'));
    assert.ok(ctx.includes('mushrooms'));
    assert.ok(ctx.includes('90%'));
  });

  test('returns empty string for unknown species', () => {
    assert.strictEqual(buildEatItPromptContext('nonexistent'), '');
  });

  test('includes all four lines', () => {
    const ctx = buildEatItPromptContext('witchetty_grub');
    assert.ok(ctx.includes('SPECIES:'));
    assert.ok(ctx.includes('CATEGORY:'));
    assert.ok(ctx.includes('EDIBILITY:'));
    assert.ok(ctx.includes('KEY FACT:'));
  });
});
