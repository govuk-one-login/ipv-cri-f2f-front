module.exports = class PlaywrightDevPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.path = "/find-post-office-prove-identity";
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
    
    async postCode() {
      await this.page.locator("#postcode").fill("SW1A1AA");
    }

    async postCodeChange() {
      await this.page.locator("#postcode").fill("SW150TU");
    }

    async invalidPostCode() {
      await this.page.locator("#postcode").fill("SWWWWWWW");
    }
  
    async partialPostCode() {
      await this.page.locator("#postcode").fill("SW1A");
    }

    async checkErrorText(){
      const errorText = await this.page.locator("#error-summary-title").textContent();
      return errorText.trim()
    }
    
  };
