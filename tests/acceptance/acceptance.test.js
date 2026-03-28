/**
 * tests/acceptance/acceptance.test.js
 * Gherkin-derived acceptance tests for Survival School features.
 *
 * These test the BEHAVIOUR observable to a user — matching the Gherkin
 * scenarios in features/. No Cucumber runner needed: scenarios are
 * directly expressed as node:test cases, one describe per feature.
 *
 * Coverage: How Screwed Am I, I've Been Bit Guys, Mundane Mode,
 *           Will You Eat It?, Animal Deathmatch, Bear Fact-Checker.
 *
 * Also covers structural integrity: JS module declarations (State/UI/API),
 * iframe CSS presence for all live panels — catching WL-SS-008 / WL-SS-009
 * patterns before they reach production.
 *
 * Requires: live worker (GET routes only — no API key needed).
 * Run: node --test tests/acceptance/acceptance.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

const BASE = 'https://cusslab-api.leanspirited.workers.dev';
const TIMEOUT = 10000;

// ── Feature: Navigation ──
describe('Feature: Survival School navigation', () => {

  // Scenario: Homepage loads
  test('Given a user visits /survival-school, When the page loads, Then it returns HTML with status 200', async () => {
    const r = await fetch(`${BASE}/survival-school`, { signal: AbortSignal.timeout(TIMEOUT) });
    assert.strictEqual(r.status, 200);
    const ct = r.headers.get('content-type') || '';
    assert.ok(ct.includes('text/html'));
  });

  // Scenario: How Screwed Am I page loads
  test('Given a user navigates to How Screwed Am I, Then the app page returns 200', async () => {
    const r = await fetch(`${BASE}/survival-school/app`, { signal: AbortSignal.timeout(TIMEOUT) });
    assert.strictEqual(r.status, 200);
  });

  // Scenario: I've Been Bit, Guys page loads
  test("Given a user navigates to I've Been Bit Guys, Then the worst page returns 200", async () => {
    const r = await fetch(`${BASE}/survival-school/worst`, { signal: AbortSignal.timeout(TIMEOUT) });
    assert.strictEqual(r.status, 200);
  });

  // Scenario: Mundane Mode page loads
  test('Given a user navigates to Mundane Mode, Then the mundane page returns 200', async () => {
    const r = await fetch(`${BASE}/survival-school/mundane`, { signal: AbortSignal.timeout(TIMEOUT) });
    assert.strictEqual(r.status, 200);
  });

  // Scenario: Will You Eat It page loads
  test('Given a user navigates to Will You Eat It, Then the eat page returns 200', async () => {
    const r = await fetch(`${BASE}/survival-school/eat`, { signal: AbortSignal.timeout(TIMEOUT) });
    assert.strictEqual(r.status, 200);
  });

  // Scenario: Animal Deathmatch page loads (was SOON — now LIVE)
  test('Given a user navigates to Animal Deathmatch, Then the deathmatch page returns 200', async () => {
    const r = await fetch(`${BASE}/survival-school/deathmatch`, { signal: AbortSignal.timeout(TIMEOUT) });
    assert.strictEqual(r.status, 200);
  });

  // Scenario: Bear Fact-Checker page loads (was SOON — now LIVE)
  test('Given a user navigates to Bear Fact-Checker, Then the fact-checker page returns 200', async () => {
    const r = await fetch(`${BASE}/survival-school/fact-checker`, { signal: AbortSignal.timeout(TIMEOUT) });
    assert.strictEqual(r.status, 200);
  });

  // Scenario: The Coyote Index page loads (SS-057)
  test('Given a user navigates to The Coyote Index, Then the coyote page returns 200', async () => {
    const r = await fetch(`${BASE}/survival-school/coyote`, { signal: AbortSignal.timeout(TIMEOUT) });
    assert.strictEqual(r.status, 200);
  });
});

// ── Feature: Animal Deathmatch live (SS-011) ──
describe('Feature: Animal Deathmatch page contains expected content', () => {

  test('Given the deathmatch page loads, Then it contains the fight button and VS layout', async () => {
    const r = await fetch(`${BASE}/survival-school/deathmatch`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('ANIMAL'), 'page should contain ANIMAL heading');
    assert.ok(html.includes('DEATHMATCH'), 'page should contain DEATHMATCH heading');
    assert.ok(html.includes('btn-fight'), 'page should contain fight button');
    assert.ok(html.includes('chips-a'), 'page should contain animal A chip grid');
    assert.ok(html.includes('chips-b'), 'page should contain animal B chip grid');
  });
});

// ── Feature: Bear Fact-Checker live (SS-008) ──
describe('Feature: Bear Fact-Checker page contains expected content', () => {

  test('Given the fact-checker page loads, Then it contains the claim input and check button', async () => {
    const r = await fetch(`${BASE}/survival-school/fact-checker`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('FACT-CHECKER'), 'page should contain FACT-CHECKER heading');
    assert.ok(html.includes('claim-input'), 'page should contain claim input');
    assert.ok(html.includes('btn-check'), 'page should contain check button');
    assert.ok(html.includes('accuracy-out'), 'page should contain accuracy display element');
  });
});

// ── Feature: Homepage tile grid reflects live feature status (SS-044) ──
describe('Feature: Survival School home nav reflects feature status', () => {

  test('Given the homepage loads, Then Animal Deathmatch nav shows LIVE', async () => {
    const r = await fetch(`${BASE}/survival-school`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    // SS-044 tile grid: deathmatch tile links to /survival-school/deathmatch with badge-live
    const dmIdx = html.indexOf('href="/survival-school/deathmatch"');
    assert.ok(dmIdx !== -1, 'deathmatch tile link must exist');
    const tileSection = html.substring(dmIdx, dmIdx + 300);
    assert.ok(tileSection.includes('badge-live'), 'deathmatch tile must show badge-live');
    assert.ok(!tileSection.includes('badge-soon'), 'deathmatch tile must NOT show badge-soon');
  });

  test('Given the homepage loads, Then Bear Fact-Checker nav shows LIVE', async () => {
    const r = await fetch(`${BASE}/survival-school`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    const fcIdx = html.indexOf('href="/survival-school/fact-checker"');
    assert.ok(fcIdx !== -1, 'fact-checker tile link must exist');
    const tileSection = html.substring(fcIdx, fcIdx + 300);
    assert.ok(tileSection.includes('badge-live'), 'fact-checker tile must show badge-live');
    assert.ok(!tileSection.includes('badge-soon'), 'fact-checker tile must NOT show badge-soon');
  });

  test('Given the home page loads, Then tile-grid contains live deathmatch link not coming-soon', async () => {
    const r = await fetch(`${BASE}/survival-school`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    // SS-044: no sidebar panels, no iframes on home — just tile links
    assert.ok(html.includes('tile-grid'), 'home page must contain tile-grid');
    assert.ok(html.includes('href="/survival-school/deathmatch"'), 'deathmatch tile link must exist');
    assert.ok(!html.includes('id="panel-deathmatch"'), 'home page must NOT contain old sidebar panel div');
  });
});

// ── Feature: Panel Q&A (SS-009) ──
describe('Feature: Panel Q&A page loads', () => {

  test('Given a user navigates to Panel Q&A, Then the page returns 200', async () => {
    const r = await fetch(`${BASE}/survival-school/panel-qa`, { signal: AbortSignal.timeout(TIMEOUT) });
    assert.strictEqual(r.status, 200);
    const ct = r.headers.get('content-type') || '';
    assert.ok(ct.includes('text/html'), `expected text/html, got ${ct}`);
  });
});

describe('Feature: Panel Q&A page contains expected elements', () => {

  test('Given the panel-qa page loads, Then it contains question input, chips, and submit button', async () => {
    const r = await fetch(`${BASE}/survival-school/panel-qa`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('question-input'), 'page must contain question-input element');
    assert.ok(html.includes('btn-ask'),        'page must contain btn-ask submit button');
    assert.ok(html.includes('chip'),           'page must contain chip elements');
  });

  test('Chips cover all six environments', async () => {
    const r = await fetch(`${BASE}/survival-school/panel-qa`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    const environments = ['jungle', 'arctic', 'ocean', 'desert', 'urban', 'woodland'];
    for (const env of environments) {
      assert.ok(
        html.toLowerCase().includes(env),
        `panel-qa page must include a chip covering environment: ${env}`
      );
    }
  });

  test('Page displays David Attenborough full name, not abbreviation', async () => {
    const r = await fetch(`${BASE}/survival-school/panel-qa`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('David Attenborough'), 'page must display full name: David Attenborough');
  });

  test('Page declares State, UI, and API module objects', async () => {
    const r = await fetch(`${BASE}/survival-school/panel-qa`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('const State = {'), 'page must declare State object');
    assert.ok(html.includes('const UI = {'),    'page must declare UI object');
    assert.ok(html.includes('const API = {'),   'page must declare API object');
  });
});

// ── Feature: The Coyote Index (SS-057) ──
describe('Feature: The Coyote Index page contains expected content', () => {

  test('Given the coyote page loads, Then it contains the incident input and rate button', async () => {
    const r = await fetch(`${BASE}/survival-school/coyote`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('COYOTE'), 'page should contain COYOTE heading');
    assert.ok(html.includes('btn-rate'), 'page should contain rate button');
    assert.ok(html.includes('incident-input'), 'page should contain incident input');
    assert.ok(html.includes('rating-out'), 'page should contain rating output element');
  });
});

// ── Structural integrity: tile grid has links for all live features (SS-044) ──
// SS-044 replaced the iframe panel home with a tile grid.
// This suite verifies all live feature tiles are present with correct href links.
describe('Feature: Live feature tiles are present in home page tile grid', () => {

  let _homeHtml = null;
  async function getHomeHtml() {
    if (_homeHtml) return _homeHtml;
    const r = await fetch(`${BASE}/survival-school`, { signal: AbortSignal.timeout(TIMEOUT) });
    _homeHtml = await r.text();
    return _homeHtml;
  }

  const LIVE_TILES = [
    { name: 'How Screwed Am I', href: '/survival-school/app' },
    { name: "I've Been Bit Guys", href: '/survival-school/worst' },
    { name: 'Mundane Mode', href: '/survival-school/mundane' },
    { name: 'Animal Deathmatch', href: '/survival-school/deathmatch' },
    { name: 'Bear Fact-Checker', href: '/survival-school/fact-checker' },
    { name: 'The Coyote Index', href: '/survival-school/coyote' },
    { name: 'Will You Eat It', href: '/survival-school/eat' },
    { name: 'Panel Q&A', href: '/survival-school/panel-qa' },
  ];

  for (const tile of LIVE_TILES) {
    test(`Given the home page loads, Then ${tile.name} tile link is present`, async () => {
      const html = await getHomeHtml();
      assert.ok(
        html.includes(`href="${tile.href}"`),
        `Home page must contain tile link href="${tile.href}"`
      );
    });
  }
});

// ── Structural integrity: JS module declarations (WL-SS-009 pattern) ──
// Checks that interactive pages declare their State, UI, and API objects.
// Rationale: functions defined without wiring to objects causes silent ReferenceError on all user actions.
describe('Feature: Interactive pages declare State, UI, and API module objects', () => {

  const PAGES = [
    { name: 'How Screwed Am I', url: '/survival-school/app',   objects: ['const State = {', 'const UI = {', 'const API = {'] },
    { name: "I've Been Bit, Guys", url: '/survival-school/worst', objects: ['const State = {', 'const UI = {', 'const API = {'] },
    { name: 'The Coyote Index', url: '/survival-school/coyote', objects: ['const State = {', 'const UI = {', 'const API = {'] },
    { name: 'Panel Q&A', url: '/survival-school/panel-qa', objects: ['const State = {', 'const UI = {', 'const API = {'] },
  ];

  for (const page of PAGES) {
    for (const obj of page.objects) {
      test(`Given ${page.name} loads, Then it declares "${obj}"`, async () => {
        const r = await fetch(`${BASE}${page.url}`, { signal: AbortSignal.timeout(TIMEOUT) });
        const html = await r.text();
        assert.ok(
          html.includes(obj),
          `${page.name} must contain "${obj}" — missing declaration causes ReferenceError on all user actions`
        );
      });
    }
  }
});
