import { test, expect } from '@playwright/test';

test('auth flow', async ({ page }) => {
  // 1. Go to login page
  await page.goto('/en/login');
  
  // Check if we are on login page
  await expect(page.getByText('Welcome back to Tripper')).toBeVisible();

  // 2. Fill credentials
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');

  // 3. Click Login
  await page.click('button[type="submit"]');

  // 4. Wait for navigation to home
  await expect(page).toHaveURL(/\/en/);
  
  // 5. Check if header shows Logout
  // Note: Depending on mobile/desktop view, it might be in different places.
  // But our test runs in desktop size by default.
  // We added "Logout" text in the button.
  await expect(page.getByText('Logout')).toBeVisible();

  // 6. Click Logout
  await page.click('text=Logout');

  // 7. Should be logged out
  // Check if "Login" link is back
  await expect(page.getByText('Login').first()).toBeVisible();
});
