module.exports = class PlaywrightDevPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.url = "http://localhost:5030/findBranch";
    }
    
    async isCurrentPage() {
      return await this.page.url() === this.url;
    }
  
    async continue() {
      await this.page.click("#continue");
    }
  
    async postCode() {
      await this.page.locator("#postcode").fill("SW1A1AA");
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
