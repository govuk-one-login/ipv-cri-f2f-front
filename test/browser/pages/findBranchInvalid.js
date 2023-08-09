module.exports = class PlaywrightDevPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.baseURL = "https://f2f-cri-front." + IPV_BASE_URL;
      this.path = "/find-post-office-prove-identity";
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
  
    async postCode() {
      await this.page.locator("#postcode").fill("SWWWWWWW");
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
