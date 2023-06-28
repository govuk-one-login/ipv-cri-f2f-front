module.exports = class PlaywrightDevPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.path = "/eeaIdentityCardDetails";
    }
  
    async isCurrentPage() {
      const { pathname } = new URL(this.page.url());
      return pathname === this.path;
    }
    
    async continue() {
      await this.page.click("#continue");
    }
  
    async expiryDate() {
      const today = new Date().getDate()
      const expDay = today.toString()
      const currentMonth = new Date().getMonth() + 1
      const expMonth = currentMonth.toString()
      const pastYear = new Date().getFullYear() - 16
      const expYear = pastYear.toString()
      await this.page.locator("#eeaIdCardExpiryDate-day").fill(expDay);
      await this.page.locator("#eeaIdCardExpiryDate-month").fill(expMonth);
      await this.page.locator("#eeaIdCardExpiryDate-year").fill(expYear);
    }

    async checkErrorText(){
      const errorText = await this.page.locator("#error-summary-title").textContent();
      return errorText.trim(); 
    }
  };
