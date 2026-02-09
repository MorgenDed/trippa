import { test, expect } from '@playwright/test';

test('signup flow', async ({ page }) => {
  // Generate a unique email
  const uniqueId = Date.now();
  const email = `test.signup.${uniqueId}@example.com`;
  const password = 'password123';

  // 1. Go to login page
  await page.goto('/en/login');
  
  // 2. Switch to Sign up mode
  await page.click('text=Sign up');
  
  // Verify we are in sign up mode
  await expect(page.getByText('Create your account')).toBeVisible();

  // 3. Fill credentials
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);

  // 4. Click Sign up
  // The button text changes to "Sign up ->"
  await page.click('button[type="submit"]');

  // 5. Wait for navigation or success state
  // Based on actions.ts: revalidatePath(`/${locale}`, 'layout'); redirect(`/${locale}`)
  await expect(page).toHaveURL(/\/en/);
  
  // 6. Check if header shows Logout (indicating successful login)
  await expect(page.getByText('Logout')).toBeVisible();
});
