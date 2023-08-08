module.exports = class PlaywrightDevPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.baseURL = "https://f2f-cri-front.review-o.dev.account.gov.uk";
      this.path = "/select-country-eu-driving-licence/edit";
    }
  
    async goTo(){
      await this.page.goto(this.baseURL+this.path);
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

    async checkRedirectionErrorText(){
      const errorRedirectionText = await this.page.textContent('[data-id="error-title"]');
      return errorRedirectionText.trim();
    }

  };
