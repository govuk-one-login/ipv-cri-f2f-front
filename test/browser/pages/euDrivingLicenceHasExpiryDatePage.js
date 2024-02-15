module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.baseURL = process.env.IPV_BASE_URL;
    this.path = "/eu-driving-licence-expiry-date";
  }

  async goTo() {
    await this.page.goto(this.baseURL + this.path);
  }

  async isCurrentPage() {
    const { pathname } = new URL(await this.page.url());
    return pathname === this.path;
  }

  async isCurrentEditPage() {
    const { pathname } = new URL(await this.page.url());

    return pathname === this.path + "/edit";
  }

  async continue() {
    await this.page.click("#continue");
  }

  async yes() {
    await this.page.click("#idHasExpiryDate");
  }

  async no() {
    await this.page.click("#idHasExpiryDate-No");
  }

  async checkErrorText() {
    const errorText = await this.page.locator("#error-summary-title").textContent();
    return errorText.trim()
  }

  async checkErrorBodyText() {
    const errorBodyText = await this.page.locator('[href*="#idHasExpiryDate"]').textContent();
    return errorBodyText.trim()
  }

  async checkErrorAboveRadioButtonText() {
    const errorBodyText = await this.page.locator("#idHasExpiryDate-error").textContent();
    return errorBodyText.trim()
  }

  async checkRedirectionErrorText() {
    const errorRedirectionText = await this.page.textContent('[data-id="error-title"]');
    return errorRedirectionText.trim();
  }
};
