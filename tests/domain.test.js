/**
 * tests/domain.test.js
 * Unit tests for js/state.js — How Screwed Am I? state management.
 * Single responsibility: state only. No DOM. No API.
 *
 * Coverage target: 100% statement and branch (four-loops.md standard).
 * Run: node --test --experimental-test-coverage tests/domain.test.js
 */

import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// ── Import domain under test ──
// state.js uses ES module exports. Node >= 20 handles this natively.
import {
  getState, setMode, setGuidedField, setFreeText,
  setStatus, setProbability, setSituation, recordDecision,
  reset, buildSituation
} from '../js/state.js';

// ── Reset state before each test (isolation) ──
beforeEach(() => { reset(); });

// ─────────────────────────────────────────────
// getState
// ─────────────────────────────────────────────
describe('getState', () => {

  test('returns a plain object', () => {
    const s = getState();
    assert.strictEqual(typeof s, 'object');
    assert.ok(s !== null);
  });

  test('returns a copy — mutation does not affect state', () => {
    const s = getState();
    s.mode = 'mutated';
    assert.strictEqual(getState().mode, 'guided');
  });

  test('default state has expected shape', () => {
    const s = getState();
    assert.strictEqual(s.mode, 'guided');
    assert.strictEqual(s.status, 'idle');
    assert.strictEqual(s.probability, null);
    assert.strictEqual(s.situation, null);
    assert.strictEqual(s.turnCount, 0);
    assert.deepStrictEqual(s.history, []);
  });
});

// ─────────────────────────────────────────────
// setMode
// ─────────────────────────────────────────────
describe('setMode', () => {

  test('sets mode to free', () => {
    setMode('free');
    assert.strictEqual(getState().mode, 'free');
  });

  test('sets mode to guided', () => {
    setMode('free');
    setMode('guided');
    assert.strictEqual(getState().mode, 'guided');
  });
});

// ─────────────────────────────────────────────
// setGuidedField
// ─────────────────────────────────────────────
describe('setGuidedField', () => {

  test('sets loc', () => {
    setGuidedField('loc', 'Dartmoor');
    assert.strictEqual(getState().guided.loc, 'Dartmoor');
  });

  test('sets sit', () => {
    setGuidedField('sit', 'lost at dusk');
    assert.strictEqual(getState().guided.sit, 'lost at dusk');
  });

  test('sets who', () => {
    setGuidedField('who', 'alone');
    assert.strictEqual(getState().guided.who, 'alone');
  });

  test('sets wx', () => {
    setGuidedField('wx', 'heavy rain');
    assert.strictEqual(getState().guided.wx, 'heavy rain');
  });

  test('overwrites existing value', () => {
    setGuidedField('loc', 'first');
    setGuidedField('loc', 'second');
    assert.strictEqual(getState().guided.loc, 'second');
  });
});

// ─────────────────────────────────────────────
// setFreeText
// ─────────────────────────────────────────────
describe('setFreeText', () => {

  test('sets free text', () => {
    setFreeText('I am lost on Dartmoor');
    assert.strictEqual(getState().free.text, 'I am lost on Dartmoor');
  });

  test('overwrites existing free text', () => {
    setFreeText('first');
    setFreeText('second');
    assert.strictEqual(getState().free.text, 'second');
  });
});

// ─────────────────────────────────────────────
// setStatus
// ─────────────────────────────────────────────
describe('setStatus', () => {

  test('sets to loading', () => {
    setStatus('loading');
    assert.strictEqual(getState().status, 'loading');
  });

  test('sets to results', () => {
    setStatus('results');
    assert.strictEqual(getState().status, 'results');
  });

  test('sets to terminal', () => {
    setStatus('terminal');
    assert.strictEqual(getState().status, 'terminal');
  });
});

// ─────────────────────────────────────────────
// setProbability
// ─────────────────────────────────────────────
describe('setProbability', () => {

  test('stores a valid probability', () => {
    setProbability(75);
    assert.strictEqual(getState().probability, 75);
  });

  test('clamps at 100 when above', () => {
    setProbability(150);
    assert.strictEqual(getState().probability, 100);
  });

  test('clamps at 0 when below', () => {
    setProbability(-10);
    assert.strictEqual(getState().probability, 0);
  });

  test('stores 0 exactly', () => {
    setProbability(0);
    assert.strictEqual(getState().probability, 0);
  });

  test('stores 100 exactly', () => {
    setProbability(100);
    assert.strictEqual(getState().probability, 100);
  });
});

// ─────────────────────────────────────────────
// setSituation
// ─────────────────────────────────────────────
describe('setSituation', () => {

  test('stores the situation string', () => {
    setSituation('Location: Dartmoor\nSituation: lost');
    assert.strictEqual(getState().situation, 'Location: Dartmoor\nSituation: lost');
  });

  test('overwrites existing situation', () => {
    setSituation('first');
    setSituation('second');
    assert.strictEqual(getState().situation, 'second');
  });
});

// ─────────────────────────────────────────────
// recordDecision
// ─────────────────────────────────────────────
describe('recordDecision', () => {

  test('pushes to history', () => {
    recordDecision('built a shelter', 65, 'Shelter built');
    assert.strictEqual(getState().history.length, 1);
  });

  test('records decision, probability, and situationUpdate', () => {
    recordDecision('built a shelter', 65, 'Shelter built');
    const entry = getState().history[0];
    assert.strictEqual(entry.decision, 'built a shelter');
    assert.strictEqual(entry.probability, 65);
    assert.strictEqual(entry.situationUpdate, 'Shelter built');
  });

  test('increments turnCount', () => {
    recordDecision('action 1', 70, 'update 1');
    recordDecision('action 2', 60, 'update 2');
    assert.strictEqual(getState().turnCount, 2);
  });

  test('updates current probability via setProbability', () => {
    recordDecision('risky move', 20, 'things got worse');
    assert.strictEqual(getState().probability, 20);
  });

  test('clamps probability via setProbability during record', () => {
    recordDecision('catastrophic', 200, 'somehow better');
    assert.strictEqual(getState().probability, 100);
  });

  test('accumulates multiple decisions', () => {
    recordDecision('d1', 80, 'u1');
    recordDecision('d2', 60, 'u2');
    recordDecision('d3', 40, 'u3');
    assert.strictEqual(getState().history.length, 3);
    assert.strictEqual(getState().turnCount, 3);
  });
});

// ─────────────────────────────────────────────
// reset
// ─────────────────────────────────────────────
describe('reset', () => {

  test('resets to default state after mutations', () => {
    setMode('free');
    setFreeText('some text');
    setProbability(42);
    recordDecision('a decision', 30, 'update');
    setStatus('results');
    reset();
    const s = getState();
    assert.strictEqual(s.mode, 'guided');
    assert.strictEqual(s.free.text, '');
    assert.strictEqual(s.probability, null);
    assert.deepStrictEqual(s.history, []);
    assert.strictEqual(s.turnCount, 0);
    assert.strictEqual(s.status, 'idle');
  });
});

// ─────────────────────────────────────────────
// buildSituation
// ─────────────────────────────────────────────
describe('buildSituation', () => {

  test('guided mode: returns null when loc and sit both empty', () => {
    setMode('guided');
    assert.strictEqual(buildSituation(), null);
  });

  test('guided mode: builds string from loc only', () => {
    setMode('guided');
    setGuidedField('loc', 'Dartmoor');
    const s = buildSituation();
    assert.ok(s !== null);
    assert.ok(s.includes('Dartmoor'));
  });

  test('guided mode: builds string from sit only', () => {
    setMode('guided');
    setGuidedField('sit', 'lost at dusk');
    const s = buildSituation();
    assert.ok(s !== null);
    assert.ok(s.includes('lost at dusk'));
  });

  test('guided mode: builds full situation from all four fields', () => {
    setMode('guided');
    setGuidedField('loc', 'Dartmoor');
    setGuidedField('sit', 'phone at 4%');
    setGuidedField('who', 'alone');
    setGuidedField('wx', 'heavy rain');
    const s = buildSituation();
    assert.ok(s.includes('Dartmoor'));
    assert.ok(s.includes('phone at 4%'));
    assert.ok(s.includes('alone'));
    assert.ok(s.includes('heavy rain'));
  });

  test('guided mode: omits empty optional fields (who and wx)', () => {
    setMode('guided');
    setGuidedField('loc', 'Dartmoor');
    setGuidedField('sit', 'lost');
    const s = buildSituation();
    assert.ok(!s.includes('With you'));
    assert.ok(!s.includes('Conditions'));
  });

  test('free mode: returns free text', () => {
    setMode('free');
    setFreeText('I am on Dartmoor with no map');
    assert.strictEqual(buildSituation(), 'I am on Dartmoor with no map');
  });

  test('free mode: returns null for empty text', () => {
    setMode('free');
    setFreeText('   ');
    assert.strictEqual(buildSituation(), null);
  });

  test('free mode: returns null when text is empty string', () => {
    setMode('free');
    setFreeText('');
    assert.strictEqual(buildSituation(), null);
  });
});
