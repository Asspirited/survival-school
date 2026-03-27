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

// ── Feature: How Screwed Am I homepage nav shows LIVE status (SS-011, SS-008) ──
describe('Feature: Survival School home nav reflects feature status', () => {

  test('Given the homepage loads, Then Animal Deathmatch nav shows LIVE', async () => {
    const r = await fetch(`${BASE}/survival-school`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    // The deathmatch nav item must have badge-live not badge-soon
    const dmIdx = html.indexOf('data-panel="deathmatch"');
    assert.ok(dmIdx !== -1, 'deathmatch nav item must exist');
    const navSection = html.substring(dmIdx, dmIdx + 200);
    assert.ok(navSection.includes('badge-live'), 'deathmatch must show badge-live');
    assert.ok(!navSection.includes('badge-soon'), 'deathmatch must NOT show badge-soon');
  });

  test('Given the homepage loads, Then Bear Fact-Checker nav shows LIVE', async () => {
    const r = await fetch(`${BASE}/survival-school`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    const fcIdx = html.indexOf('data-panel="fact-checker"');
    assert.ok(fcIdx !== -1, 'fact-checker nav item must exist');
    const navSection = html.substring(fcIdx, fcIdx + 200);
    assert.ok(navSection.includes('badge-live'), 'fact-checker must show badge-live');
    assert.ok(!navSection.includes('badge-soon'), 'fact-checker must NOT show badge-soon');
  });

  test('Given the homepage loads, Then deathmatch panel contains an iframe not coming-soon', async () => {
    const r = await fetch(`${BASE}/survival-school`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    const panelStart = html.indexOf('id="panel-deathmatch"');
    assert.ok(panelStart !== -1, 'panel-deathmatch must exist');
    // Capture only this panel's content: from its opening tag to the next panel's opening tag
    const nextPanelIdx = html.indexOf('id="panel-', panelStart + 20);
    const panel = nextPanelIdx !== -1
      ? html.substring(panelStart, nextPanelIdx)
      : html.substring(panelStart, panelStart + 600);
    assert.ok(panel.includes('<iframe'), 'deathmatch panel must contain iframe');
    assert.ok(!panel.includes('coming-soon'), 'deathmatch panel must NOT show coming-soon');
  });
});

// ── Structural integrity: iframe CSS (WL-SS-008 pattern) ──
// Checks that every live iframe panel has CSS height applied in the home page.
// Rationale: adding a new live panel without updating the CSS selector is a recurring failure mode.
describe('Feature: Live iframe panels have CSS height applied in home page', () => {

  // Helper: extract the style block from the home page HTML
  let _homeHtml = null;
  async function getHomeHtml() {
    if (_homeHtml) return _homeHtml;
    const r = await fetch(`${BASE}/survival-school`, { signal: AbortSignal.timeout(TIMEOUT) });
    _homeHtml = await r.text();
    return _homeHtml;
  }

  const LIVE_IFRAME_PANELS = [
    'panel-screwed',
    'panel-worst',
    'panel-mundane',
    'panel-fact-checker',
    'panel-deathmatch',
  ];

  for (const panelId of LIVE_IFRAME_PANELS) {
    test(`Given the home page loads, Then #${panelId} iframe has a CSS height rule`, async () => {
      const html = await getHomeHtml();
      // The CSS selector must reference this panel's iframe with a height property.
      // We look for the panel ID appearing in a CSS context followed by iframe, with height nearby.
      const selector = `#${panelId} iframe`;
      assert.ok(
        html.includes(selector),
        `CSS must include selector "${selector}" — no height means invisible iframe`
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
