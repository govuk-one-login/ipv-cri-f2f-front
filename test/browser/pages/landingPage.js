module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/landingPage";
    
  }

  async isCurrentPage() {
    const { pathname } = new URL(await this.page.url());
    return pathname === this.path;
  }

  async continue() {
    await this.page.click("#landingPageContinue");
  }

  get poLink() {
    return this.page.locator('[href*="https://www.postoffice.co.uk/identity/in-branch-verification-service"]');
  }

  async postOfficeLink() {
    await this.poLink.click();
    await this.page.locator("button#ensCloseBanner").isVisible();
  }


};
