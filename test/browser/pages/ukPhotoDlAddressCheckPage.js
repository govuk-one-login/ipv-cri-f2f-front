module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.baseURL = process.env.F2F_FE_BASE_URL;
    this.path = "/uk-driving-licence-current-address";
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

  async addressYes() {
    await this.page.click("#ukPhotocardDlAddressCheck");
  }

  async addressNo() {
    await this.page.click("#ukPhotocardDlAddressCheck-previous-label");
  }

  async changeAddressLink() {
    await this.page.click(".govuk-details__summary-text");
  }

  async tellDvlaLink() {
    await this.page.click(".govuk-details__text");
  }

  async checkErrorText() {
    const errorText = await this.page
      .locator(".govuk-error-summary__title")
      .textContent();
    return errorText.trim();
  }
  async back() {
    await this.page.click("#back");
  }

  async checkRedirectionErrorText() {
    const errorRedirectionText = await this.page.textContent(
      '[data-id="error-title"]'
    );
    return errorRedirectionText.trim();
  }
};
