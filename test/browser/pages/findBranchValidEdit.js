module.exports = class PlaywrightDevPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.url = "http://localhost:5030/findBranch/edit";
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
    
    async postCodeChange() {
      await this.page.locator("#postcode").fill("W8 5ED");
    }
  };
