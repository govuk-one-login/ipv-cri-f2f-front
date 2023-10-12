module.exports = class PlaywrightDevPage {
	
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
		this.path = "/error";
  }

  getErrorTitle() {
    return this.page.textContent('[data-id="error-title"]');
  }

  getSomethingWentWrongMessage() {
    return "Sorry, there is a problem with the service";
  }

  getLocalisedSomethingWentWrongMessage(lang) {
    if (lang.toLowerCase() === "welsh") {
      return "Mae'n ddrwg gennym, mae problem";
    } else {
      return "Sorry, there is a problem with the service";
    }
  }

	async isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }
};
