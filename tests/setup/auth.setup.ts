import { test as setup, expect } from '@playwright/test';

const storageStatePath = 'playwright/.auth/user.json';

setup('login once and save storageState', async ({ page }) => {
  await page.goto('/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory\.html/);

  await page.context().storageState({ path: storageStatePath });
});