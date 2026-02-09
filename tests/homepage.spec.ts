import { test, expect } from '@playwright/test';

test('Visual check for Homepage', async ({ page }) => {
  const url = '/en';
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(url);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'tests/screenshots/desktop-homepage.png', fullPage: true });

  await page.setViewportSize({ width: 768, height: 1024 });
  await page.reload();
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'tests/screenshots/tablet-homepage.png', fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'tests/screenshots/mobile-homepage.png', fullPage: true });
});
