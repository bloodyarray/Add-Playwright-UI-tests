import { expect, Page } from '@playwright/test';
import { Header } from './components/Header';

export class InventoryPage {
  readonly header: Header;

  constructor(private page: Page) {
    this.header = new Header(page);
  }

  async expectOpened() {
    await expect(this.page).toHaveURL(/inventory.html/);
  }

  private slug(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '-');
  }

  async addItem(name: string) {
    await this.page.click(`[data-test="add-to-cart-${this.slug(name)}"]`);
  }

  async removeItem(name: string) {
    await this.page.click(`[data-test="remove-${this.slug(name)}"]`);
  }

  async openCart() {
    await this.header.openCart();
  }
}