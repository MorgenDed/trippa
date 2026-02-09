import { test, expect } from '@playwright/test';

test.describe('Responsive Design Check', () => {
  const urls = ['/en', '/en/contact'];
  
  for (const url of urls) {
    test(`Visual check for ${url}`, async ({ page }) => {
      // Listen for console errors
      page.on('console', msg => {
        if (msg.type() === 'error') {
          console.log(`[Browser Error] ${url}: ${msg.text()}`);
        }
      });
      
      page.on('pageerror', exception => {
        console.log(`[Page Error] ${url}: ${exception}`);
      });

      // 1. Desktop
      await page.setViewportSize({ width: 1440, height: 900 });
      console.log(`Navigating to ${url} (Desktop)...`);
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      await page.screenshot({ path: `tests/screenshots/desktop${url.replace(/\//g, '-')}.png`, fullPage: true });

      // 2. Tablet
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.reload();
      await page.waitForLoadState('networkidle');
      await page.screenshot({ path: `tests/screenshots/tablet${url.replace(/\//g, '-')}.png`, fullPage: true });

      // 3. Mobile
      await page.setViewportSize({ width: 390, height: 844 });
      await page.reload();
      await page.waitForLoadState('networkidle');
      await page.screenshot({ path: `tests/screenshots/mobile${url.replace(/\//g, '-')}.png`, fullPage: true });
    });
  }
});
