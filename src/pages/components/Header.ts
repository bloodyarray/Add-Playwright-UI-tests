import { expect, Page } from '@playwright/test';

export class Header {
  constructor(private page: Page) {}

  async openCart() {
    await this.page.click('[data-test="shopping-cart-link"]');
  }

  async expectCartBadge(count: number) {
    const badge = this.page.locator('[data-test="shopping-cart-badge"]');
    if (count === 0) {
      await expect(badge).toHaveCount(0);
    } else {
      await expect(badge).toHaveText(String(count));
    }
  }
}