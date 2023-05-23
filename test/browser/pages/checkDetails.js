module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5030/checkDetails";
  }

  async isCurrentPage() {
    return await this.page.url() === this.url;
  }

  async back(){
    await this.page.click("#back");
  }

  async changePhotoIDLink(){
    await this.page.click('[href*="/photoIdSelection/edit"]');
  }

  async changeExpiryDate() {
      await this.page.click('[href*="/ukPassportDetails/edit"]');
  }

  async changePOLocation() {
    await this.page.click('[href*="/findBranch/edit"]');
  }

  async changeAddressCheckLocation() {
    await this.page.click('[href*="eeaIdCardAddressCheck/edit"]');
  }

  async continue() {
    await this.page.click("#continue");
  }

};
