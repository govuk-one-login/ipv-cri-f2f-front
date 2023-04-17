module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5030/photoIdExpiry";
  }

  async isCurrentPage() {
    return await this.page.url() === this.url;
  }

  async continue() {
    await this.page.click("#continue");
  }

  async ReEnterDetails() {
    await this.page.click("#ReEnterDetails");
  }

  async ProveIdentityAnotherWay() {
    await this.page.click("#ProveIdentityAnotherWay");
  }

};
