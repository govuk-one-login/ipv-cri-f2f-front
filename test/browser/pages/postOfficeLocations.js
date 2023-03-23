const e = require('express');

module.exports = class PlaywrightDevPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.url = "http://localhost:5030/locations";
    }
    
    async isCurrentPage() {
      return await this.page.url() === this.url;
    }
  
    async continue() {
      await this.page.click("#continue");
    }
    
    async firstChoice(){
      const enteredPostCode = await this.page.locator("#postcode").textContent();
      const trimPC = enteredPostCode.trim()
      await this.page.click("#" + trimPC);
    }
};
