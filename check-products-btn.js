
const { chromium } = require('playwright');

async function checkProductsButton() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('Navigating to localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Locate the Products button (text might be localized as 'Producten')
  // We'll look for a button containing "Producten" or "Products"
  const productsBtn = page.locator('button').filter({ hasText: /Producten|Products/i }).first();

  if (await productsBtn.count() > 0) {
      console.log('✅ Products button found.');
      
      // Click the button to toggle dropdown
      console.log('Clicking Products button...');
      await productsBtn.click();
      await page.waitForTimeout(500); // Wait for animation
      
      // Check if dropdown is visible by looking for a link inside it
      // e.g. "All deals" or "Alle deals" or "Beauty & Wellness"
      const dropdownLink = page.locator('a[href*="/category/sauna"]').first();
      
      if (await dropdownLink.isVisible()) {
          console.log('✅ Dropdown opened successfully. "Beauty & Wellness" link is visible.');
      } else {
          console.error('❌ Dropdown did NOT open or links are not visible.');
      }
      
      await page.screenshot({ path: 'products-btn-check.png' });
      console.log('📸 Screenshot saved: products-btn-check.png');
      
  } else {
      console.error('❌ Products button not found.');
  }

  await browser.close();
}

checkProductsButton().catch(err => console.error(err));
