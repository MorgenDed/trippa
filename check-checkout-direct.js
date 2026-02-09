
const { chromium } = require('playwright');

async function checkCheckoutDirect() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('Navigating directly to checkout...');
  try {
    const response = await page.goto('http://localhost:3000/checkout?deal=Test&date=2024-01-01&time=10:00', { timeout: 10000 });
    console.log(`Response status: ${response.status()}`);
    
    await page.waitForSelector('h1', { timeout: 5000 });
    const title = await page.textContent('h1');
    console.log(`Page title: ${title}`);
    
    if (title.includes('Bestelling afronden') || title.includes('Complete Order')) {
        console.log('✅ Checkout page loaded successfully!');
    } else {
        console.error('❌ Checkout page title mismatch.');
    }
    
    await page.screenshot({ path: 'checkout-direct-success.png' });
    console.log('Screenshot saved.');

  } catch (e) {
    console.error('❌ Failed to load checkout page:', e.message);
    await page.screenshot({ path: 'checkout-direct-error.png' });
  }

  await browser.close();
}

checkCheckoutDirect();
