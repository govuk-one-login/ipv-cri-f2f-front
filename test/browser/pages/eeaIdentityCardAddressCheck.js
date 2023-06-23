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

    async sameAddress(){
     // await this.page.click("#eeaIdCardAddressCheck")
      await this.page.locator(".govuk-radios__item").first().click();
    }

    async differentAddress(){
      //await this.page.click("#eeaIdCardAddressCheck-Noithasmypreviousaddressonit")
      await this.page.locator(".govuk-radios__item").nth(1).click();
    }

    async noAddress(){
     //await this.page.click("#eeaIdCardAddressCheck-Myidentitycarddoesnothavemyaddressonit")
     await this.page.locator(".govuk-radios__item").last().click();
    }
};
