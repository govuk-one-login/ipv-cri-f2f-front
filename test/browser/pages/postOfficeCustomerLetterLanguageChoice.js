module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.baseURL = process.env.F2F_FE_BASE_URL;
    this.path = "/post-office-customer-letter-choose-language";
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

  async selectEnglish() {
    await this.page.click("#postOfficeCustomerLetterLanguageChoice");
  }

  async selectWelsh() {
    await this.page.click("#postOfficeCustomerLetterLanguageChoice-welsh");
  }

  async selectBoth() {
    await this.page.click("#postOfficeCustomerLetterLanguageChoice-both");
  }
};