
const { chromium } = require('playwright');

async function checkSearch() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('Navigating to localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Try to find by role 'textbox' if input[type="text"] fails
  let searchInput = page.getByRole('textbox').first();
  if (await searchInput.count() === 0) {
      // Fallback to specific class or parent structure
      searchInput = page.locator('.flex-1 input').first();
  }

  if (await searchInput.count() > 0) {
      console.log('✅ Search input found.');
      
      // Type "Van Gogh"
      console.log('Typing "Van Gogh"...');
      await searchInput.fill('Van Gogh');
      await page.waitForTimeout(500); // Wait for debounce/state update
      
      // Check for results
      const resultItem = page.getByText('Entreeticket Van Gogh & Rembrandt in Amsterdam');
      if (await resultItem.isVisible()) {
          console.log('✅ Search result found: "Van Gogh"');
      } else {
          console.error('❌ Search result NOT found.');
      }
      
      await page.screenshot({ path: 'search-test.png' });
      console.log('📸 Screenshot saved: search-test.png');
  } else {
      console.error('❌ Search input not found (maybe wrong placeholder?).');
  }

  await browser.close();
}

checkSearch().catch(err => console.error(err));
