import { test, expect } from '@playwright/test';

test('verify country codes in checkout dropdown', async ({ page }) => {
  // Go to checkout page with some query params to make sure it renders
  await page.goto('http://localhost:3000/en/checkout?deal=TestDeal&date=2024-03-20&time=10:00');

  // Locate the specific select element for country codes
  // It's the one inside the form, and we can target it by its distinct class or context
  const select = page.locator('select.w-\\[110px\\]');

  // Ensure it's visible
  await expect(select).toBeVisible();

  // Check for the presence of new country codes
  const expectedCodes = [
    'NL +31', 'BE +32', 'DE +49', 'FR +33', 'GB +44', 'ES +34',
    'IT +39', 'PT +351', 'PL +48', 'TR +90', 'CH +41', 'AT +43',
    'SE +46', 'NO +47', 'DK +45', 'FI +358', 'IE +353', 'GR +30',
    'CZ +420', 'LU +352', 'UA +380', 'US +1'
  ];

  for (const code of expectedCodes) {
    await expect(select).toContainText(code);
  }
  
  // Verify total count
  const options = select.locator('option');
  await expect(options).toHaveCount(expectedCodes.length);
  
  console.log('All country codes verified successfully!');
});
