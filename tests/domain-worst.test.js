/**
 * tests/domain-worst.test.js
 * Unit tests for js/state-worst.js — How Bad Is This? state management.
 *
 * Coverage target: 100% statement and branch.
 * Run: node --test --experimental-test-coverage tests/domain-worst.test.js
 */

import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import {
  getState, setEvent, setAnimal, setCircumstances,
  setStatus, buildSituation, reset
} from '../js/state-worst.js';

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
    s.event = 'mutated';
    assert.strictEqual(getState().event, '');
  });

  test('default state has expected shape', () => {
    const s = getState();
    assert.strictEqual(s.event, '');
    assert.strictEqual(s.animal, '');
    assert.strictEqual(s.circumstances, '');
    assert.strictEqual(s.status, 'idle');
  });
});

// ─────────────────────────────────────────────
// setEvent
// ─────────────────────────────────────────────
describe('setEvent', () => {

  test('stores the event', () => {
    setEvent('king cobra bite');
    assert.strictEqual(getState().event, 'king cobra bite');
  });

  test('overwrites existing event', () => {
    setEvent('first');
    setEvent('second');
    assert.strictEqual(getState().event, 'second');
  });
});

// ─────────────────────────────────────────────
// setAnimal
// ─────────────────────────────────────────────
describe('setAnimal', () => {

  test('stores the animal', () => {
    setAnimal('king cobra');
    assert.strictEqual(getState().animal, 'king cobra');
  });

  test('overwrites existing animal', () => {
    setAnimal('first');
    setAnimal('second');
    assert.strictEqual(getState().animal, 'second');
  });
});

// ─────────────────────────────────────────────
// setCircumstances
// ─────────────────────────────────────────────
describe('setCircumstances', () => {

  test('stores the circumstances', () => {
    setCircumstances('jungle, nearest hospital 3 hours away');
    assert.strictEqual(getState().circumstances, 'jungle, nearest hospital 3 hours away');
  });

  test('overwrites existing circumstances', () => {
    setCircumstances('first');
    setCircumstances('second');
    assert.strictEqual(getState().circumstances, 'second');
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
});

// ─────────────────────────────────────────────
// buildSituation
// ─────────────────────────────────────────────
describe('buildSituation', () => {

  test('returns null when all fields empty', () => {
    assert.strictEqual(buildSituation(), null);
  });

  test('builds string from event only', () => {
    setEvent('cobra bite');
    const s = buildSituation();
    assert.ok(s !== null);
    assert.ok(s.includes('cobra bite'));
  });

  test('builds string from animal only', () => {
    setAnimal('king cobra');
    const s = buildSituation();
    assert.ok(s !== null);
    assert.ok(s.includes('king cobra'));
  });

  test('builds string from circumstances only', () => {
    setCircumstances('no antivenom available');
    const s = buildSituation();
    assert.ok(s !== null);
    assert.ok(s.includes('no antivenom available'));
  });

  test('builds full situation from all three fields', () => {
    setEvent('cobra bite to right hand');
    setAnimal('king cobra');
    setCircumstances('jungle, 3 hours from hospital');
    const s = buildSituation();
    assert.ok(s.includes('cobra bite to right hand'));
    assert.ok(s.includes('king cobra'));
    assert.ok(s.includes('jungle, 3 hours from hospital'));
  });

  test('omits empty fields from output', () => {
    setEvent('cobra bite');
    const s = buildSituation();
    assert.ok(!s.includes('ANIMAL'));
    assert.ok(!s.includes('CIRCUMSTANCES'));
  });
});

// ─────────────────────────────────────────────
// reset
// ─────────────────────────────────────────────
describe('reset', () => {

  test('resets all fields to defaults', () => {
    setEvent('cobra bite');
    setAnimal('king cobra');
    setCircumstances('jungle');
    setStatus('results');
    reset();
    const s = getState();
    assert.strictEqual(s.event, '');
    assert.strictEqual(s.animal, '');
    assert.strictEqual(s.circumstances, '');
    assert.strictEqual(s.status, 'idle');
  });
});
