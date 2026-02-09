
const { chromium } = require('playwright');

async function checkCheckout() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Capture console logs
  page.on('console', msg => {
    if (msg.type() === 'error')
      console.log(`PAGE ERROR: ${msg.text()}`);
  });
  
  page.on('pageerror', err => {
    console.log(`PAGE EXCEPTION: ${err.message}`);
  });

  console.log('Navigating to localhost:3000...');
  await page.goto('http://localhost:3000');

  // Open modal
  console.log('Opening Booking Modal...');
  const dealButton = page.locator('button.bg-tripper-pink').first();
  // Ensure we are clicking the deal button
  await dealButton.click({ force: true });
  
  // Select date
  const enabledDay = page.locator('.rdp-day:not(.rdp-day_disabled)').first();
  await enabledDay.click();

  // Select time
  const firstTimeSlot = page.locator('button.border-gray-200').first();
  await firstTimeSlot.click();

  // Confirm
  const ctaButton = page.locator('.p-6.flex-1.flex.flex-col .mt-auto button');
  await ctaButton.click();

  console.log('Waiting for navigation to checkout...');
  try {
      await page.waitForURL('**/checkout**', { timeout: 5000 });
      console.log('URL changed to checkout.');
      
      // Wait for some content on checkout page
      await page.waitForSelector('h1', { timeout: 5000 });
      const title = await page.textContent('h1');
      console.log(`Checkout page title: ${title}`);
      
      await page.screenshot({ path: 'checkout-debug.png' });
      console.log('Screenshot saved: checkout-debug.png');
  } catch (e) {
      console.error('Navigation or rendering failed:', e.message);
      await page.screenshot({ path: 'checkout-error.png' });
  }

  await browser.close();
}

checkCheckout().catch(err => {
    console.error(err);
    process.exit(1);
});
