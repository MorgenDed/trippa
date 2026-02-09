
const { chromium, devices } = require('playwright');

async function checkIphone16() {
  // iPhone 16 approximate dimensions (similar to iPhone 15)
  const iphone16 = {
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    viewport: { width: 393, height: 852 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    defaultBrowserType: 'chromium'
  };

  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...iphone16
  });
  const page = await context.newPage();

  console.log('Navigating to localhost:3000 on iPhone 16 emulation...');
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Check for horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    
    console.log(`Viewport width: ${viewportWidth}, Scroll width: ${scrollWidth}`);
    
    if (scrollWidth > viewportWidth) {
        console.error('⚠️ Layout Issue detected: Horizontal scroll is present!');
        // Find elements causing overflow
        const overflowingElements = await page.evaluate(() => {
            const docWidth = document.documentElement.offsetWidth;
            const elements = document.querySelectorAll('*');
            const overflowers = [];
            for (const el of elements) {
                if (el.offsetWidth > docWidth) {
                    overflowers.push({
                        tag: el.tagName,
                        class: el.className,
                        width: el.offsetWidth
                    });
                }
            }
            return overflowers;
        });
        console.log('Overflowing elements:', overflowingElements);
    } else {
        console.log('✅ No horizontal scroll detected.');
    }

    await page.screenshot({ path: 'iphone16-home.png' });
    console.log('📸 Screenshot saved: iphone16-home.png');

    // Open Mobile Menu
    console.log('Opening mobile menu...');
    const menuButton = page.locator('button:has(.lucide-menu)'); // Hamburger icon
    if (await menuButton.isVisible()) {
        await menuButton.click();
        await page.waitForTimeout(500);
        await page.screenshot({ path: 'iphone16-menu.png' });
        console.log('📸 Screenshot saved: iphone16-menu.png');
    } else {
        console.log('⚠️ Mobile menu button not found!');
    }
    
    // Check Checkout Page responsiveness
    console.log('Navigating to checkout...');
    await page.goto('http://localhost:3000/checkout', { waitUntil: 'networkidle' });
    
    const checkoutScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    if (checkoutScrollWidth > viewportWidth) {
        console.error(`⚠️ Checkout Layout Issue: Scroll width ${checkoutScrollWidth} > Viewport ${viewportWidth}`);
    } else {
        console.log('✅ Checkout page: No horizontal scroll detected.');
    }

    await page.screenshot({ path: 'iphone16-checkout.png' });
    console.log('📸 Screenshot saved: iphone16-checkout.png');

  } catch (err) {
      console.error('Error during test:', err);
  }

  await browser.close();
}

checkIphone16();
