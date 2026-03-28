/**
 * playwright.config.js — Survival School L4 UI test config
 *
 * Tests run against the live worker at three viewport sizes.
 * Browsers: Chromium only (installed at ~/.cache/ms-playwright).
 * Run: npx playwright test
 * Pipeline: bash scripts/pipeline-report.sh (L4 layer)
 */

import { defineConfig, devices } from '@playwright/test';

// WSL: Chromium requires system libs not present by default.
// Extracted to ~/.local/playwright-libs via apt-get download + dpkg-deb -x (no sudo needed).
// Libs: libnspr4, libnss3, libasound2t64. See scripts/pipeline-report.sh for install note.
const PLAYWRIGHT_LIBS = '/home/rodent/.local/playwright-libs/usr/lib/x86_64-linux-gnu';
process.env.LD_LIBRARY_PATH = PLAYWRIGHT_LIBS + (process.env.LD_LIBRARY_PATH ? ':' + process.env.LD_LIBRARY_PATH : '');

export default defineConfig({
  testDir: './tests/ui',
  timeout: 30000,
  retries: 0,
  reporter: [['list']],
  fullyParallel: false,

  use: {
    baseURL: 'https://cusslab-api.leanspirited.workers.dev',
    screenshot: 'only-on-failure',
    video: 'off',
  },

  projects: [
    {
      name: 'mobile',
      use: { viewport: { width: 390, height: 844 } },
    },
    {
      name: 'tablet',
      use: { viewport: { width: 768, height: 1024 } },
    },
    {
      name: 'laptop',
      use: { viewport: { width: 1440, height: 900 } },
    },
  ],
});
