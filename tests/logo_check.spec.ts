import { test, expect } from '@playwright/test';

test.describe('Logo Visibility Check', () => {
  const baseUrl = 'http://localhost:3000/en'; // Testing English locale

  test('Logo should be visible on Desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(baseUrl);
    
    // Locate the logo image by alt text
    const logo = page.locator('img[alt="Trippa Logo"]');
    
    // Check if the element is attached and visible
    await expect(logo).toBeVisible();
    
    // Check if the image is actually loaded (naturalWidth > 0)
    const isLoaded = await logo.evaluate((img) => {
      return (img as HTMLImageElement).naturalWidth > 0;
    });
    
    expect(isLoaded).toBeTruthy();
    console.log('Desktop: Logo is visible and loaded.');
  });

  test('Logo should be visible on Mobile', async ({ page }) => {
    // iPhone 13 viewport
    await page.setViewportSize({ width: 390, height: 844 }); 
    await page.goto(baseUrl);
    
    // Locate the logo image by alt text
    const logo = page.locator('img[alt="Trippa Logo"]');
    
    // Check if the element is attached and visible
    await expect(logo).toBeVisible();
    
    // Check if the image is actually loaded (naturalWidth > 0)
    const isLoaded = await logo.evaluate((img) => {
      return (img as HTMLImageElement).naturalWidth > 0;
    });
    
    expect(isLoaded).toBeTruthy();
    console.log('Mobile: Logo is visible and loaded.');
  });
});
