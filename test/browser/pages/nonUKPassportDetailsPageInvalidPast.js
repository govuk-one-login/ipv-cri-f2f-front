module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5030/nonUKPassportDetails";
  }


  async isCurrentPage() {
    return await this.page.url() === this.url;
  }

  async continue() {
    await this.page.click("#continue");
  }

  async expiryDate() {
    const today = new Date().getDate()
    const expDay = today.toString()
    const currentMonth = new Date().getMonth() + 1
    const expMonth = currentMonth.toString()
    const pastYear = new Date().getFullYear() - 75
    const expYear = pastYear.toString()
    await this.page.locator("#nonUKPassportExpiryDate-day").fill(expDay);
    await this.page.locator("#nonUKPassportExpiryDate-month").fill(expMonth);
    await this.page.locator("#nonUKPassportExpiryDate-year").fill(expYear);
  }
};
