module.exports = class PlaywrightDevPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.baseURL = "https://f2f-cri-front." + IPV_BASE_URL;
      this.path = "/choose-post-office-prove-identity";
    }
  
    async goTo(){
      await this.page.goto(this.baseURL+this.path);
    }

    async isCurrentPage() {
      const { pathname } = new URL(await this.page.url());
      return pathname === this.path;
    }
  
    async continue() {
      await this.page.click("#continue");
    }
    
    async firstChoice(){
      await this.page.click("#branches");
    }

    async back(){
      await this.page.click("#back");
    }
  
    async checkErrorText(){
      const errorText = await this.page.locator("#error-summary-title").textContent();
      return errorText.trim(); 
    }

    async changePostcode(){
      await this.page.click("#changePostcode");
    }

    async numberOfLocations(){
    //  await this.page.locator(".govuk-radios__item").nth(1).waitFor();
    //  const count = await this.page.locator(".govuk-radios__item").count();
    //  return await count;

     await this.page.locator(".govuk-radios").first().waitFor();
     return await this.page.locator(".govuk-radios").count();
    }

    async checkRedirectionErrorText(){
      const errorRedirectionText = await this.page.textContent('[data-id="error-title"]');
      return errorRedirectionText.trim();
    }

};
