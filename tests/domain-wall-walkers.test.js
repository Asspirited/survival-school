/**
 * tests/domain-wall-walkers.test.js
 * Unit tests for js/wall-walkers.js — Wall Walkers data layer
 * SS-172 — GPS-triggered quiz + flora/fauna collection
 *
 * Run: node --test tests/domain-wall-walkers.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import {
  WALL_STOPS, CATEGORIES, QUESTIONS, COLLECTION_SPECIES,
  getStopById, getAllStops, getStopsByDay,
  getQuestionsForStop, getGeneralQuestions, getQuestionsByCategory, getQuestionById,
  getSpeciesByRarity, getSpeciesByType, getSpeciesById,
  distanceMetres, getNearestStop, isWithinTriggerZone, getTriggeredStops,
  getCollectionStats, scoreAnswer,
} from '../js/wall-walkers.js';

// ���─ WALL_STOPS ─────────────────────────────────────────────────────

describe('WALL_STOPS — SS-172', () => {
  test('has 13 stops', () => {
    assert.strictEqual(Object.keys(WALL_STOPS).length, 13);
  });

  test('every stop has required fields', () => {
    for (const [key, stop] of Object.entries(WALL_STOPS)) {
      assert.strictEqual(stop.id, key, `${key} id matches key`);
      assert.ok(typeof stop.name === 'string' && stop.name.length > 0, `${key} has name`);
      assert.ok(typeof stop.lat === 'number', `${key} has lat`);
      assert.ok(typeof stop.lng === 'number', `${key} has lng`);
      assert.ok(typeof stop.radius === 'number' && stop.radius > 0, `${key} has radius`);
      assert.ok(typeof stop.day === 'number' && stop.day >= 1 && stop.day <= 6, `${key} has valid day`);
    }
  });

  test('stops span days 1 through 6', () => {
    const days = new Set(Object.values(WALL_STOPS).map(s => s.day));
    for (let d = 1; d <= 6; d++) {
      assert.ok(days.has(d), `day ${d} has at least one stop`);
    }
  });

  test('bowness is the western terminus', () => {
    assert.strictEqual(WALL_STOPS.bowness.romanName, 'Maia');
    assert.strictEqual(WALL_STOPS.bowness.day, 1);
  });

  test('wallsend is the eastern terminus', () => {
    assert.strictEqual(WALL_STOPS.wallsend.romanName, 'Segedunum');
    assert.strictEqual(WALL_STOPS.wallsend.day, 6);
  });
});

// ── CATEGORIES ─���───────────────────────────────────────────────────

describe('CATEGORIES — SS-172', () => {
  test('has 12 categories', () => {
    assert.strictEqual(Object.keys(CATEGORIES).length, 12);
  });

  test('every category has id, label, icon', () => {
    for (const [key, cat] of Object.entries(CATEGORIES)) {
      assert.strictEqual(cat.id, key);
      assert.ok(cat.label.length > 0);
      assert.ok(cat.icon.length > 0);
    }
  });
});

// ── QUESTIONS ──────────────────────────────────────────────────────

describe('QUESTIONS — SS-172', () => {
  test('has at least 75 questions', () => {
    assert.ok(QUESTIONS.length >= 75, `expected >= 75, got ${QUESTIONS.length}`);
  });

  test('every question has required fields', () => {
    for (const q of QUESTIONS) {
      assert.ok(q.id, 'has id');
      assert.ok(q.category, 'has category');
      assert.ok(q.text, 'has text');
      assert.ok(Array.isArray(q.options) && q.options.length === 4, `${q.id} has 4 options`);
      assert.ok(typeof q.answer === 'number' && q.answer >= 0 && q.answer <= 3, `${q.id} answer is 0-3`);
      assert.ok(q.fact, `${q.id} has fact`);
    }
  });

  test('all question ids are unique', () => {
    const ids = QUESTIONS.map(q => q.id);
    assert.strictEqual(ids.length, new Set(ids).size, 'duplicate question ids found');
  });

  test('all categories referenced by questions exist in CATEGORIES', () => {
    for (const q of QUESTIONS) {
      assert.ok(CATEGORIES[q.category], `${q.id} references unknown category ${q.category}`);
    }
  });

  test('all stops referenced by questions exist in WALL_STOPS', () => {
    for (const q of QUESTIONS) {
      if (q.stop) {
        assert.ok(WALL_STOPS[q.stop], `${q.id} references unknown stop ${q.stop}`);
      }
    }
  });

  test('at least 6 categories are represented', () => {
    const cats = new Set(QUESTIONS.map(q => q.category));
    assert.ok(cats.size >= 6, `only ${cats.size} categories used`);
  });

  test('at least 8 stops have location-specific questions', () => {
    const stops = new Set(QUESTIONS.filter(q => q.stop).map(q => q.stop));
    assert.ok(stops.size >= 8, `only ${stops.size} stops have questions`);
  });
});

// ── COLLECTION_SPECIES ─��───────────────��───────────────────────────

describe('COLLECTION_SPECIES — SS-175', () => {
  test('has at least 40 species', () => {
    assert.ok(COLLECTION_SPECIES.length >= 40, `expected >= 40, got ${COLLECTION_SPECIES.length}`);
  });

  test('every species has required fields', () => {
    for (const s of COLLECTION_SPECIES) {
      assert.ok(s.id, 'has id');
      assert.ok(s.name, 'has name');
      assert.ok(['bird', 'mammal', 'flower', 'tree', 'insect', 'reptile', 'amphibian'].includes(s.type), `${s.id} has valid type`);
      assert.ok(['common', 'uncommon', 'rare', 'legendary'].includes(s.rarity), `${s.id} has valid rarity`);
      assert.ok(s.fact, `${s.id} has fact`);
    }
  });

  test('all species ids are unique', () => {
    const ids = COLLECTION_SPECIES.map(s => s.id);
    assert.strictEqual(ids.length, new Set(ids).size, 'duplicate species ids');
  });

  test('has species in all four rarity tiers', () => {
    for (const r of ['common', 'uncommon', 'rare', 'legendary']) {
      assert.ok(getSpeciesByRarity(r).length > 0, `no species in ${r} tier`);
    }
  });

  test('has birds, mammals, flowers at minimum', () => {
    for (const t of ['bird', 'mammal', 'flower']) {
      assert.ok(getSpeciesByType(t).length > 0, `no species of type ${t}`);
    }
  });
});

// ── HELPER FUNCTIONS ─────────────��─────────────────────────────────

describe('getStopById', () => {
  test('returns stop for valid id', () => {
    const s = getStopById('vindolanda');
    assert.strictEqual(s.name, 'Vindolanda');
  });

  test('returns null for invalid id', () => {
    assert.strictEqual(getStopById('narnia'), null);
  });
});

describe('getAllStops', () => {
  test('returns 13 stops', () => {
    assert.strictEqual(getAllStops().length, 13);
  });
});

describe('getStopsByDay', () => {
  test('day 1 includes bowness and carlisle', () => {
    const stops = getStopsByDay(1);
    const ids = stops.map(s => s.id);
    assert.ok(ids.includes('bowness'));
    assert.ok(ids.includes('carlisle'));
  });

  test('day 7 returns empty', () => {
    assert.strictEqual(getStopsByDay(7).length, 0);
  });
});

describe('getQuestionsForStop', () => {
  test('vindolanda has multiple questions', () => {
    assert.ok(getQuestionsForStop('vindolanda').length >= 3);
  });

  test('unknown stop returns empty', () => {
    assert.strictEqual(getQuestionsForStop('atlantis').length, 0);
  });
});

describe('getGeneralQuestions', () => {
  test('returns questions with no stop', () => {
    const qs = getGeneralQuestions();
    assert.ok(qs.length > 0);
    assert.ok(qs.every(q => q.stop === null));
  });
});

describe('getQuestionsByCategory', () => {
  test('roman category has questions', () => {
    assert.ok(getQuestionsByCategory('roman').length > 0);
  });
});

describe('getQuestionById', () => {
  test('returns question for valid id', () => {
    const q = getQuestionById('v01');
    assert.ok(q.text.includes('Vindolanda'));
  });

  test('returns null for invalid id', () => {
    assert.strictEqual(getQuestionById('zzz'), null);
  });
});

describe('getSpeciesByRarity', () => {
  test('legendary has golden eagle and sea eagle', () => {
    const legendaries = getSpeciesByRarity('legendary');
    const ids = legendaries.map(s => s.id);
    assert.ok(ids.includes('golden_eagle'));
    assert.ok(ids.includes('sea_eagle'));
  });
});

describe('getSpeciesById', () => {
  test('returns species for valid id', () => {
    assert.strictEqual(getSpeciesById('adder').name, 'Adder');
  });

  test('returns null for invalid id', () => {
    assert.strictEqual(getSpeciesById('unicorn'), null);
  });
});

// ── GPS FUNCTIONS ─────────��────────────────────────────────────────

describe('distanceMetres', () => {
  test('same point returns 0', () => {
    assert.strictEqual(distanceMetres(54.99, -2.36, 54.99, -2.36), 0);
  });

  test('known distance is roughly correct (Vindolanda to Housesteads ~2-3km)', () => {
    const d = distanceMetres(54.9910, -2.3610, 55.0120, -2.3280);
    assert.ok(d > 1500 && d < 4000, `distance ${d}m not in expected range`);
  });
});

describe('getNearestStop', () => {
  test('point near Vindolanda returns Vindolanda', () => {
    const { stop } = getNearestStop(54.9915, -2.3615);
    assert.strictEqual(stop.id, 'vindolanda');
  });
});

describe('isWithinTriggerZone', () => {
  test('exact coords of stop returns true', () => {
    assert.ok(isWithinTriggerZone(54.9910, -2.3610, 'vindolanda'));
  });

  test('far away returns false', () => {
    assert.ok(!isWithinTriggerZone(51.5, -0.1, 'vindolanda'));
  });

  test('invalid stop returns false', () => {
    assert.ok(!isWithinTriggerZone(54.99, -2.36, 'mordor'));
  });
});

describe('getTriggeredStops', () => {
  test('near Vindolanda triggers at least Vindolanda', () => {
    const stops = getTriggeredStops(54.9910, -2.3610);
    assert.ok(stops.some(s => s.id === 'vindolanda'));
  });

  test('middle of nowhere triggers nothing', () => {
    assert.strictEqual(getTriggeredStops(51.0, 0.0).length, 0);
  });
});

// ── COLLECTION STATS ───────────────────────────────────────────────

describe('getCollectionStats', () => {
  test('empty collection', () => {
    const stats = getCollectionStats([]);
    assert.strictEqual(stats.found, 0);
    assert.strictEqual(stats.percentage, 0);
  });

  test('partial collection', () => {
    const stats = getCollectionStats(['robin', 'adder']);
    assert.strictEqual(stats.found, 2);
    assert.ok(stats.percentage > 0);
  });
});

// ── SCORING ────────────────────────────────────��───────────────────

describe('scoreAnswer', () => {
  test('wrong answer scores 0', () => {
    assert.strictEqual(scoreAnswer(false, 1000), 0);
  });

  test('fast correct answer scores 3', () => {
    assert.strictEqual(scoreAnswer(true, 3000), 3);
  });

  test('steady correct answer scores 2', () => {
    assert.strictEqual(scoreAnswer(true, 10000), 2);
  });

  test('slow correct answer scores 1', () => {
    assert.strictEqual(scoreAnswer(true, 20000), 1);
  });
});
