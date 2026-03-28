import { test } from '@playwright/test';
const BASE = 'https://cusslab-api.leanspirited.workers.dev';

test('deathmatch debug detailed', async ({ page }) => {
  const errors = [];
  page.on('console', msg => { errors.push(`[${msg.type()}] ${msg.text()}`); });
  page.on('pageerror', e => errors.push(`[pageerror] ${e.message} | stack: ${e.stack}`));
  await page.goto(`${BASE}/survival-school/deathmatch`);
  await page.waitForLoadState('networkidle');
  const chipACount = await page.locator('#chips-a .chip').count();
  console.log('chips-a count:', chipACount);
  console.log('all errors/logs:');
  errors.forEach(e => console.log(e));
});
