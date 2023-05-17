module.exports = class PlaywrightDevPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.url = "http://localhost:5030/eeaIdCardAddressCheck";
    }

    async isCurrentPage() {
      return await this.page.url() === this.url;
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

    async sameAddress(){
      await this.page.click("#eeaIdCardAddressCheck")
    }

    async noAddress(){
      await this.page.click("#eeaIdCardAddressCheck-noAddress")
    }
};