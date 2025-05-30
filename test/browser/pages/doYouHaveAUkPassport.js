module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    this.baseURL = process.env.F2F_FE_BASE_URL;
    this.path = "/do-you-have-UK-passport";
  }

  async goTo() {
    await this.page.goto(this.baseURL + this.path);
  }

  async isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }

  async ukPassportChoiceTrue() {
    await this.page.click("#photoIdChoiceThinFile");
  }

  async ukPassportChoiceFalse() {
    await this.page.click("#photoIdChoiceThinFile-noPhotoId");
  }

  async continue() {
    await this.page.click("#continue");
  }

};
