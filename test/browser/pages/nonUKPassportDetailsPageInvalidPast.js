module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.baseURL = process.env.F2F_FE_BASE_URL;
    this.path = "/non-uk-passport-expire";
  }

  async goTo() {
    await this.page.goto(this.baseURL + this.path);
  }

  async isCurrentPage() {
    const { pathname } = new URL(await this.page.url());
    return pathname === this.path;
  }

  async continue() {
    await this.page.click("#continue");
  }

  async expiryDate() {
    const today = new Date().getDate();
    const expDay = today.toString();
    const currentMonth = new Date().getMonth() + 1;
    const expMonth = currentMonth.toString();
    const pastYear = new Date().getFullYear() - 75;
    const expYear = pastYear.toString();
    await this.page.locator("#nonUKPassportExpiryDate-day").fill(expDay);
    await this.page.locator("#nonUKPassportExpiryDate-month").fill(expMonth);
    await this.page.locator("#nonUKPassportExpiryDate-year").fill(expYear);
  }

  async checkRedirectionErrorText() {
    const errorRedirectionText = await this.page.textContent(
      '[data-id="error-title"]'
    );
    return errorRedirectionText.trim();
  }
};
