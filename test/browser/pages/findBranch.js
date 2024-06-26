module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.baseURL = process.env.F2F_FE_BASE_URL;
    this.path = "/find-post-office-prove-identity";
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

  async back() {
    await this.page.click("#back");
  }

  async postCode() {
    await this.page.locator("#postcode").fill("SW1A1AA");
  }

  async postCodeIncompleteData() {
    await this.page.locator("#postcode").fill("SW1A1MNE");
  }

  async postCodeChange() {
    await this.page.locator("#postcode").fill("SW150TU");
  }

  async invalidPostCode() {
    await this.page.locator("#postcode").fill("SWWWWWWW");
  }

  async partialPostCode() {
    await this.page.locator("#postcode").fill("SW1A");
  }

  async checkErrorText() {
    const errorText = await this.page
      .locator(".govuk-error-summary__title")
      .textContent();
    return errorText.trim();
  }

  async checkRedirectionErrorText() {
    const errorRedirectionText = await this.page.textContent(
      '[data-id="error-title"]'
    );
    return errorRedirectionText.trim();
  }
};
