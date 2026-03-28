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

// ── Feature: The Doors corridor (SS-067) ──

describe('Feature: The Doors corridor page loads', () => {

  test('Given a user navigates to /survival-school/rooms, Then the page returns 200', async () => {
    const r = await fetch(`${BASE}/survival-school/rooms`, { signal: AbortSignal.timeout(TIMEOUT) });
    assert.strictEqual(r.status, 200);
    const ct = r.headers.get('content-type') || '';
    assert.ok(ct.includes('text/html'), `expected text/html, got ${ct}`);
  });
});

describe('Feature: The Doors corridor page contains door elements', () => {

  test('Given the corridor page loads, Then it contains six door tiles and a Morrison quote', async () => {
    const r = await fetch(`${BASE}/survival-school/rooms`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('morrison-quote'), 'page must contain morrison-quote element');
    assert.ok(html.includes('THE DOORS'),      'page must contain THE DOORS title');
    // Six doors: 12, 12A, 13, 14, 15, 16
    assert.ok(html.includes('>12<'), 'page must contain Door 12');
    assert.ok(html.includes('>13<'), 'page must contain Door 13');
    assert.ok(html.includes('>16<'), 'page must contain Door 16');
    // Door 13 live: I've Had Worse
    assert.ok(html.includes('/survival-school/ive-had-worse'), 'Door 13 must link to ive-had-worse');
    // Door 14 live: In My Defence
    assert.ok(html.includes('/survival-school/in-my-defence'), 'Door 14 must link to in-my-defence');
  });
});

// ── Feature: I've Had Worse (SS-066) ──

describe("Feature: I've Had Worse page loads", () => {

  // Scenario: Page loads and contains setup elements
  test("Given a user navigates to /survival-school/ive-had-worse, Then the page returns 200", async () => {
    const r = await fetch(`${BASE}/survival-school/ive-had-worse`, { signal: AbortSignal.timeout(TIMEOUT) });
    assert.strictEqual(r.status, 200);
    const ct = r.headers.get('content-type') || '';
    assert.ok(ct.includes('text/html'), `expected text/html, got ${ct}`);
  });
});

describe("Feature: I've Had Worse page contains setup elements", () => {

  test("Given the page loads, Then it contains protagonist chip selector, predicament input, and submit button", async () => {
    const r = await fetch(`${BASE}/survival-school/ive-had-worse`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('protagonist'),        'page must contain protagonist selector');
    assert.ok(html.includes('predicament-input'),  'page must contain predicament-input element');
    assert.ok(html.includes('btn-submit'),         'page must contain btn-submit button');
  });

  test("Given the page loads, Then the default prompt invites the user to describe their predicament", async () => {
    const r = await fetch(`${BASE}/survival-school/ive-had-worse`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('predicament') || html.includes('ordeal'), 'page must contain predicament/ordeal prompt copy');
  });

  test("Given the page loads, Then it contains trivial predicament chips", async () => {
    const r = await fetch(`${BASE}/survival-school/ive-had-worse`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    const trivialChips = ['paper cut', 'stubbed', 'damp', 'lukewarm'];
    const found = trivialChips.filter(chip => html.toLowerCase().includes(chip));
    assert.ok(found.length >= 2, `page must contain at least 2 trivial predicament chips, found: ${found.join(', ')}`);
  });

  test('Page declares State, UI, and API module objects', async () => {
    const r = await fetch(`${BASE}/survival-school/ive-had-worse`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('const State = {'), 'page must declare State object');
    assert.ok(html.includes('const UI = {'),    'page must declare UI object');
    assert.ok(html.includes('const API = {'),   'page must declare API object');
  });
});

describe("Feature: I've Had Worse escalating panel response (SS-066)", () => {

  // Scenario Outline: Predicament with protagonist triggers escalating panel
  const SCENARIOS = [
    { predicament: 'I have a paper cut',  protagonist: 'bear', desc: 'paper cut / Bear' },
    { predicament: 'Slightly damp',       protagonist: 'ray',  desc: 'slightly damp / Ray' },
    { predicament: 'Stubbed my toe',      protagonist: 'fox',  desc: 'stubbed toe / Fox'  },
  ];

  const POST_TIMEOUT = 25000;
  // NOTE: system prompt varies per scenario — built inside the loop using protagonist
  const buildAcceptancePrompt = (protagonist) =>
    `You are the Survival School panel running the I've Had Worse mechanic. Use ONLY these charIds: ray, bear, fox, hales, cody, stroud. The protagonist charId "${protagonist}" MUST appear in the panel array. Include at least 3 panel members. Respond ONLY with valid JSON: {"attenborough_opening":"<string>","panel":[{"charId":"<one of the valid ids>","text":"<string>"}],"attenborough_terminal":"<string>"}. No markdown. No prose. JSON only.`;

  for (const { predicament, protagonist, desc } of SCENARIOS) {
    test(`Given user submits predicament "${desc}", When panel responds, Then response has panel array and attenborough_terminal`, async () => {
      const response = await fetch(`${BASE}/survival-school/ive-had-worse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system: buildAcceptancePrompt(protagonist), predicament, protagonist }),
        signal: AbortSignal.timeout(POST_TIMEOUT)
      });

      assert.strictEqual(response.status, 200, 'expected HTTP 200');
      const data = await response.json();

      assert.ok(typeof data.attenborough_opening === 'string' && data.attenborough_opening.length > 0,
        'attenborough_opening must be non-empty');
      assert.ok(Array.isArray(data.panel) && data.panel.length >= 3,
        'panel must be an array with at least 3 characters');

      for (const card of data.panel) {
        assert.ok(typeof card.charId === 'string' && card.charId.length > 0, 'charId must be non-empty');
        assert.ok(typeof card.text === 'string' && card.text.length > 0,     'text must be non-empty');
      }

      const charIds = data.panel.map(c => c.charId);
      assert.ok(charIds.includes(protagonist),
        `protagonist "${protagonist}" must be present in panel, got: ${charIds.join(', ')}`);

      assert.ok(typeof data.attenborough_terminal === 'string' && data.attenborough_terminal.length > 0,
        'attenborough_terminal must be a non-empty string');
    });
  }
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

// ── SS-092 — Jim Carrey protagonist chip ─────────────────────────────────────

describe("Feature: I've Had Worse — Jim Carrey protagonist chip (SS-092)", () => {
  test('Given the page loads, Then a Jim Carrey protagonist chip is present', async () => {
    const r = await fetch(`${BASE}/survival-school/ive-had-worse`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('data-id="jim"'),  'page must contain protagonist chip with data-id="jim"');
    assert.ok(html.includes('Jim Carrey'),      'page must contain "Jim Carrey" chip label');
  });
});

// ── Jeremy Wade protagonist chip ──────────────────────────────────────────────

describe("Feature: I've Had Worse — Jeremy Wade protagonist chip", () => {
  test('Given the page loads, Then a Jeremy Wade protagonist chip is present', async () => {
    const r = await fetch(`${BASE}/survival-school/ive-had-worse`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('data-id="jeremy"'), 'page must contain protagonist chip with data-id="jeremy"');
    assert.ok(html.includes('Jeremy Wade'),       'page must contain "Jeremy Wade" chip label');
  });
});

// ── Feature: In My Defence — Room 14 (SS-093) ────────────────────────────────

describe('Feature: In My Defence page loads (SS-093)', () => {
  test('Given a user navigates to /survival-school/in-my-defence, Then the page returns 200', async () => {
    const r = await fetch(`${BASE}/survival-school/in-my-defence`, { signal: AbortSignal.timeout(TIMEOUT) });
    assert.strictEqual(r.status, 200);
    const ct = r.headers.get('content-type') || '';
    assert.ok(ct.includes('text/html'), `expected text/html, got ${ct}`);
  });
});

describe('Feature: In My Defence page contains required elements (SS-093)', () => {
  test('Given the page loads, Then it contains protagonist chips, incident area, submit button, and general chips', async () => {
    const r = await fetch(`${BASE}/survival-school/in-my-defence`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('chip-protagonist'),  'page must contain protagonist chips');
    assert.ok(html.includes('incident-input'),    'page must contain incident-input element');
    assert.ok(html.includes('btn-submit'),        'page must contain btn-submit button');
    assert.ok(html.includes('general-chips'),     'page must contain general-chips pool');
    assert.ok(html.includes('personal-chips'),    'page must contain personal-chips container');
  });

  test('Given the page loads, Then general pool contains Irwin and O\'Shea incidents', async () => {
    const r = await fetch(`${BASE}/survival-school/in-my-defence`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('Irwin: snake wall') || html.includes('snake wall'), 'general pool must contain Irwin snake wall chip');
    assert.ok(html.includes('croc fighting ring'),                                'general pool must contain croc fighting ring chip');
  });

  test('Given the page loads, Then roast chips are NOT in I\'ve Had Worse', async () => {
    const r = await fetch(`${BASE}/survival-school/ive-had-worse`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(!html.includes('the hotel'),         'ive-had-worse must NOT contain Bear hotel chip');
    assert.ok(!html.includes('Deliveroo'),          'ive-had-worse must NOT contain Ray Deliveroo chip');
    assert.ok(!html.includes('corporate paintball'),'ive-had-worse must NOT contain Fox paintball chip');
  });

  test('Page declares State, UI, and API module objects', async () => {
    const r = await fetch(`${BASE}/survival-school/in-my-defence`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('const State = {'), 'page must declare State object');
    assert.ok(html.includes('const UI = {'),    'page must declare UI object');
    assert.ok(html.includes('const API = {'),   'page must declare API object');
  });
});

describe('Feature: In My Defence panel response includes panel_tension (SS-093)', () => {
  const POST_TIMEOUT = 25000;
  const buildIMDPrompt = (protagonist) =>
    `You are the Survival School In My Defence committee. Use ONLY these charIds: ray, bear, fox, hales, cody, stroud. The protagonist charId "${protagonist}" MUST appear in the panel array. Include at least 3 panel members. Respond ONLY with valid JSON: {"attenborough_opening":"<string>","panel":[{"charId":"<id>","text":"<string>"}],"attenborough_verdict":"<string>","panel_tension":{"type":"callout","subject":"","by":[],"note":""}}. No markdown. JSON only.`;

  test('Given a user submits an incident, When panel responds, Then response has panel, attenborough_verdict, and panel_tension', async () => {
    const response = await fetch(`${BASE}/survival-school/in-my-defence`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system: buildIMDPrompt('bear'),
        incident: 'I am Bear Grylls. I filmed in a hotel. I need the panel to help me explain this.',
        protagonist: 'bear',
      }),
      signal: AbortSignal.timeout(POST_TIMEOUT),
    });
    assert.strictEqual(response.status, 200);
    const data = await response.json();
    assert.ok(typeof data.attenborough_opening === 'string' && data.attenborough_opening.length > 0, 'attenborough_opening must be non-empty');
    assert.ok(Array.isArray(data.panel) && data.panel.length >= 3, 'panel must have at least 3 members');
    assert.ok(typeof data.attenborough_verdict === 'string' && data.attenborough_verdict.length > 0, 'attenborough_verdict must be non-empty');
    assert.ok(typeof data.panel_tension === 'object' && data.panel_tension !== null, 'panel_tension must be an object');
  });
});

// ── Feature: Composure Engine (SS-088) ──
describe('Feature: Panel composure engine — How Screwed Am I (SS-088)', () => {
  const POST_TIMEOUT = 25000;
  const HSA_SYSTEM = `You are the Survival School panel. Respond ONLY with valid JSON: {"survival_probability":<integer 0-100>,"attenborough_opening":"<string>","panel":[{"charId":"<id>","text":"<string>"}],"attenborough_verdict":"<string>","next_actions":["<string>"],"is_terminal":false,"panel_tension":{"type":"callout","subject":"ray","by":["fox"],"note":"fox calls out ray"}}. No markdown. JSON only.`;

  // Scenario: Given a first-round submission, Then the response includes an initialised composureState
  test('Given a first-round submission, When the worker responds to POST /survival-school/assess, Then the response contains a composureState object with numeric values', async () => {
    const response = await fetch(`${BASE}/survival-school/assess`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ system: HSA_SYSTEM, situation: 'Location: Dartmoor\nSituation: lost at dusk' }),
      signal: AbortSignal.timeout(POST_TIMEOUT),
    });
    assert.strictEqual(response.status, 200);
    const data = await response.json();
    assert.ok(typeof data.composureState === 'object' && data.composureState !== null, 'response must contain composureState object');
    for (const charId of ['ray', 'fox', 'bear', 'hales', 'cody', 'stroud']) {
      assert.ok(typeof data.composureState[charId] === 'number', `composureState.${charId} must be a number`);
    }
  });

  // Scenario: Given a second-round submission with composureState, Then the response includes an updated composureState
  test('Given a second-round submission with composureState, When the worker responds, Then it returns an updated composureState', async () => {
    const composureState = { ray: 8, fox: 9, bear: 7, hales: 8, cody: 6, stroud: 7, stevens: 9, cox: 5, faldo: 6, jim: 3, jeremy: 8 };
    const response = await fetch(`${BASE}/survival-school/assess`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system: HSA_SYSTEM,
        situation: 'Location: Dartmoor\nSituation: still lost',
        composureState,
        panelCharIds: ['ray', 'fox', 'bear', 'hales', 'cody', 'stroud'],
      }),
      signal: AbortSignal.timeout(POST_TIMEOUT),
    });
    assert.strictEqual(response.status, 200);
    const data = await response.json();
    assert.ok(typeof data.composureState === 'object' && data.composureState !== null, 'response must contain updated composureState');
  });
});
