module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.baseURL = process.env.IPV_BASE_URL;
    this.path = "/find-post-office-prove-identity/edit";
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

  async postCodeChange() {
    await this.page.locator("#postcode").fill("W8 5ED");
  }

  async checkRedirectionErrorText() {
    const errorRedirectionText = await this.page.textContent('[data-id="error-title"]');
    return errorRedirectionText.trim();
  }
};
