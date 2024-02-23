module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.baseURL = process.env.F2F_FE_BASE_URL;
    this.path = "/choose-photo-id-post-office";
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

  async ukPassportChoice() {
    await this.page.click("#photoIdChoice");
  }

  async drivingLicenceChoice() {
    await this.page.click("#photoIdChoice-ukPhotocardDl");
  }

  async brpChoice() {
    await this.page.click("#photoIdChoice-brp");
  }

  async nonUKPassportChoice() {
    await this.page.click("#photoIdChoice-nonUkPassport");
  }

  async nationalIdentityCardEEAChoice() {
    await this.page.click("#photoIdChoice-eeaIdentityCard");
  }

  async euDrivingLicenceChoice() {
    await this.page.click("#photoIdChoice-euPhotocardDl");
  }

  async back() {
    await this.page.click("#back");
  }

  async checkRedirectionErrorText() {
    const errorRedirectionText = await this.page.textContent('[data-id="error-title"]');
    return errorRedirectionText.trim();
  }
};
