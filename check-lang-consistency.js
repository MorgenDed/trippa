
const { chromium } = require('playwright');

async function checkLanguage() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const scenarios = [
    { url: 'http://localhost:3000/nl/category/day-trips', expected: 'Dagjes uit', lang: 'NL' },
    { url: 'http://localhost:3000/en/category/day-trips', expected: 'Day Trips', lang: 'EN' },
    { url: 'http://localhost:3000/nl/category/hotels', expected: 'Hotels & Vakantie', lang: 'NL' },
    { url: 'http://localhost:3000/en/category/hotels', expected: 'Hotels & Holiday', lang: 'EN' },
  ];

  console.log('--- Starting Language Consistency Check ---');
  let errors = 0;

  for (const scenario of scenarios) {
    console.log(`Checking ${scenario.lang} page: ${scenario.url}...`);
    await page.goto(scenario.url, { waitUntil: 'domcontentloaded' });
    
    // We expect the H1 to match the category name
    const h1 = page.locator('h1');
    const text = await h1.innerText();
    
    if (text.toLowerCase().includes(scenario.expected.toLowerCase())) {
        console.log(`✅ [${scenario.lang}] Success: Found "${scenario.expected}"`);
    } else {
        console.error(`❌ [${scenario.lang}] Fail: Expected "${scenario.expected}", but found "${text}"`);
        errors++;
    }
  }

  // Also check a specific tour title if possible (just sampling)
  // This is harder since data is currently hardcoded, but let's see what's there
  await page.goto('http://localhost:3000/en/category/hotels');
  const hotelCard = page.locator('h3').first(); // Assuming tour title is h3 or inside a card
  if (await hotelCard.count() > 0) {
      const hotelText = await hotelCard.innerText();
      console.log(`ℹ️ [EN] First tour title in Hotels: "${hotelText}"`);
      // We know currently it is likely Dutch "Luxe overnachting..."
      if (hotelText.includes("Luxe overnachting")) {
          console.warn(`⚠️ [EN] Warning: Tour title seems to be in Dutch on English page.`);
      }
  }

  console.log('-------------------------------------------');
  if (errors > 0) {
      console.log(`⚠️ Found ${errors} language inconsistencies in Category Titles.`);
  } else {
      console.log('🎉 All Category Titles match the language!');
  }

  await browser.close();
}

checkLanguage().catch(err => console.error(err));
