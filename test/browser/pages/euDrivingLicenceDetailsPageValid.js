module.exports = class PlaywrightDevPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.path = "/euPhotocardDlDetails";
    }

    async isCurrentPage() {
      const { pathname } = new URL(this.page.url());
      return pathname === this.path;
    }
  
    async continue() {
      await this.page.click("#continue");
    }
  
    async expiryDate() {
      const expDay = new Date().getDate().toString()
      const currentMonth = new Date().getMonth() + 1
      const expMonth = currentMonth.toString()
      const expYear = new Date().getFullYear().toString()
      await this.page.locator("#euPhotocardDlExpiryDate-day").fill(expDay);
      await this.page.locator("#euPhotocardDlExpiryDate-month").fill(expMonth);
      await this.page.locator("#euPhotocardDlExpiryDate-year").fill(expYear);
    }
};
