module.exports = class PlaywrightDevPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.url = "http://localhost:5030/ukDlAddressCheck";
    }
    
    async isCurrentPage() {
      return await this.page.url() === this.url;
    }
  
    async continue() {
      await this.page.click("#continue");
    }
  
    async addressYes(){
      await this.page.click("#ukDlAddressCheck");
    }
    
    async addressNo(){
      await this.page.click("#ukDlAddressCheck-No");
    }
    
    async changeAddressLink(){
      await this.page.click(".govuk-details__summary-text");
    } 

    async tellDvlaLink(){
      await this.page.click(".govuk-details__text");
    } 

    async checkErrorText(){
      const errorText = await this.page.locator("#error-summary-title").textContent();
      return errorText.trim(); 
    }
    async back(){
      await this.page.click("#back");
    }


  };
