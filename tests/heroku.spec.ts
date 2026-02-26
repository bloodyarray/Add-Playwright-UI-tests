import { test, expect } from '@playwright/test';

test('Login works', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await page.fill('#username', 'tomsmith');
  await page.fill('#password', 'SuperSecretPassword!');
  await page.click('button[type="submit"]');

  const flash = page.locator('#flash');
  await expect(flash).toBeVisible();
  await expect(flash).toContainText('You logged into a secure area!');
});

test('Checkbox can be checked', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/checkboxes');

  const checkbox = page.locator('input[type="checkbox"]').first();

  if (await checkbox.isChecked()) {
    await checkbox.uncheck();
  }

  await checkbox.check();
  await expect(checkbox).toBeChecked();
});

test('Dropdown option selected', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dropdown');

  const dropdown = page.locator('#dropdown');
  await dropdown.selectOption('2');

  await expect(dropdown).toHaveValue('2');
});

test('Dynamic loading shows text', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

  await page.locator('#start button').click();

  // Чекаємо, поки з’явиться текст у #finish (всередині там буде <h4>Hello World!</h4>)
  await expect(page.locator('#finish')).toContainText('Hello World!', { timeout: 15000 });
});

test('JS alert prompt works', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  page.once('dialog', async dialog => {
    await dialog.accept('Test');
  });

  await page.click('button:has-text("Click for JS Prompt")');

  await expect(page.locator('#result')).toContainText('Test');
});