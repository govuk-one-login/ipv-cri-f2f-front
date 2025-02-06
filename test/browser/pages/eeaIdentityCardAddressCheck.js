module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.baseURL = process.env.F2F_FE_BASE_URL;
    this.path = "/national-identity-card-current-address";
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

  async checkErrorText() {
    const errorText = await this.page
      .locator(".govuk-error-summary__title")
      .textContent();
    return errorText.trim();
  }

  async checkErrorBodyText() {
    const errorBodyText = await this.page
      .locator('[href*="#idHasExpiryDate"]')
      .textContent();
    return errorBodyText.trim();
  }

  async sameAddress() {
    await this.page.click("#eeaIdentityCardAddressCheck-current-label");
  }

  async differentAddress() {
    await this.page.click("#eeaIdentityCardAddressCheck-previous-label");
  }

  async noAddress() {
    await this.page.click("#eeaIdentityCardAddressCheck-idNoAddress-label");
  }

  async checkRedirectionErrorText() {
    const errorRedirectionText = await this.page.textContent(
      '[data-id="error-title"]'
    );
    return errorRedirectionText.trim();
  }
};
