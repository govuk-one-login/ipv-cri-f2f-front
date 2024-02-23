module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.baseURL = process.env.F2F_FE_BASE_URL;
    this.path = "/check-details";
  }

  async goTo() {
    await this.page.goto(this.baseURL + this.path);
  }

  async isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }

  async back() {
    await this.page.click("#back");
  }

  async changePhotoIDLink() {
    await this.page.click('[href*="/choose-photo-id-post-office/edit"]');
  }

  async changeExpiryDate() {
    await this.page.click('[href*="/uk-passport-expire/edit"]');
  }

  async changeIDHASExpiryDate() {
    await this.page.click('[href*="non-uk-passport-expiry-date/edit"]');
  }

  async changeEEAHASExpiryDate() {
    await this.page.click('[href*="national-identity-card-expiry-date/edit"]');
  }

  async changeEUDLHASExpiryDate() {
    await this.page.click('[href*="eu-driving-licence-expiry-date/edit"]');
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
    await this.page.click('[href*="/find-post-office-prove-identity/edit"]');
  }

  async changeAddressCheckLocation() {
    await this.page.click('[href*="national-identity-card-current-address/edit"]');
  }

  async changeCountry() {
    await this.page.click('[href*="select-country-national-identity-card/edit"]');
  }

  async continue() {
    await this.page.click("#continue");
  }

  async setSessionState() {
    const url = await this.page.url().match(/state=([^&]*)/);
    return url[1];
  }

  async setAuthCode() {
    const url = await this.page.url().match(/code=([^&]*)/);
    return url[1];
  }

  async checkRedirectionErrorText() {
    const errorRedirectionText = await this.page.textContent('[data-id="error-title"]');
    return errorRedirectionText.trim();
  }

};
