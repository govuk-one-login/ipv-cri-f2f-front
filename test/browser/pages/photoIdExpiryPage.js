module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/photo-id-expired";
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

};
