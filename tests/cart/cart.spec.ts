import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { CartPage } from '../../src/pages/CartPage';

test.describe('@cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
  });

  test('Add one item → badge 1 → item in cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addItem('Sauce Labs Backpack');
    await inventory.header.expectCartBadge(1);

    await inventory.openCart();
    await cart.expectOpened();
    await cart.expectItemVisible('Sauce Labs Backpack');
  });

  test('Add two items → badge 2 → both in cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addItem('Sauce Labs Backpack');
    await inventory.addItem('Sauce Labs Bike Light');
    await inventory.header.expectCartBadge(2);

    await inventory.openCart();
    await cart.expectItemVisible('Sauce Labs Backpack');
    await cart.expectItemVisible('Sauce Labs Bike Light');
  });

  test('Remove item from Inventory → badge updates', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addItem('Sauce Labs Backpack');
    await inventory.addItem('Sauce Labs Bike Light');
    await inventory.removeItem('Sauce Labs Bike Light');
    await inventory.header.expectCartBadge(1);

    await inventory.openCart();
    await cart.expectItemNotVisible('Sauce Labs Bike Light');
  });

  test('Remove item from Cart → badge updates', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addItem('Sauce Labs Backpack');
    await inventory.addItem('Sauce Labs Bike Light');

    await inventory.openCart();
    await cart.removeItem('Sauce Labs Bike Light');
    await cart.header.expectCartBadge(1);
  });

  test('Continue Shopping returns to Inventory', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addItem('Sauce Labs Backpack');
    await inventory.openCart();
    await cart.continueShopping();

    await inventory.expectOpened();
    await inventory.header.expectCartBadge(1);
  });
});