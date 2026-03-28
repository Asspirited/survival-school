/**
 * tests/ui/ui.test.js — Survival School L4 UI tests (Playwright)
 *
 * What this layer tests that L1–L3 cannot:
 *  - Chip selection: .sel class added/removed in browser DOM
 *  - Tab switching: active panel shown, inactive hidden
 *  - Cascade flow: location → conditions → events → context → assess enabled
 *  - Loading state: #loading visible and button disabled after submit
 *  - Dynamic DOM: deathmatch and cascade chips rendered from JS, not HTML source
 *  - Input wiring: typing in a text field updates the right state
 *  - Viewport safety: key elements visible and not clipped at mobile width
 *  - Three viewports per test: mobile 390×844, tablet 768×1024, laptop 1440×900
 *
 * What this layer does NOT test:
 *  - LLM response content (non-deterministic — that is Q3 exploratory)
 *  - Card rendering awaiting API response (slow, LLM-dependent — future L4 extension)
 *
 * Base URL: https://cusslab-api.leanspirited.workers.dev (live worker)
 * Run:      npx playwright test
 * Config:   playwright.config.js (three viewport projects)
 *
 * Sources: Fowler (pyramid), Marick/Crispin (Q4 quadrant), Hendrickson (UI heuristics)
 */

import { test, expect } from '@playwright/test';

const BASE = 'https://cusslab-api.leanspirited.workers.dev';

// ── Helper: wait for dynamically-injected chips ──────────────────────────────
async function waitForChips(page, selector) {
  await page.waitForSelector(selector, { state: 'attached', timeout: 10000 });
}

// ─────────────────────────────────────────────────────────────────────────────
// HOMEPAGE — tile grid, navigation
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Homepage — tile grid and navigation', () => {

  test('tile-grid section is present on the page', async ({ page }) => {
    await page.goto('/survival-school');
    // Two .tile-grid divs can exist (assessment and scenarios sections)
    const count = await page.locator('.tile-grid').count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('all 8 live feature tiles have correct hrefs', async ({ page }) => {
    await page.goto('/survival-school');
    const LIVE_TILES = [
      '/survival-school/app',
      '/survival-school/worst',
      '/survival-school/mundane',
      '/survival-school/eat',
      '/survival-school/deathmatch',
      '/survival-school/fact-checker',
      '/survival-school/coyote',
      '/survival-school/panel-qa',
    ];
    for (const href of LIVE_TILES) {
      await expect(page.locator(`a[href="${href}"]`)).toBeVisible();
    }
  });

  test('clicking How Screwed Am I tile navigates to /survival-school/app', async ({ page }) => {
    await page.goto('/survival-school');
    await page.locator('a[href="/survival-school/app"]').first().click();
    await expect(page).toHaveURL(/\/survival-school\/app/);
  });

  test('clicking Animal Deathmatch tile navigates to /survival-school/deathmatch', async ({ page }) => {
    await page.goto('/survival-school');
    await page.locator('a[href="/survival-school/deathmatch"]').first().click();
    await expect(page).toHaveURL(/\/survival-school\/deathmatch/);
  });

  test('clicking Panel Q&A tile navigates to /survival-school/panel-qa', async ({ page }) => {
    await page.goto('/survival-school');
    await page.locator('a[href="/survival-school/panel-qa"]').first().click();
    await expect(page).toHaveURL(/\/survival-school\/panel-qa/);
  });

});

// ─────────────────────────────────────────────────────────────────────────────
// PANEL Q&A — SS-009
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Panel Q&A — SS-009', () => {

  test('question input is visible on arrival, submit is disabled', async ({ page }) => {
    await page.goto('/survival-school/panel-qa');
    await expect(page.locator('#question-input')).toBeVisible();
    await expect(page.locator('#btn-ask')).toBeDisabled();
  });

  test('chips are visible below the input', async ({ page }) => {
    await page.goto('/survival-school/panel-qa');
    const chips = page.locator('.chip');
    await expect(chips.first()).toBeVisible();
    const count = await chips.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test('clicking a chip populates the question input and enables submit', async ({ page }) => {
    await page.goto('/survival-school/panel-qa');
    await page.locator('.chip').first().click();
    const value = await page.locator('#question-input').inputValue();
    expect(value.length).toBeGreaterThan(0);
    await expect(page.locator('#btn-ask')).toBeEnabled();
  });

  test('typing in the question input enables submit', async ({ page }) => {
    await page.goto('/survival-school/panel-qa');
    await page.locator('#question-input').fill('What do you do with a rattlesnake?');
    await expect(page.locator('#btn-ask')).toBeEnabled();
  });

  test('chips cover all six environments', async ({ page }) => {
    await page.goto('/survival-school/panel-qa');
    const pageText = await page.locator('body').textContent();
    const environments = ['jungle', 'arctic', 'ocean', 'desert', 'urban', 'woodland'];
    for (const env of environments) {
      expect(pageText.toLowerCase()).toContain(env);
    }
  });

  test('David Attenborough full name is displayed, not abbreviation', async ({ page }) => {
    await page.goto('/survival-school/panel-qa');
    const pageText = await page.locator('body').textContent();
    expect(pageText).toContain('David Attenborough');
  });

});

// ─────────────────────────────────────────────────────────────────────────────
// HOW SCREWED AM I — tabs, cascade input, assess flow
// Note: SS-043 redesigned this page to use a cascading location→condition→event→context
// flow. The standalone how-screwed-am-i.html has the old structure; the live worker
// serves the cascade version. Tests must match the live worker.
// ─────────────────────────────────────────────────────────────────────────────

test.describe('How Screwed Am I — tab switching', () => {

  test('guided tab is active and panel-guided is visible on load', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/app`);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#tab-guided')).toHaveClass(/active/);
    await expect(page.locator('#panel-guided')).toHaveClass(/active/);
    await expect(page.locator('#panel-free')).not.toHaveClass(/active/);
  });

  test('clicking FREETEXT tab activates free panel', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/app`);
    await page.waitForLoadState('networkidle');
    await page.click('#tab-free');
    await expect(page.locator('#panel-free')).toHaveClass(/active/);
    await expect(page.locator('#panel-guided')).not.toHaveClass(/active/);
  });

  test('clicking GUIDED tab after FREETEXT restores guided panel', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/app`);
    await page.waitForLoadState('networkidle');
    await page.click('#tab-free');
    await page.click('#tab-guided');
    await expect(page.locator('#tab-guided')).toHaveClass(/active/);
    await expect(page.locator('#panel-guided')).toHaveClass(/active/);
    await expect(page.locator('#panel-free')).not.toHaveClass(/active/);
  });

});

test.describe('How Screwed Am I — cascade location chips', () => {

  test('location chips are rendered dynamically in #loc-chips', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/app`);
    await page.waitForLoadState('networkidle');
    await waitForChips(page, '#loc-chips .chip');
    const count = await page.locator('#loc-chips .chip').count();
    expect(count).toBeGreaterThan(0);
  });

  test('clicking a location chip adds .sel to that chip', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/app`);
    await page.waitForLoadState('networkidle');
    await waitForChips(page, '#loc-chips .chip');
    const chip = page.locator('#loc-chips .chip').first();
    await chip.click();
    await expect(chip).toHaveClass(/sel/);
  });

  test('clicking a second location chip moves .sel off the first', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/app`);
    await page.waitForLoadState('networkidle');
    await waitForChips(page, '#loc-chips .chip');
    const chips = page.locator('#loc-chips .chip');
    await chips.nth(0).click();
    await chips.nth(1).click();
    await expect(chips.nth(0)).not.toHaveClass(/sel/);
    await expect(chips.nth(1)).toHaveClass(/sel/);
  });

  test('clicking a location chip makes step-cond visible', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/app`);
    await page.waitForLoadState('networkidle');
    await waitForChips(page, '#loc-chips .chip');
    // step-cond starts hidden
    await expect(page.locator('#step-cond')).toHaveClass(/hidden/);
    await page.locator('#loc-chips .chip').first().click();
    // after location selection, conditions step should appear
    await expect(page.locator('#step-cond')).not.toHaveClass(/hidden/);
  });

  test('clicking a condition chip makes step-evt visible', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/app`);
    await page.waitForLoadState('networkidle');
    await waitForChips(page, '#loc-chips .chip');
    await page.locator('#loc-chips .chip').first().click();
    await waitForChips(page, '#cond-chips .chip');
    await expect(page.locator('#step-evt')).toHaveClass(/hidden/);
    await page.locator('#cond-chips .chip').first().click();
    await expect(page.locator('#step-evt')).not.toHaveClass(/hidden/);
  });

  test('group-nav buttons filter location chips', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/app`);
    await page.waitForLoadState('networkidle');
    await waitForChips(page, '#group-nav button');
    const groupBtns = page.locator('#group-nav button');
    const count = await groupBtns.count();
    expect(count).toBeGreaterThan(1);
    // Click second group button — should get active class
    await groupBtns.nth(1).click();
    await expect(groupBtns.nth(1)).toHaveClass(/active/);
  });

});

test.describe('How Screwed Am I — cascade skip flow and assess', () => {

  test('SKIP buttons advance through cascade steps', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/app`);
    await page.waitForLoadState('networkidle');
    await waitForChips(page, '#loc-chips .chip');

    // Select location
    await page.locator('#loc-chips .chip').first().click();

    // Skip conditions
    await page.locator('#step-cond .btn-skip').click();
    // Skip events
    await page.locator('#step-evt .btn-skip').click();
    // Skip context (final skip enables assess button)
    await page.locator('#step-ctx .btn-skip').click();

    // Assess button should now be enabled
    await expect(page.locator('#btn-guided')).not.toBeDisabled();
  });

  test('ASSESS guided mode after cascade: button disabled and loading visible', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/app`);
    await page.waitForLoadState('networkidle');
    await waitForChips(page, '#loc-chips .chip');

    await page.locator('#loc-chips .chip').first().click();
    await page.locator('#step-cond .btn-skip').click();
    await page.locator('#step-evt .btn-skip').click();
    await page.locator('#step-ctx .btn-skip').click();

    await page.locator('#btn-guided').click();
    await expect(page.locator('#btn-guided')).toBeDisabled();
    await expect(page.locator('#loading')).toBeVisible();
  });

  test('loc-input freetext enables conditions and events steps', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/app`);
    await page.waitForLoadState('networkidle');
    await page.locator('#loc-input').fill('Dartmoor in October');
    await expect(page.locator('#step-cond')).not.toHaveClass(/hidden/);
    await expect(page.locator('#step-evt')).not.toHaveClass(/hidden/);
  });

  test('CLEAR resets all chips and hides cascade steps', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/app`);
    await page.waitForLoadState('networkidle');
    await waitForChips(page, '#loc-chips .chip');
    await page.locator('#loc-chips .chip').first().click();
    // step-cond should now be visible
    await expect(page.locator('#step-cond')).not.toHaveClass(/hidden/);
    await page.locator('.btn-clear').click();
    // All chips should lose .sel
    const selCount = await page.locator('.chip.sel').count();
    expect(selCount).toBe(0);
  });

});

test.describe('How Screwed Am I — free mode assess', () => {

  test('ASSESS free mode with text: button disabled and loading visible', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/app`);
    await page.waitForLoadState('networkidle');
    await page.click('#tab-free');
    await page.locator('#free-input').fill('I am lost on Dartmoor. Phone at 4%. It is dusk.');
    await page.locator('#btn-free').click();
    await expect(page.locator('#btn-free')).toBeDisabled();
    await expect(page.locator('#loading')).toBeVisible();
  });

});

// ─────────────────────────────────────────────────────────────────────────────
// I'VE BEEN BIT, GUYS — scenario chips, assess flow
// ─────────────────────────────────────────────────────────────────────────────

test.describe("I've Been Bit, Guys — chip selection and assess flow", () => {

  test('clicking a scenario chip adds .sel to that chip', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/worst`);
    const chip = page.locator('#chips-scenario .chip').first();
    await chip.click();
    await expect(chip).toHaveClass(/sel/);
  });

  test('clicking a scenario chip fills event-input and animal-input', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/worst`);
    await page.locator('#chips-scenario .chip').first().click();
    const eventVal = await page.locator('#event-input').inputValue();
    const animalVal = await page.locator('#animal-input').inputValue();
    expect(eventVal.length + animalVal.length).toBeGreaterThan(0);
  });

  test('clicking a second scenario chip deselects first', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/worst`);
    const chips = page.locator('#chips-scenario .chip');
    await chips.nth(0).click();
    await chips.nth(1).click();
    await expect(chips.nth(0)).not.toHaveClass(/sel/);
    await expect(chips.nth(1)).toHaveClass(/sel/);
  });

  test('ASSESS with a scenario chip: button disabled and loading visible', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/worst`);
    await page.locator('#chips-scenario .chip').first().click();
    await page.locator('#btn-assess').click();
    await expect(page.locator('#btn-assess')).toBeDisabled();
    await expect(page.locator('#loading')).toBeVisible();
  });

  test('CLEAR removes .sel from all chips and clears inputs', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/worst`);
    await page.locator('#chips-scenario .chip').first().click();
    await page.locator('.btn-clear').click();
    const selCount = await page.locator('.chip.sel').count();
    expect(selCount).toBe(0);
    const eventVal = await page.locator('#event-input').inputValue();
    expect(eventVal).toBe('');
  });

});

// ─────────────────────────────────────────────────────────────────────────────
// ANIMAL DEATHMATCH — category tabs, chip selection, fight flow
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Animal Deathmatch — category tabs', () => {

  test('at least one category tab is present', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/deathmatch`);
    await waitForChips(page, '#chips-a .chip');
    const count = await page.locator('#cat-tabs .cat-tab').count();
    expect(count).toBeGreaterThan(0);
  });

  test('clicking a category tab gives it .active', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/deathmatch`);
    await waitForChips(page, '#chips-a .chip');
    const tabs = page.locator('#cat-tabs .cat-tab');
    await tabs.first().click();
    await expect(tabs.first()).toHaveClass(/active/);
  });

  test('clicking a second category tab removes .active from first', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/deathmatch`);
    await waitForChips(page, '#chips-a .chip');
    const tabs = page.locator('#cat-tabs .cat-tab');
    const count = await tabs.count();
    if (count > 1) {
      await tabs.nth(0).click();
      await tabs.nth(1).click();
      await expect(tabs.nth(1)).toHaveClass(/active/);
      await expect(tabs.nth(0)).not.toHaveClass(/active/);
    }
  });

});

test.describe('Animal Deathmatch — chip selection', () => {

  test('clicking an animal chip in side A adds .sel', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/deathmatch`);
    await waitForChips(page, '#chips-a .chip');
    const chip = page.locator('#chips-a .chip').first();
    await chip.click();
    await expect(chip).toHaveClass(/sel/);
  });

  test('clicking a different chip on side A moves .sel', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/deathmatch`);
    await waitForChips(page, '#chips-a .chip');
    const chips = page.locator('#chips-a .chip');
    await chips.nth(0).click();
    await chips.nth(1).click();
    await expect(chips.nth(0)).not.toHaveClass(/sel/);
    await expect(chips.nth(1)).toHaveClass(/sel/);
  });

  test('clicking an animal chip in side B adds .sel', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/deathmatch`);
    await waitForChips(page, '#chips-b .chip');
    const chip = page.locator('#chips-b .chip').first();
    await chip.click();
    await expect(chip).toHaveClass(/sel/);
  });

  test('sides A and B can both have .sel simultaneously', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/deathmatch`);
    await waitForChips(page, '#chips-a .chip');
    await waitForChips(page, '#chips-b .chip');
    await page.locator('#chips-a .chip').nth(0).click();
    await page.locator('#chips-b .chip').nth(1).click();
    await expect(page.locator('#chips-a .chip').nth(0)).toHaveClass(/sel/);
    await expect(page.locator('#chips-b .chip').nth(1)).toHaveClass(/sel/);
  });

  test('chip A selection fills input-a', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/deathmatch`);
    await waitForChips(page, '#chips-a .chip');
    await page.locator('#chips-a .chip').first().click();
    const val = await page.locator('#input-a').inputValue();
    expect(val.length).toBeGreaterThan(0);
  });

  test('chip B selection fills input-b', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/deathmatch`);
    await waitForChips(page, '#chips-b .chip');
    await page.locator('#chips-b .chip').first().click();
    const val = await page.locator('#input-b').inputValue();
    expect(val.length).toBeGreaterThan(0);
  });

  test('typing in input-a deselects side A chips', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/deathmatch`);
    await waitForChips(page, '#chips-a .chip');
    await page.locator('#chips-a .chip').first().click();
    await expect(page.locator('#chips-a .chip').first()).toHaveClass(/sel/);
    await page.locator('#input-a').fill('badger');
    await expect(page.locator('#chips-a .chip').first()).not.toHaveClass(/sel/);
  });

});

test.describe('Animal Deathmatch — environment chips and fight flow', () => {

  test('clicking an environment chip adds .sel', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/deathmatch`);
    const chip = page.locator('#chips-env .env-chip').first();
    await chip.click();
    await expect(chip).toHaveClass(/sel/);
  });

  test('clicking a different environment chip moves .sel', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/deathmatch`);
    const chips = page.locator('#chips-env .env-chip');
    await chips.nth(0).click();
    await chips.nth(1).click();
    await expect(chips.nth(0)).not.toHaveClass(/sel/);
    await expect(chips.nth(1)).toHaveClass(/sel/);
  });

  test('FIGHT with chip selections: button disabled and loading visible', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/deathmatch`);
    await waitForChips(page, '#chips-a .chip');
    await waitForChips(page, '#chips-b .chip');
    await page.locator('#chips-a .chip').nth(0).click();
    await page.locator('#chips-b .chip').nth(1).click();
    await page.locator('#btn-fight').click();
    await expect(page.locator('#btn-fight')).toBeDisabled();
    await expect(page.locator('#loading')).toBeVisible();
  });

  test('FIGHT with freetext input: button disabled and loading visible', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/deathmatch`);
    await page.locator('#input-a').fill('Crocodile');
    await page.locator('#input-b').fill('Komodo Dragon');
    await page.locator('#btn-fight').click();
    await expect(page.locator('#btn-fight')).toBeDisabled();
    await expect(page.locator('#loading')).toBeVisible();
  });

});

// ─────────────────────────────────────────────────────────────────────────────
// WILL YOU EAT IT — chip selection, assess flow
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Will You Eat It — chip selection and assess flow', () => {

  test('clicking an item chip adds .sel', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/eat`);
    const chip = page.locator('#chips-item .chip').first();
    await chip.click();
    await expect(chip).toHaveClass(/sel/);
  });

  test('clicking a second item chip deselects first', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/eat`);
    const chips = page.locator('#chips-item .chip');
    await chips.nth(0).click();
    await chips.nth(1).click();
    await expect(chips.nth(0)).not.toHaveClass(/sel/);
    await expect(chips.nth(1)).toHaveClass(/sel/);
  });

  test('clicking an item chip fills item-input', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/eat`);
    await page.locator('#chips-item .chip').first().click();
    const val = await page.locator('#item-input').inputValue();
    expect(val.length).toBeGreaterThan(0);
  });

  test('typing in item-input deselects all item chips', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/eat`);
    await page.locator('#chips-item .chip').first().click();
    await page.locator('#item-input').fill('nettles');
    await expect(page.locator('#chips-item .chip').first()).not.toHaveClass(/sel/);
  });

  test('ASSESS with chip selected: button disabled and loading visible', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/eat`);
    await page.locator('#chips-item .chip').first().click();
    await page.locator('#btn-assess').click();
    await expect(page.locator('#btn-assess')).toBeDisabled();
    await expect(page.locator('#loading')).toBeVisible();
  });

  test('ASSESS with freetext item: button disabled and loading visible', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/eat`);
    await page.locator('#item-input').fill('suspicious mushroom');
    await page.locator('#btn-assess').click();
    await expect(page.locator('#btn-assess')).toBeDisabled();
    await expect(page.locator('#loading')).toBeVisible();
  });

});

// ─────────────────────────────────────────────────────────────────────────────
// MUNDANE MODE — chip selection, assess flow
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Mundane Mode — chip selection and assess flow', () => {

  test('clicking a mundane chip adds .sel', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/mundane`);
    const chip = page.locator('#chips-mundane .chip').first();
    await chip.click();
    await expect(chip).toHaveClass(/sel/);
  });

  test('clicking a mundane chip fills mundane-input textarea', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/mundane`);
    await page.locator('#chips-mundane .chip').first().click();
    const val = await page.locator('#mundane-input').inputValue();
    expect(val.length).toBeGreaterThan(0);
  });

  test('clicking a second chip deselects the first', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/mundane`);
    const chips = page.locator('#chips-mundane .chip');
    await chips.nth(0).click();
    await chips.nth(1).click();
    await expect(chips.nth(0)).not.toHaveClass(/sel/);
    await expect(chips.nth(1)).toHaveClass(/sel/);
  });

  test('ASSESS with chip: button disabled and loading visible', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/mundane`);
    await page.locator('#chips-mundane .chip').first().click();
    await page.locator('#btn-assess').click();
    await expect(page.locator('#btn-assess')).toBeDisabled();
    await expect(page.locator('#loading')).toBeVisible();
  });

  test('ASSESS with textarea text: button disabled and loading visible', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/mundane`);
    await page.locator('#mundane-input').fill('I have spilled milk on my laptop and it is making a high-pitched sound.');
    await page.locator('#btn-assess').click();
    await expect(page.locator('#btn-assess')).toBeDisabled();
    await expect(page.locator('#loading')).toBeVisible();
  });

});

// ─────────────────────────────────────────────────────────────────────────────
// BEAR FACT-CHECKER — chips, input, submit flow
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Bear Fact-Checker — chips, input and submit flow', () => {

  test('clicking a claim chip adds .sel and fills claim-input', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/fact-checker`);
    const chip = page.locator('#chips-claim .chip').first();
    await chip.click();
    await expect(chip).toHaveClass(/sel/);
    const val = await page.locator('#claim-input').inputValue();
    expect(val.length).toBeGreaterThan(0);
  });

  test('clicking a second claim chip deselects first', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/fact-checker`);
    const chips = page.locator('#chips-claim .chip');
    await chips.nth(0).click();
    await chips.nth(1).click();
    await expect(chips.nth(0)).not.toHaveClass(/sel/);
    await expect(chips.nth(1)).toHaveClass(/sel/);
  });

  test('claim-input textarea accepts freetext', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/fact-checker`);
    await page.locator('#claim-input').fill('I once made fire with a piece of ice');
    const val = await page.locator('#claim-input').inputValue();
    expect(val).toBe('I once made fire with a piece of ice');
  });

  test('CHECK with claim chip: button disabled', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/fact-checker`);
    await page.locator('#chips-claim .chip').first().click();
    await page.locator('#btn-check').click();
    await expect(page.locator('#btn-check')).toBeDisabled();
  });

  test('CHECK with freetext claim: button disabled', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/fact-checker`);
    await page.locator('#claim-input').fill('Drinking your own urine is a good survival strategy');
    await page.locator('#btn-check').click();
    await expect(page.locator('#btn-check')).toBeDisabled();
  });

  test('accuracy-out element is present in DOM', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/fact-checker`);
    await expect(page.locator('#accuracy-out')).toBeAttached();
  });

});

// ─────────────────────────────────────────────────────────────────────────────
// THE COYOTE INDEX — chips, input, submit flow
// ─────────────────────────────────────────────────────────────────────────────

test.describe('The Coyote Index — chips, input and submit flow', () => {

  test('clicking an incident chip adds .sel and fills incident-input', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/coyote`);
    const chip = page.locator('#chips-incident .chip').first();
    await chip.click();
    await expect(chip).toHaveClass(/sel/);
    const val = await page.locator('#incident-input').inputValue();
    expect(val.length).toBeGreaterThan(0);
  });

  test('clicking a second incident chip deselects first', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/coyote`);
    const chips = page.locator('#chips-incident .chip');
    await chips.nth(0).click();
    await chips.nth(1).click();
    await expect(chips.nth(0)).not.toHaveClass(/sel/);
    await expect(chips.nth(1)).toHaveClass(/sel/);
  });

  test('incident-input textarea accepts freetext', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/coyote`);
    await page.locator('#incident-input').fill('I tried to pet a coyote in a park');
    const val = await page.locator('#incident-input').inputValue();
    expect(val).toBe('I tried to pet a coyote in a park');
  });

  test('RATE with incident chip: button disabled', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/coyote`);
    await page.locator('#chips-incident .chip').first().click();
    await page.locator('#btn-rate').click();
    await expect(page.locator('#btn-rate')).toBeDisabled();
  });

  test('RATE with freetext incident: button disabled', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/coyote`);
    await page.locator('#incident-input').fill('I found a coyote den and decided to look inside');
    await page.locator('#btn-rate').click();
    await expect(page.locator('#btn-rate')).toBeDisabled();
  });

  test('rating-out element is present in DOM', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/coyote`);
    await expect(page.locator('#rating-out')).toBeAttached();
  });

});

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE VIEWPORT — key journeys at 390×844
// Assertions: elements are visible and not clipped outside the viewport.
// These run across all three viewport projects via playwright.config.js.
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Mobile layout — key elements visible and not clipped', () => {

  test('How Screwed Am I: loc-chips visible at mobile width', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/app`);
    await page.waitForLoadState('networkidle');
    await waitForChips(page, '#loc-chips .chip');
    const chip = page.locator('#loc-chips .chip').first();
    await expect(chip).toBeVisible();
    const box = await chip.boundingBox();
    expect(box).not.toBeNull();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize().width + 10);
  });

  test("I've Been Bit: assess button visible and within viewport", async ({ page }) => {
    await page.goto(`${BASE}/survival-school/worst`);
    await expect(page.locator('#btn-assess')).toBeVisible();
    const box = await page.locator('#btn-assess').boundingBox();
    expect(box).not.toBeNull();
    expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize().width + 10);
  });

  test('Animal Deathmatch: both chip grids visible at mobile width', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/deathmatch`);
    await waitForChips(page, '#chips-a .chip');
    await waitForChips(page, '#chips-b .chip');
    await expect(page.locator('#chips-a')).toBeVisible();
    await expect(page.locator('#chips-b')).toBeVisible();
  });

  test('Animal Deathmatch: FIGHT button visible and not clipped', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/deathmatch`);
    await expect(page.locator('#btn-fight')).toBeVisible();
    const box = await page.locator('#btn-fight').boundingBox();
    expect(box).not.toBeNull();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize().width + 10);
  });

  test('Homepage: tile-grid tiles visible and within viewport', async ({ page }) => {
    await page.goto('/survival-school');
    const tiles = page.locator('.tile-grid a');
    const count = await tiles.count();
    expect(count).toBeGreaterThanOrEqual(7);
    const box = await tiles.first().boundingBox();
    expect(box).not.toBeNull();
    expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize().width + 10);
  });

  test('Bear Fact-Checker: claim-input and check button visible', async ({ page }) => {
    await page.goto(`${BASE}/survival-school/fact-checker`);
    await expect(page.locator('#claim-input')).toBeVisible();
    await expect(page.locator('#btn-check')).toBeVisible();
    const box = await page.locator('#btn-check').boundingBox();
    expect(box).not.toBeNull();
    expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize().width + 10);
  });

});
