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

  async changeIDHASExpiryDate() {
    await this.page.click('[href*="non-uk-passport-has-expiry-date/edit"]');
  }

  async changeEEAHASExpiryDate() {
    await this.page.click('[href*="national-identity-card-has-expiry-date/edit"]');
    await this.page.locator(".govuk-summary-list__value").nth(1).textContent();
  }

  async changeEUDLHASExpiryDate() {
    await this.page.click('[href*="eu-driving-licence-has-expiry-date/edit"]');
  }

  async getChangeIDHASExpiryDateSelection() {
    const optionSelected = await this.page.locator(".govuk-summary-list__value").nth(1).textContent();
    return optionSelected.trim()
    
  }

  async isExpiryDateSelectionDisplayed() {
    return await this.page.isVisible('text= Does your photo ID have an expiry date');
  }

  async isExpiryDateDisplayed() {
    const expiryDateLabel = await this.page.locator(".govuk-summary-list__key").nth(2).textContent();
    return expiryDateLabel.trim();
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
