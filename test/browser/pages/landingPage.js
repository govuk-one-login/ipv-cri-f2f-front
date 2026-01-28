module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.baseURL = process.env.F2F_FE_BASE_URL;
    this.path = "/prove-identity-post-office";
  }

  async goTo() {
    await this.page.goto(this.baseURL + this.path);
  }

  async goToWithFeatureSet(featureSet) {
    await this.page.goto(this.baseURL + this.path + "?featureSet=" + featureSet );
  }

  async isCurrentPage() {
    const { pathname } = new URL(await this.page.url());
    await this.page.waitForLoadState("networkidle");
    return pathname === this.path;
  }

  async continue() {
    await this.page.click("#landingPageContinue");
  }

  async getPostOfficeNumberOfDays() {
    const numberOfDaysText = await this.page.textContent(".govuk-inset-text");
    return numberOfDaysText.trim();
  }

  get poLink() {
    return this.page.locator(
      '[href*="https://www.postoffice.co.uk/identity/in-branch-verification-service"]'
    );
  }

  async postOfficeLink() {
    await this.poLink.click();
    await this.page.locator("button#ensCloseBanner").isVisible();
  }

  async checkRedirectionErrorText() {
    const errorRedirectionText = await this.page.textContent(
      '[data-id="error-title"]'
    );
    return errorRedirectionText.trim();
  }

  async returnLanguageAttribute() {
    const htmlElement = await this.page.locator("html");
    return await htmlElement.getAttribute("lang");
  }

  async selectLanguageToggle(language) {
    await this.page.getByText(language).click();
  }

  async returnLanguageToggleHref(language) {
    const htmlElement = await this.page.getByText(language);
    return await htmlElement.getAttribute("href");
  }

  async languageTogglePresent() {
    await this.page.locator("div.govuk-width-container > nav").isVisible();
  }
};
