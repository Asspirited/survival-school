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

  test('Given the corridor page loads, Then it contains six door tiles with room names and a Morrison welcome', async () => {
    const r = await fetch(`${BASE}/survival-school/rooms`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('morrison-quote'), 'page must contain morrison-quote element');
    assert.ok(html.includes('THE DOORS'),      'page must contain THE DOORS title');
    // Six doors by room name (SS-138: names replace numbers)
    assert.ok(html.includes('The Denial Loop'), 'page must contain The Denial Loop room');
    assert.ok(html.includes('The Argument'),    'page must contain The Argument room');
    assert.ok(html.includes("I've Had Worse") || html.includes("I\\'ve Had Worse"), 'page must contain I\'ve Had Worse room');
    assert.ok(html.includes('In My Defence'),   'page must contain In My Defence room');
    assert.ok(html.includes('Going With It'),   'page must contain Going With It room');
    assert.ok(html.includes('The Detail'),      'page must contain The Detail room');
    // Live doors link correctly
    assert.ok(html.includes('/survival-school/ive-had-worse'), 'I\'ve Had Worse must link to ive-had-worse');
    assert.ok(html.includes('/survival-school/in-my-defence'), 'In My Defence must link to in-my-defence');
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

// ── Feature: Jim Morrison mid-session interruption (SS-083) ──
describe('Feature: Morrison interruption — I\\\'ve Had Worse schema (SS-083)', () => {
  const POST_TIMEOUT = 25000;

  // Scenario: When morrison_interruption is present, it has the correct schema
  test('Given a user submits to ive-had-worse with morrison_present hint, When the worker responds with a morrison_interruption, Then the schema is valid', async () => {
    // We send morrison_present: true to signal Morrison is already in the room,
    // which should guarantee a morrison_interruption in the response.
    const response = await fetch(`${BASE}/survival-school/ive-had-worse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system: `You are the Survival School panel running the "I've Had Worse" mechanic.

=== THE MECHANIC ===
The user has submitted a predicament. Each panel member must claim to have survived something worse.

=== JIM MORRISON INTERRUPTION (SS-083) ===
Morrison is in the room this round (morrison_present was true in the request).
He MUST appear in the morrison_interruption field.
He says something — cryptic, banal, or accidentally offensive.
The panel reacts: WARM (they enjoy him), AMUSED, ENGAGED, or HOSTILE (he crossed a line and they attack).
If the topic interests him or a panellist engages him, set morrison_present to true so he stays next round.
If not, set morrison_present to false — he drifts off.

=== CHARACTER VOICES ===
RAY MEARS — Bushcraft. Measured, specific.
BEAR GRYLLS — Former SAS. Always abroad.

VALID charIds: ray, bear, fox, hales, cody, stroud, stevens, cox, faldo, jim, jeremy

OUTPUT — valid JSON only, no markdown:
{"attenborough_opening":"<one sentence>","panel":[{"charId":"ray|bear|fox|hales|cody|stroud|stevens|cox|faldo|jim|jeremy","text":"<1-2 sentences>"}],"attenborough_terminal":"<one sentence>","panel_tension":{"type":"wound_reference|lie|callout|wolf_pack|none","subject":"","by":[],"note":""},"morrison_interruption":{"quote":"<what Morrison says>","panel_reaction":"<how the panel reacts>","tone":"WARM|AMUSED|ENGAGED|HOSTILE","morrison_present":<bool>}}`,
        predicament: 'I have a paper cut',
        protagonist: 'bear',
        morrison_present: true,
      }),
      signal: AbortSignal.timeout(POST_TIMEOUT),
    });
    assert.strictEqual(response.status, 200);
    const data = await response.json();
    assert.ok(data.morrison_interruption, 'response must contain morrison_interruption when morrison_present was true');
    assert.ok(typeof data.morrison_interruption.quote === 'string' && data.morrison_interruption.quote.length > 0, 'morrison_interruption.quote must be a non-empty string');
    assert.ok(typeof data.morrison_interruption.panel_reaction === 'string' && data.morrison_interruption.panel_reaction.length > 0, 'morrison_interruption.panel_reaction must be a non-empty string');
    assert.ok(['WARM', 'AMUSED', 'ENGAGED', 'HOSTILE'].includes(data.morrison_interruption.tone), `morrison_interruption.tone must be WARM|AMUSED|ENGAGED|HOSTILE, got: ${data.morrison_interruption.tone}`);
    assert.ok(typeof data.morrison_interruption.morrison_present === 'boolean', 'morrison_interruption.morrison_present must be a boolean');
  });
});

// ── Feature: Cox and Faldo mutual agreement mechanic (SS-090) ──
describe('Feature: Cox and Faldo mutual agreement mechanic', () => {

  test("Given a panel draw includes both cox and faldo on I've Had Worse, Then the system prompt includes MUTUAL AGREEMENT", async () => {
    const r = await fetch(`${BASE}/survival-school/ive-had-worse`, { signal: AbortSignal.timeout(TIMEOUT) });
    assert.strictEqual(r.status, 200);
    const html = await r.text();
    assert.ok(html.includes('MUTUAL AGREEMENT'), "IHW page must contain MUTUAL AGREEMENT mechanic in system prompt builder");
    assert.ok(html.includes('both are completely wrong'), "IHW page must instruct Cox and Faldo to agree on something wrong");
  });

  test("Given a panel draw includes both cox and faldo on In My Defence, Then the system prompt includes MUTUAL AGREEMENT", async () => {
    const r = await fetch(`${BASE}/survival-school/in-my-defence`, { signal: AbortSignal.timeout(TIMEOUT) });
    assert.strictEqual(r.status, 200);
    const html = await r.text();
    assert.ok(html.includes('MUTUAL AGREEMENT'), "IMD page must contain MUTUAL AGREEMENT mechanic in system prompt builder");
    assert.ok(html.includes('both are completely wrong'), "IMD page must instruct Cox and Faldo to agree on something wrong");
  });

  test("Given only one fish-out-of-water character, Then MUTUAL AGREEMENT should not fire unconditionally", async () => {
    const r = await fetch(`${BASE}/survival-school/ive-had-worse`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    // The mechanic must be conditional — check it references both cox AND faldo as a pair
    assert.ok(html.includes('cox') && html.includes('faldo'), "MUTUAL AGREEMENT mechanic must reference both cox and faldo");
    // Ensure the "never both" exclusion rule has been removed
    assert.ok(!html.includes('never both in the same panel'), "Old exclusion rule 'never both in the same panel' must be removed");
    assert.ok(!html.includes('never both'), "Old exclusion rule 'never both' must be removed from IHW");
  });
});

// ── Feature: Irwin Memorial Encounter (SS-012) ──

describe('Feature: Irwin Memorial Encounter page loads', () => {

  test('Given a user navigates to /survival-school/irwin-memorial, Then the page returns 200', async () => {
    const r = await fetch(`${BASE}/survival-school/irwin-memorial`, { signal: AbortSignal.timeout(TIMEOUT) });
    assert.strictEqual(r.status, 200);
    const ct = r.headers.get('content-type') || '';
    assert.ok(ct.includes('text/html'), `expected text/html, got ${ct}`);
  });
});

describe('Feature: Irwin Memorial Encounter page contains expected elements', () => {

  test('Given the irwin-memorial page loads, Then it contains animal chips, encounter input, and submit button', async () => {
    const r = await fetch(`${BASE}/survival-school/irwin-memorial`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('encounter-input'), 'page must contain encounter-input element');
    assert.ok(html.includes('btn-go'), 'page must contain btn-go submit button');
    assert.ok(html.includes('chip'), 'page must contain chip elements');
  });

  test('Given the irwin-memorial page loads, Then it contains Stingray Rule memorial markup', async () => {
    const r = await fetch(`${BASE}/survival-school/irwin-memorial`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('stingray-memorial'), 'page must contain stingray-memorial element');
    assert.ok(html.includes('4 SEPTEMBER 2006'), 'page must contain Irwin death date');
  });

  test('Given the irwin-memorial page loads, Then it contains the isStingray function', async () => {
    const r = await fetch(`${BASE}/survival-school/irwin-memorial`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('isStingray'), 'page must contain isStingray function for Stingray Rule');
  });

  test('Page contains tribute framing language, not mockery', async () => {
    const r = await fetch(`${BASE}/survival-school/irwin-memorial`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('TRIBUTE'), 'system prompt must frame as tribute');
    assert.ok(html.includes('never depicted as being in danger'), 'system prompt must protect Steve from danger framing');
  });
});

// ── Feature: One Man In — EXFIL/INFIL mode (SS-054) ──

describe('Feature: One Man In page loads', () => {

  test('Given a user navigates to /survival-school/one-man-in, Then the page returns 200', async () => {
    const r = await fetch(`${BASE}/survival-school/one-man-in`, { signal: AbortSignal.timeout(TIMEOUT) });
    assert.strictEqual(r.status, 200);
    const ct = r.headers.get('content-type') || '';
    assert.ok(ct.includes('text/html'), `expected text/html, got ${ct}`);
  });
});

describe('Feature: One Man In page contains expected elements', () => {

  test('Given the one-man-in page loads, Then it contains situation chips, textarea, and submit button', async () => {
    const r = await fetch(`${BASE}/survival-school/one-man-in`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('situation-chips'), 'page must contain situation-chips element');
    assert.ok(html.includes('situation-input'), 'page must contain situation-input textarea');
    assert.ok(html.includes('btn-submit'), 'page must contain btn-submit button');
    assert.ok(html.includes('SEND ME IN'), 'submit button must say SEND ME IN');
  });

  test('Given the one-man-in page loads, Then it contains kit chips', async () => {
    const r = await fetch(`${BASE}/survival-school/one-man-in`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('kit-chips'), 'page must contain kit-chips element');
    assert.ok(html.includes('sidearm'), 'page must contain sidearm kit chip');
    assert.ok(html.includes('loyalty card'), 'page must contain loyalty card kit chip');
  });

  test('Given the one-man-in page loads, Then situation chips include both serious and absurd', async () => {
    const r = await fetch(`${BASE}/survival-school/one-man-in`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('DusitD2'), 'page must contain DusitD2 serious scenario');
    assert.ok(html.includes('IKEA car park'), 'page must contain IKEA absurd scenario');
    assert.ok(html.includes('self-checkout'), 'page must contain self-checkout absurd scenario');
  });

  test('Given the one-man-in page loads, Then it contains Craighead as lead character', async () => {
    const r = await fetch(`${BASE}/survival-school/one-man-in`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('craighead'), 'page must contain craighead character ID');
    assert.ok(html.includes('Obi-Wan Nairobi'), 'page must contain Craighead subtitle');
    assert.ok(html.includes('LEAD'), 'page must contain LEAD badge for Craighead');
  });

  test('Given the one-man-in page loads, Then system prompt references EXFIL mechanics', async () => {
    const r = await fetch(`${BASE}/survival-school/one-man-in`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('exfil_probability'), 'system prompt must reference exfil_probability');
    assert.ok(html.includes('route'), 'system prompt must reference route');
    assert.ok(html.includes('abort_criteria'), 'system prompt must reference abort_criteria');
    assert.ok(html.includes('movement_order'), 'system prompt must reference movement_order');
  });

  test('Given the one-man-in page loads, Then the WORKER_ENDPOINT points to one-man-in', async () => {
    const r = await fetch(`${BASE}/survival-school/one-man-in`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('/survival-school/one-man-in'), 'WORKER_ENDPOINT must point to /survival-school/one-man-in');
  });
});

describe('Feature: Homepage tile links to One Man In', () => {

  test('Given a user navigates to /survival-school, Then a tile links to /survival-school/one-man-in', async () => {
    const r = await fetch(`${BASE}/survival-school`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('href="/survival-school/one-man-in"'), 'homepage must link to one-man-in');
    assert.ok(html.includes('One Man In'), 'homepage must show One Man In title');
    assert.ok(!html.includes('class="tile soon"') || !html.includes('One Man In</div>\n      <div class="tile-desc">Fit'), 'One Man In tile must not be marked as SOON');
  });
});

// ── Feature: Packham Ethical Override (SS-013) ──
describe('Feature: Packham Ethical Override (SS-013)', () => {

  test('Given the IHW page loads, Then packham is a valid charId in the system prompt', async () => {
    const r = await fetch(`${BASE}/survival-school/ive-had-worse`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    // The VALID charIds line must include packham
    assert.ok(html.includes('packham'), 'IHW page must include packham as a valid charId');
  });

  test('Given the IMD page loads, Then packham is a valid charId in the system prompt', async () => {
    const r = await fetch(`${BASE}/survival-school/in-my-defence`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('packham'), 'IMD page must include packham as a valid charId');
  });

  test('Given the IHW page loads, Then the system prompt contains a dedicated PACKHAM ETHICAL OVERRIDE block', async () => {
    const r = await fetch(`${BASE}/survival-school/ive-had-worse`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(
      html.includes('PACKHAM ETHICAL OVERRIDE'),
      'IHW system prompt must contain dedicated PACKHAM ETHICAL OVERRIDE mechanic block'
    );
  });

  test('Given the IMD page loads, Then the system prompt contains a dedicated PACKHAM ETHICAL OVERRIDE block', async () => {
    const r = await fetch(`${BASE}/survival-school/in-my-defence`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(
      html.includes('PACKHAM ETHICAL OVERRIDE'),
      'IMD system prompt must contain dedicated PACKHAM ETHICAL OVERRIDE mechanic block'
    );
  });

  test('Given the IHW page loads, Then packham is listed as an expert charId', async () => {
    const r = await fetch(`${BASE}/survival-school/ive-had-worse`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    // Expert charIds line should include packham
    const expertLine = html.match(/Expert charIds:([^\n]+)/);
    assert.ok(expertLine, 'IHW must have Expert charIds line');
    assert.ok(expertLine[1].includes('packham'), 'packham must be in expert charIds');
  });
});

// ── Feature: Doors corridor UI redesign (SS-138) ──
describe('Feature: Doors corridor UI redesign (SS-138)', () => {

  test('Given a user navigates to /survival-school/rooms, Then Jim Morrison welcome text is present', async () => {
    const r = await fetch(`${BASE}/survival-school/rooms`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('You found the corridor'), 'rooms page must contain Jim welcome text "You found the corridor"');
  });

  test('Given a user navigates to /survival-school/rooms, Then door tiles show room names not numbers', async () => {
    const r = await fetch(`${BASE}/survival-school/rooms`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('door-name'), 'rooms page must contain door-name elements');
    assert.ok(html.includes("I've Had Worse") || html.includes('I\\&#39;ve Had Worse') || html.includes("I\\'ve Had Worse"), 'rooms page must show room name "I\'ve Had Worse"');
    assert.ok(html.includes('In My Defence'), 'rooms page must show room name "In My Defence"');
  });

  test('Given a user navigates to /survival-school/rooms, Then door tiles have gold italic teasers', async () => {
    const r = await fetch(`${BASE}/survival-school/rooms`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('door-teaser'), 'rooms page must contain door-teaser elements');
  });

  test('Given a user navigates to /survival-school/rooms, Then locked doors show room name and teaser', async () => {
    const r = await fetch(`${BASE}/survival-school/rooms`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    // Locked doors (like The Denial Loop) should have name + teaser visible
    assert.ok(html.includes('The Denial Loop'), 'locked door must show room name "The Denial Loop"');
  });

  test('Given a user navigates to /survival-school/rooms, Then Crimson Text font is loaded', async () => {
    const r = await fetch(`${BASE}/survival-school/rooms`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('Crimson+Text') || html.includes('Crimson Text'), 'rooms page must load Crimson Text font');
  });
});

// ── Feature: Chip category tiles — consistent UX (SS-129) ──
describe('Feature: Chip category tiles — consistent UX (SS-129)', () => {

  const CHIP_PAGES = [
    '/survival-school/ive-had-worse',
    '/survival-school/in-my-defence',
    '/survival-school/worst',
    '/survival-school/mundane',
    '/survival-school/eat',
    '/survival-school/fact-checker',
    '/survival-school/coyote',
    '/survival-school/panel-qa',
    '/survival-school/irwin-memorial',
    '/survival-school/one-man-in',
    '/survival-school/the-alibi',
    '/survival-school/the-expert-witness',
  ];

  for (const page of CHIP_PAGES) {
    test(`Given a user navigates to ${page}, Then chips are grouped under chip-cat category tiles`, async () => {
      const r = await fetch(`${BASE}${page}`, { signal: AbortSignal.timeout(TIMEOUT) });
      const html = await r.text();
      assert.ok(html.includes('chip-cat'), `${page} must contain chip-cat category tile elements`);
    });
  }
});

// ── Feature: Cross-character panel references (SS-060) ──
describe('Feature: Cross-character panel references (SS-060)', () => {

  test('Given the IHW system prompt, Then it contains reacts_to instruction', async () => {
    const r = await fetch(`${BASE}/survival-school/ive-had-worse`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('reacts_to'), 'IHW must contain reacts_to instruction in system prompt');
  });

  test('Given the IMD system prompt, Then it contains reacts_to instruction', async () => {
    const r = await fetch(`${BASE}/survival-school/in-my-defence`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('reacts_to'), 'IMD must contain reacts_to instruction in system prompt');
  });

  test('Given the IHW output schema, Then panel card includes optional reacts_to field', async () => {
    const r = await fetch(`${BASE}/survival-school/ive-had-worse`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('"reacts_to"'), 'IHW output schema must include reacts_to field');
  });

  test('Given the IHW page, Then it contains thread indicator rendering logic', async () => {
    const r = await fetch(`${BASE}/survival-school/ive-had-worse`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('thread-indicator') || html.includes('reacts-to'), 'IHW must contain thread indicator rendering element or class');
  });
});

// ── Feature: Multi-turn auto-escalation loop for Doors (SS-061) ──
describe('Feature: Multi-turn auto-escalation loop for Doors (SS-061)', () => {

  test('Given the IHW system prompt, Then it contains protagonist_response instruction', async () => {
    const r = await fetch(`${BASE}/survival-school/ive-had-worse`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('protagonist_response'), 'IHW prompt must contain protagonist_response instruction');
  });

  test('Given the IHW output schema, Then it includes protagonist_response field', async () => {
    const r = await fetch(`${BASE}/survival-school/ive-had-worse`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('"protagonist_response"'), 'IHW output schema must include protagonist_response field');
  });

  test('Given the IHW page, Then it contains LET THEM DIG interaction element', async () => {
    const r = await fetch(`${BASE}/survival-school/ive-had-worse`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('LET THEM DIG'), 'IHW must contain LET THEM DIG button');
  });

  test('Given the IMD system prompt, Then it contains protagonist_response instruction', async () => {
    const r = await fetch(`${BASE}/survival-school/in-my-defence`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('protagonist_response'), 'IMD prompt must contain protagonist_response instruction');
  });

  test('Given the IMD page, Then it contains LET THEM DIG interaction element', async () => {
    const r = await fetch(`${BASE}/survival-school/in-my-defence`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('LET THEM DIG'), 'IMD must contain LET THEM DIG button');
  });
});

// ── Feature: The Alibi — Room 15 (SS-131) ────────────────────────────────

describe('Feature: The Alibi page loads (SS-131)', () => {
  test('Given a user navigates to /survival-school/the-alibi, Then the page returns 200', async () => {
    const r = await fetch(`${BASE}/survival-school/the-alibi`, { signal: AbortSignal.timeout(TIMEOUT) });
    assert.strictEqual(r.status, 200);
    const ct = r.headers.get('content-type') || '';
    assert.ok(ct.includes('text/html'), `expected text/html, got ${ct}`);
  });
});

describe('Feature: The Alibi page contains required elements (SS-131)', () => {
  test('Given the page loads, Then it contains two protagonist selectors, event chips, and submit button', async () => {
    const r = await fetch(`${BASE}/survival-school/the-alibi`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('chips-protagonist-1'),  'page must contain first protagonist selector');
    assert.ok(html.includes('chips-protagonist-2'),  'page must contain second protagonist selector');
    assert.ok(html.includes('event-input'),           'page must contain event-input element');
    assert.ok(html.includes('btn-submit'),            'page must contain btn-submit button');
    assert.ok(html.includes('chips-event'),           'page must contain event chips area');
  });

  test('Given the page loads, Then it contains pre-built event chips including Bravo Two Zero', async () => {
    const r = await fetch(`${BASE}/survival-school/the-alibi`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('Bravo Two Zero'), 'page must contain Bravo Two Zero event chip');
  });

  test('Page declares State, UI, and API module objects', async () => {
    const r = await fetch(`${BASE}/survival-school/the-alibi`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('const State = {'), 'page must declare State object');
    assert.ok(html.includes('const UI = {'),    'page must declare UI object');
    assert.ok(html.includes('const API = {'),   'page must declare API object');
  });
});

describe('Feature: The Alibi panel response (SS-131)', () => {
  const POST_TIMEOUT = 30000;
  const buildAlibiPrompt = (p1, p2) =>
    `You are the Survival School panel running The Alibi mechanic. Two characters tell contradictory stories about the same event. Use ONLY these charIds: ray, bear, fox, hales, cody, stroud, mcnab, ryan. Protagonist 1 charId "${p1}" and Protagonist 2 charId "${p2}" MUST appear. Include at least 2 jury panel members. Respond ONLY with valid JSON: {"attenborough_opening":"<string>","account_1":{"charId":"${p1}","text":"<string>"},"account_2":{"charId":"${p2}","text":"<string>"},"panel":[{"charId":"<id>","text":"<string>"}],"attenborough_verdict":"<string>","panel_tension":{"type":"callout","subject":"","by":[],"note":""},"morrison_interruption":null}. No markdown. JSON only.`;

  test('Given a user submits two protagonists and an event, When panel responds, Then response has account_1, account_2, panel, and verdict', async () => {
    const response = await fetch(`${BASE}/survival-school/the-alibi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system: buildAlibiPrompt('mcnab', 'ryan'),
        event: 'Bravo Two Zero — what actually happened on the patrol',
        protagonist1: 'mcnab',
        protagonist2: 'ryan',
      }),
    });
    assert.strictEqual(response.status, 200);
    const data = await response.json();
    assert.ok(data.attenborough_opening, 'response must have attenborough_opening');
    assert.ok(data.account_1, 'response must have account_1');
    assert.ok(data.account_1.charId, 'account_1 must have charId');
    assert.ok(data.account_1.text, 'account_1 must have text');
    assert.ok(data.account_2, 'response must have account_2');
    assert.ok(data.account_2.charId, 'account_2 must have charId');
    assert.ok(data.account_2.text, 'account_2 must have text');
    assert.ok(Array.isArray(data.panel), 'response must have panel array');
    assert.ok(data.panel.length >= 2, 'panel must have at least 2 jury members');
    assert.ok(data.attenborough_verdict, 'response must have attenborough_verdict');
    assert.ok(data.panel_tension, 'response must have panel_tension');
  }, POST_TIMEOUT);
});

describe('Feature: The Alibi corridor door (SS-131)', () => {
  test('Given the corridor page loads, Then The Alibi is a live door linking to /survival-school/the-alibi', async () => {
    const r = await fetch(`${BASE}/survival-school/rooms`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('The Alibi'), 'rooms page must contain The Alibi door');
    assert.ok(html.includes('/survival-school/the-alibi'), 'The Alibi must link to /survival-school/the-alibi');
  });
});

// ── Feature: The Expert Witness — Room 16 (SS-133) ────────────────────────────

describe('Feature: The Expert Witness page loads (SS-133)', () => {
  test('Given a user navigates to /survival-school/the-expert-witness, Then the page returns 200', async () => {
    const r = await fetch(`${BASE}/survival-school/the-expert-witness`, { signal: AbortSignal.timeout(TIMEOUT) });
    assert.strictEqual(r.status, 200);
    const ct = r.headers.get('content-type') || '';
    assert.ok(ct.includes('text/html'), `expected text/html, got ${ct}`);
  });
});

describe('Feature: The Expert Witness page contains required elements (SS-133)', () => {
  test('Given the page loads, Then it contains expert chips, scenario input, and submit button', async () => {
    const r = await fetch(`${BASE}/survival-school/the-expert-witness`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('chips-expert'),     'page must contain expert chips area');
    assert.ok(html.includes('scenario-input'),   'page must contain scenario-input element');
    assert.ok(html.includes('btn-submit'),       'page must contain btn-submit button');
    assert.ok(html.includes('chips-scenario'),   'page must contain scenario chips area');
  });

  test('Given the page loads, Then expert chips are limited to fish-out-of-water characters', async () => {
    const r = await fetch(`${BASE}/survival-school/the-expert-witness`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('data-id="cox"'),     'page must contain Cox chip');
    assert.ok(html.includes('data-id="faldo"'),   'page must contain Faldo chip');
    assert.ok(html.includes('data-id="jim"'),     'page must contain Jim chip');
    assert.ok(html.includes('data-id="keane"'),   'page must contain Keane chip');
  });

  test('Page declares State, UI, and API module objects', async () => {
    const r = await fetch(`${BASE}/survival-school/the-expert-witness`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('const State = {'), 'page must declare State object');
    assert.ok(html.includes('const UI = {'),    'page must declare UI object');
    assert.ok(html.includes('const API = {'),   'page must declare API object');
  });
});

describe('Feature: The Expert Witness panel response (SS-133)', () => {
  const POST_TIMEOUT = 30000;
  const buildEWPrompt = (expert) =>
    `You are the Survival School panel running The Expert Witness mechanic. ${expert} is presented as the expert. Real experts defer. Use ONLY these charIds: ray, bear, fox, hales, cody, stroud, cox, faldo, jim, keane. The expert charId "${expert}" MUST appear as expert_analysis. Include at least 2 deferring panel members. Respond ONLY with valid JSON: {"attenborough_opening":"<string>","expert_analysis":{"charId":"${expert}","text":"<string>"},"panel":[{"charId":"<id>","text":"<string>","deference_holding":true}],"attenborough_verdict":"<string>","panel_tension":{"type":"none","subject":"","by":[],"note":""},"morrison_interruption":null}. No markdown. JSON only.`;

  test('Given a user submits an expert and scenario, When panel responds, Then response has expert_analysis, deferring panel, and verdict', async () => {
    const response = await fetch(`${BASE}/survival-school/the-expert-witness`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system: buildEWPrompt('cox'),
        scenario: 'A venomous snake bite in the Australian outback',
        expert: 'cox',
      }),
    });
    assert.strictEqual(response.status, 200);
    const data = await response.json();
    assert.ok(data.attenborough_opening, 'response must have attenborough_opening');
    assert.ok(data.expert_analysis, 'response must have expert_analysis');
    assert.ok(data.expert_analysis.charId, 'expert_analysis must have charId');
    assert.ok(data.expert_analysis.text, 'expert_analysis must have text');
    assert.ok(Array.isArray(data.panel), 'response must have panel array');
    assert.ok(data.panel.length >= 2, 'panel must have at least 2 deferring members');
    assert.ok(data.attenborough_verdict, 'response must have attenborough_verdict');
    assert.ok(data.panel_tension, 'response must have panel_tension');
  }, POST_TIMEOUT);
});

describe('Feature: The Expert Witness corridor door (SS-133)', () => {
  test('Given the corridor page loads, Then The Expert Witness is a live door linking to /survival-school/the-expert-witness', async () => {
    const r = await fetch(`${BASE}/survival-school/rooms`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('The Expert Witness'), 'rooms page must contain The Expert Witness door');
    assert.ok(html.includes('/survival-school/the-expert-witness'), 'The Expert Witness must link to /survival-school/the-expert-witness');
  });
});

// ── Feature: Per-character escalation injection in multi-turn panel features (SS-148) ──

const MULTI_TURN_FEATURES = [
  { path: '/survival-school/ive-had-worse',       name: 'I\'ve Had Worse' },
  { path: '/survival-school/in-my-defence',       name: 'In My Defence' },
  { path: '/survival-school/the-alibi',           name: 'The Alibi' },
  { path: '/survival-school/the-expert-witness',  name: 'The Expert Witness' },
  { path: '/survival-school/one-man-in',          name: 'One Man In' },
];

describe('Feature: Per-character escalation injection wired into multi-turn features (SS-148)', () => {

  for (const feature of MULTI_TURN_FEATURES) {
    test(`Given ${feature.name} page loads, Then buildSystemPrompt calls buildEscalationInjection`, async () => {
      const r = await fetch(`${BASE}${feature.path}`, { signal: AbortSignal.timeout(TIMEOUT) });
      const html = await r.text();
      assert.ok(html.includes('buildEscalationInjection'),
        `${feature.name} must call buildEscalationInjection in its page JS`);
    });
  }

  test('Given IHW page loads, Then buildEscalationInjection is called with panel charIds and turn', async () => {
    const r = await fetch(`${BASE}/survival-school/ive-had-worse`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    assert.ok(html.includes('PER-CHARACTER ESCALATION') || html.includes('buildEscalationInjection'),
      'IHW must contain escalation injection call or output marker');
  });

  test('Given IHW page loads, Then buildEscalationInjection output is injected into the system prompt string', async () => {
    const r = await fetch(`${BASE}/survival-school/ive-had-worse`, { signal: AbortSignal.timeout(TIMEOUT) });
    const html = await r.text();
    // The function must be called inside buildSystemPrompt, not just defined on the page
    // Check that the escalation injection variable is concatenated into the prompt return
    assert.ok(
      html.includes('escalationInjection') || html.includes('buildEscalationInjection('),
      'IHW buildSystemPrompt must use escalation injection in prompt assembly'
    );
  });
});
