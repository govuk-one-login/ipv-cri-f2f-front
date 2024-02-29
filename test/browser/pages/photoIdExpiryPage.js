module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.baseURL = process.env.F2F_FE_BASE_URL;
    this.path = "/photo-id-expired";
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

  async ReEnterDetails() {
    await this.page.click("#photoIdExpiryChoice");
  }

  async ChooseDifferentPhotoId() {
    await this.page.click("#photoIdExpiryChoice-chooseDifferentPhotoId");
  }

  async checkRedirectionErrorText() {
    const errorRedirectionText = await this.page.textContent('[data-id="error-title"]');
    return errorRedirectionText.trim();
  }

};
