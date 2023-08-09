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
  
    async postCode() {
      await this.page.locator("#postcode").fill("SW1A 1AA");
    }
  };
