module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.baseURL = process.env.IPV_BASE_URL;
    this.path = "/uk-passport-expire";
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

  async expiryDateDay() {
    const tomorrow = new Date().getDate() + 1
    const expDay = tomorrow.toString()
    const currentMonth = new Date().getMonth() + 1
    const expMonth = currentMonth.toString()
    const futureYear = new Date().getFullYear() + 10
    const expYear = futureYear.toString()
    await this.page.locator("#ukPassportExpiryDate-day").fill(expDay);
    await this.page.locator("#ukPassportExpiryDate-month").fill(expMonth);
    await this.page.locator("#ukPassportExpiryDate-year").fill(expYear);
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
