module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5030/ukPassportDetails";
  }


  async isCurrentPage() {
    return await this.page.url() === this.url;
  }

  async continue() {
    await this.page.click("#continue");
  }

  async expiryDateDay() {
    const tomorrow = new Date().getDate() + 1
    const expDay = tomorrow.toString()
    const currentMonth = new Date().getMonth() + 1
    const expMonth = currentMonth.toString()
    const futureYear = new Date().getFullYear() + 10
    const expYear = futureYear.toString()
    await this.page.locator("#ukPassportExpiryDate-day").fill(expDay);
    await this.page.locator("#ukPassportExpiryDate-month").fill(expMonth);
    await this.page.locator("#ukPassportExpiryDate-year").fill(expYear);
  }

  async checkErrorText(){
    const errorText = await this.page.locator("#error-summary-title").textContent();
    return errorText.trim(); 
  }
};
