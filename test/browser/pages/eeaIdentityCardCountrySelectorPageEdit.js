module.exports = class PlaywrightDevPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.path = "/select-country-national-identity-card/edit";
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

    async selectCountry(){
      const dropdown = await this.page.locator("select.govuk-select");
      await dropdown.selectOption("Spain");
    }

  };
