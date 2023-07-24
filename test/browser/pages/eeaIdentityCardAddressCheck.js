module.exports = class PlaywrightDevPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.path = "/eeaIdCardAddressCheck";
    }

    async isCurrentPage() {
      const { pathname } = new URL(this.page.url());
      return pathname === this.path;
    }

    async continue() {
      await this.page.click("#continue");
    }

    async back(){
      await this.page.click("#back");
    }

    async checkErrorText(){
      const errorText = await this.page.locator("#error-summary-title").textContent();
      return errorText.trim()
    }

    async checkErrorBodyText(){
      const errorBodyText = await this.page.locator('[href*="#idHasExpiryDate"]').textContent();
      return errorBodyText.trim()
    }

    async sameAddress(){
      await this.page.locator(".govuk-radios__item").first().click();
    }

    async differentAddress(){
      await this.page.locator(".govuk-radios__item").nth(1).click();
    }

    async noAddress(){
     await this.page.locator(".govuk-radios__item").last().click();
    }
};
