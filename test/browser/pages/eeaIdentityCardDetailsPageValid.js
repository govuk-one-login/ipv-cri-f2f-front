module.exports = class PlaywrightDevPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    
    constructor(page) {
      this.page = page;
      this.baseURL = "https://f2f-cri-front." + IPV_BASE_URL;
      this.path = "/national-identity-card-expire";
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
  
    async expiryDate() {
      const expDay = new Date().getDate().toString()
      const currentMonth = new Date().getMonth() + 1
      const expMonth = currentMonth.toString()
      const expYear = new Date().getFullYear().toString()
      await this.page.locator("#eeaIdCardExpiryDate-day").fill(expDay);
      await this.page.locator("#eeaIdCardExpiryDate-month").fill(expMonth);
      await this.page.locator("#eeaIdCardExpiryDate-year").fill(expYear);
    }

    async checkErrorText(){
      const errorText = await this.page.locator("#error-summary-title").textContent();
      return errorText.trim(); 
    }

    async checkRedirectionErrorText(){
      const errorRedirectionText = await this.page.textContent('[data-id="error-title"]');
      return errorRedirectionText.trim();
    }
};
