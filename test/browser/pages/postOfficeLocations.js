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

    // async checkErrorText(){
    //   const errorText = await this.page.locator("#error-summary-title").textContent();
    //   return errorText.trim(); 
    // }

    // async getPostcode() {
    //   const enteredPostCode = await req.sessionModel.get("postcode");
    //   return enteredPostCode.trim();
    // }
    
    async firstChoice(){
      const enteredPostCode = await this.page.locator("#postcode").textContent();
      console.log("✅" + enteredPostCode)
      const trimPC = enteredPostCode.trim()
      await this.page.click("#" + trimPC);
    }
};
