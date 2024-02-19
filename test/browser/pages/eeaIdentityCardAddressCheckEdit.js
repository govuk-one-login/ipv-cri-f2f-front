module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.baseURL = process.env.IPV_BASE_URL;
    this.path = "/national-identity-card-current-address/edit";
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
    const errorText = await this.page.locator(".govuk-error-summary__title").textContent();
    return errorText.trim()
  }

  async sameAddress() {
    await this.page.locator(".govuk-radios__item").first().click();
  }

  async differentAddress() {
    await this.page.locator(".govuk-radios__item").nth(1).click();

  }

  async noAddress() {
    await this.page.locator(".govuk-radios__item").last().click();
  }

  async checkRedirectionErrorText() {
    const errorRedirectionText = await this.page.textContent('[data-id="error-title"]');
    return errorRedirectionText.trim();
  }
};
