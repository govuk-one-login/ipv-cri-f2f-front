module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.baseURL = "https://f2f-cri-front." + process.env.IPV_BASE_URL;
    this.path = "/prove-identity-post-office";
  }

  async goTo(){
    await this.page.goto(this.baseURL+this.path);
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

  async checkRedirectionErrorText(){
    const errorRedirectionText = await this.page.textContent('[data-id="error-title"]');
    return errorRedirectionText.trim();
  }

};
