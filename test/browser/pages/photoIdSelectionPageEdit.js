module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5030/photoIdSelection/edit";
  }

  async isCurrentPage() {
    return await this.page.url() === this.url;
   
  }

  async continue() {
    await this.page.click("#continue");
  }

  async ukPassportChoice(){
    await this.page.click("#photoIdChoice");
  }

  async drivingLicenceChoice(){
    await this.page.click("#photoIdChoice-ukPhotocardDl");
  }

  async brpChoice(){
    await this.page.click("#photoIdChoice-brp");
  }

  async nonUKPassportChoice(){
    await this.page.click("#photoIdChoice-nonUkPassport");
  }
  
  async nationalIdentityCardEEAChoice(){
    await this.page.click("#photoIdChoice-eeaIdentityCard");
  }

  async euDrivingLicenceChoice(){
    await this.page.click("#photoIdChoice-euPhotocardDl");
  }

  async back(){
    await this.page.click("#back");
  }
};
