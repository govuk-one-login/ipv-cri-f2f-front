module.exports = class PlaywrightDevPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.path = "/findBranch/edit";
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
    
    async postCodeChange() {
      await this.page.locator("#postcode").fill("W8 5ED");
    }
  };
