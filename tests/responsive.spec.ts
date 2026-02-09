import { test, expect } from '@playwright/test';

test.describe('Responsive Design Check', () => {
  const urls = ['/en', '/en/login', '/en/about', '/en/jobs', '/en/contact'];
  
  for (const url of urls) {
    test(`Visual check for ${url}`, async ({ page }) => {
      const safeName = url.substring(1).replace(/\//g, '-'); // e.g. "en", "en-login"
      
      // 1. Desktop
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      const desktopPath = `tests/screenshots/desktop-${safeName}.png`;
      console.log(`Saving desktop screenshot to: ${desktopPath}`);
      await page.screenshot({ path: desktopPath, fullPage: true });

      // 2. Tablet
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.reload();
      await page.waitForLoadState('networkidle');
      const tabletPath = `tests/screenshots/tablet-${safeName}.png`;
      await page.screenshot({ path: tabletPath, fullPage: true });

      // 3. Mobile
      await page.setViewportSize({ width: 390, height: 844 });
      await page.reload();
      await page.waitForLoadState('networkidle');
      const mobilePath = `tests/screenshots/mobile-${safeName}.png`;
      await page.screenshot({ path: mobilePath, fullPage: true });
    });
  }
});
