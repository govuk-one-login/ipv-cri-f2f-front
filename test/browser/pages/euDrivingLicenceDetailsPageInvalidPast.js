module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/eu-driving-licence-expire";
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
    const pastYear = new Date().getFullYear() - 3
    const expYear = pastYear.toString()
    await this.page.locator("#euPhotocardDlExpiryDate-day").fill(expDay);
    await this.page.locator("#euPhotocardDlExpiryDate-month").fill(expMonth);
    await this.page.locator("#euPhotocardDlExpiryDate-year").fill(expYear);
  }
};
