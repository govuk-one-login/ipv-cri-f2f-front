const { expect } = require('chai');

module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/choose-photo-id-post-office-biometric";
    this.assert = require("assert");
  }

  async isCurrentPage() {
    const { pathname } = new URL(await this.page.url());
    return pathname === this.path;
  }

  async continue() {
    await this.page.click("#continue");
  }

  async ukPassportChoice() {
    await this.page.click("#photoIdChoiceThinFile");
  }

  async nonUKPassportChoice() {
    await this.page.click("#photoIdChoiceThinFile-nonUkPassport");
  }

  async back() {
    await this.page.click("#back");
  }

  async validateThinFileOptions() {
    this.assert(await this.page.locator("#photoIdChoiceThinFile-ukPassport-label").isVisible(), "UK passport option not visable");
    this.assert(await this.page.locator("#photoIdChoiceThinFile-nonUkPassport-label").isVisible(), "Non-UK Passport option not visable");

    this.assert(await this.page.locator('#photoIdChoice-euPhotocardDl').count() === 0, "EU photocard displayed for a thin file user");
    this.assert(await this.page.locator('#eeaIdentityCard').count() === 0, "EEA identity card displayed for a thin file user");
    this.assert(await this.page.locator('#photoIdChoice-brp').count() === 0, "Biometric residance permet displayed for a thin file user");
    this.assert(await this.page.locator('#photoIdChoice-ukPhotocardDl').count() === 0, "Uk driving licence displayed for a thin file user");
  }
};
