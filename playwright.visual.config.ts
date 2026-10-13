import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',
  outputDir: './test-results/visual-fidelity',
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4321',
    browserName: 'chromium',
    channel: process.env.CI ? undefined : 'chrome',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'pnpm preview --host 127.0.0.1 --port 4321',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 13'], viewport: { width: 390, height: 844 } },
    },
  ],
});
