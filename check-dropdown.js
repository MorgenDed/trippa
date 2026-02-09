
const { chromium } = require('playwright');

async function checkDropdown() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('Navigating to localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Check if "Producten" button exists
  const productsBtn = page.getByText('Producten'); // Or 'Products' depending on locale
  if (await productsBtn.count() > 0) {
      console.log('✅ Products button found.');
      
      // Hover to open dropdown
      await productsBtn.hover();
      await page.waitForTimeout(500); // Wait for animation
      
      // Check for a link in the dropdown, e.g., "Beauty & Wellness"
      const wellnessLink = page.locator('a[href*="/category/sauna"]');
      if (await wellnessLink.isVisible()) {
          console.log('✅ Dropdown opened and "Beauty & Wellness" link is visible.');
      } else {
          console.error('❌ Dropdown link not visible.');
      }
      
      // Take screenshot
      await page.screenshot({ path: 'dropdown-check.png' });
      console.log('📸 Screenshot saved: dropdown-check.png');
  } else {
      console.error('❌ Products button not found.');
  }

  await browser.close();
}

checkDropdown().catch(err => console.error(err));
