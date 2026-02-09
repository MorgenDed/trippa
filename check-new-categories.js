
const { chromium } = require('playwright');

async function checkNewCategories() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('Navigating to hotels category...');
  await page.goto('http://localhost:3000/category/hotels', { waitUntil: 'networkidle' });
  
  // Check for Hotel Gulpenerland
  try {
    const hotel = page.getByText('Hotel Gulpenerland');
    await hotel.waitFor({ state: 'visible', timeout: 5000 });
    console.log('✅ Hotel Gulpenerland found in Hotels category.');
  } catch (e) {
      console.error('❌ Hotel Gulpenerland NOT found.');
      await page.screenshot({ path: 'debug-hotels.png' });
      console.log('Saved debug-hotels.png');
  }

  console.log('Navigating to night-out category...');
  await page.goto('http://localhost:3000/category/night-out', { waitUntil: 'networkidle' });
  
  // Check for Pathe
  try {
      const cinema = page.getByText('Pathé Bioscoop Voucher');
      await cinema.waitFor({ state: 'visible', timeout: 5000 });
      console.log('✅ Pathé Bioscoop found in Night Out category.');
  } catch (e) {
      console.error('❌ Pathé Bioscoop NOT found.');
      await page.screenshot({ path: 'debug-nightout.png' });
      console.log('Saved debug-nightout.png');
  }

  await browser.close();
}

checkNewCategories().catch(err => console.error(err));
