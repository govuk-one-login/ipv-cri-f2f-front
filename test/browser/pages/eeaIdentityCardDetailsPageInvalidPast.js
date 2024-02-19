module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.baseURL = process.env.IPV_BASE_URL;
    this.path = "/national-identity-card-expire";
  }

  async goTo() {
    await this.page.goto(this.baseURL + this.path);
  }
  async isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }

  async continue() {
    await this.page.click("#continue");
  }

  async expiryDate() {
    const today = new Date().getDate()
    const expDay = today.toString()
    const currentMonth = new Date().getMonth() + 1
    const expMonth = currentMonth.toString()
    const pastYear = new Date().getFullYear() - 16
    const expYear = pastYear.toString()
    await this.page.locator("#eeaIdCardExpiryDate-day").fill(expDay);
    await this.page.locator("#eeaIdCardExpiryDate-month").fill(expMonth);
    await this.page.locator("#eeaIdCardExpiryDate-year").fill(expYear);
  }

  async checkErrorText() {
    const errorText = await this.page.locator(".govuk-error-summary__title").textContent();
    return errorText.trim();
  }

  async checkRedirectionErrorText() {
    const errorRedirectionText = await this.page.textContent('[data-id="error-title"]');
    return errorRedirectionText.trim();
  }
};
