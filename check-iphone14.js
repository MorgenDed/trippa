
const { chromium, devices } = require('playwright');
const fs = require('fs');

async function checkMobile() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...devices['iPhone 14'],
  });
  const page = await context.newPage();

  console.log('Navigating to localhost:3001...');
  try {
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  } catch (e) {
    console.log('Error connecting to localhost:3001, trying 3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  }

  // 1. Check Homepage Layout
  console.log('Checking Homepage layout...');
  const dimensions = await page.evaluate(() => {
    return {
      docWidth: document.documentElement.scrollWidth,
      winWidth: window.innerWidth,
      hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth
    };
  });

  console.log(`Dimensions: Doc=${dimensions.docWidth}, Win=${dimensions.winWidth}`);
  if (dimensions.hasHorizontalScroll) {
    console.error('❌ Horizontal scroll detected on Homepage!');
  } else {
    console.log('✅ No horizontal scroll on Homepage.');
  }

  await page.screenshot({ path: 'iphone14-home.png', fullPage: true });
  console.log('📸 Screenshot saved: iphone14-home.png');

  // 2. Open Modal (Test interaction)
  console.log('Opening Booking Modal...');
  // Click the first "View" button (Note: translated text might vary, targeting by class or structure is safer)
  // Our button has 'View' or translation inside, but class contains 'bg-tripper-pink'
  // We added `group-hover:opacity-100` so it might need a hover first, but click usually works in Playwright even if hidden by opacity unless pointer-events:none
  
  // Force click the first deal button
  const buttons = await page.locator('button.bg-tripper-pink').all();
  if (buttons.length > 0) {
      // The first few buttons might be search/newsletter, we need the deal card button. 
      // Deal card buttons are inside the grid.
      const dealButton = page.locator('.grid button').first();
      if (await dealButton.count() > 0) {
          // On mobile, hover isn't a thing, but we removed opacity-0 for mobile? 
          // Let's check the code. The button has `opacity-0 group-hover:opacity-100`. 
          // On mobile this might be an issue if the user can't tap it.
          // Actually, on mobile, usually tap triggers hover state then click, or we should make it always visible on mobile.
          
          // Let's try to click it forcefully
          await dealButton.click({ force: true }); 
          await page.waitForTimeout(1000); // Wait for modal animation
          
          await page.screenshot({ path: 'iphone14-modal.png' });
          console.log('📸 Screenshot saved: iphone14-modal.png');

          // 3. Select Date & Time and Go to Checkout
          console.log('Interacting with Modal to go to Checkout...');
          
          // Click a date (e.g., the 28th or a specific enabled day)
          // We selected disabled={before: new Date()}, so today/tomorrow are enabled.
          // Let's try to click the first enabled day.
          const enabledDay = page.locator('.rdp-day:not(.rdp-day_disabled)').first();
          if (await enabledDay.count() > 0) {
              await enabledDay.click();
              console.log('Date selected.');
          } else {
              console.log('⚠️ No enabled dates found.');
          }

          // Click a time slot
          const firstTimeSlot = page.locator('button.border-gray-200').first();
          if (await firstTimeSlot.count() > 0) {
              await firstTimeSlot.click();
              console.log('Time selected.');
          }

          // Click Confirm
          const confirmButton = page.locator('button', { hasText: 'Datum bevestigen' }).or(page.locator('button', { hasText: 'Confirm' }));
          // Note: Text depends on locale. Default is NL 'Datum bevestigen' or EN 'Confirm Date'
          // We can target the full width button at the bottom of the modal right side
          const ctaButton = page.locator('.p-6.flex-1.flex.flex-col .mt-auto button');
          
          await ctaButton.click();
          await page.waitForURL('**/checkout**');
          console.log('Navigated to Checkout.');
          
          await page.waitForTimeout(1000);
          await page.screenshot({ path: 'iphone14-checkout.png', fullPage: true });
          console.log('📸 Screenshot saved: iphone14-checkout.png');

      } else {
          console.log('⚠️ No deal buttons found.');
      }
  }

  await browser.close();
}

checkMobile().catch(err => {
    console.error(err);
    process.exit(1);
});
