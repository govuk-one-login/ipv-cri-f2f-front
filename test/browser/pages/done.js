module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5030/done";
  }

  async isCurrentPage() {
    return await this.page.url() === this.url;
  }

};
