import { expect, Locator, Page } from '@playwright/test';
import { Header } from './components/Header';

export class CartPage {
  readonly page: Page;
  readonly header: Header;

  // локатор списку товарів у кошику
  readonly cartList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);

    // На SauceDemo контейнер списку в cart має data-test="cart-list"
    this.cartList = page.locator('[data-test="cart-list"]');
  }

  // open() або goto()
  async open() {
    await this.page.goto('/cart.html');
  }

  // перевірка, що відкрито Cart
  async expectOpened() {
    await expect(this.page).toHaveURL(/\/cart\.html$/);
    await expect(this.cartList).toBeVisible();
    await expect(this.page.locator('[data-test="title"]')).toHaveText('Your Cart');
  }

  // перевірити, що товар присутній
  async expectItemVisible(name: string) {
    await expect(this.itemNameLocator(name)).toBeVisible();
  }

  // видалити товар по назві
  async removeItem(name: string) {
    const item = this.cartItemByName(name);
    await expect(item).toBeVisible();
    await item.getByRole('button', { name: /remove/i }).click();
  }

  // кнопка Continue Shopping
  async continueShopping() {
    await this.page.locator('[data-test="continue-shopping"]').click();
  }

  // кнопка Checkout (лише перехід)
  async checkout() {
    await this.page.locator('[data-test="checkout"]').click();
  }

  // ---- helpers (всередині POM) ----

  private itemNameLocator(name: string) {
    // Назва в кошику: .inventory_item_name
    return this.page.locator('.inventory_item_name', { hasText: name });
  }

  private cartItemByName(name: string) {
    // Блочок товару в cart: .cart_item
    return this.page.locator('.cart_item').filter({
      has: this.page.locator('.inventory_item_name', { hasText: name }),
    });
  }

  // (не вимога, але корисно для тестів "не видно")
  async expectItemNotVisible(name: string) {
    await expect(this.page.locator('.inventory_item_name', { hasText: name })).toHaveCount(0);
  }
}