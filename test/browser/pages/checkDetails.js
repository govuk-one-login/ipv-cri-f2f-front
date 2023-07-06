module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/checkDetails";
  }

  async isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
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

  async changeCountry() {
    await this.page.click('[href*="eeaIdentityCardCountrySelector/edit"]');
  }

  async continue() {
    await this.page.click("#continue");
  }

  async setSessionState() {
    const url = JSON.stringify(new URL(await this.page.url())).split("state=")
    return url[1];
  }

};
