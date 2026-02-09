
const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  console.log('Starting mobile check...');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // iPhone 12 Pro
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'
  });
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Check for horizontal overflow
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const clientWidth = await page.evaluate(() => document.body.clientWidth);
    
    console.log(`Viewport width: ${clientWidth}px`);
    console.log(`Content width: ${scrollWidth}px`);
    
    if (scrollWidth > clientWidth) {
      console.error('❌ FAIL: Horizontal overflow detected!');
    } else {
      console.log('✅ PASS: No horizontal overflow.');
    }

    // Check visibility of elements
    const logoVisible = await page.isVisible('text=TRIPPER');
    console.log(`Logo visible: ${logoVisible}`);
    
    const menuButtonVisible = await page.locator('button:has(.lucide-menu)').isVisible();
    console.log(`Mobile menu button visible: ${menuButtonVisible}`);

    const desktopSearchVisible = await page.locator('input[placeholder*="Zoeken naar uitjes"]').isVisible();
    console.log(`Desktop search visible (should be false): ${desktopSearchVisible}`);

    // Take screenshot
    await page.screenshot({ path: 'mobile-screenshot.png', fullPage: true });
    console.log('📸 Screenshot saved to mobile-screenshot.png');

  } catch (error) {
    console.error('Error during check:', error);
  } finally {
    await browser.close();
  }
})();
