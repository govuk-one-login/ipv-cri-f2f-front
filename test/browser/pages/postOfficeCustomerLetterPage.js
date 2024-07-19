module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.baseURL = process.env.F2F_FE_BASE_URL;
    this.path = "/post-office-customer-letter";
  }

  async goTo() {
    await this.page.goto(this.baseURL + this.path);
  }

  async isCurrentPage() {
    const { pathname } = new URL(await this.page.url());
    return pathname === this.path;
  }

  async selectCustomerLetterOption(customerLetterType) {
    if (customerLetterType === "Email only") {
      await this.page.click("#postOfficeCustomerLetterChoice-email-label");
    } else if (customerLetterType === "Post and Email") {
      await this.page.click("#postOfficeCustomerLetterChoice-post-label");
    } else {
      throw new Error(`Invalid customer letter type: ${customerLetterType}`);
    }
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

};
