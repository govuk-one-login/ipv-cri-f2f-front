module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.axios = require("axios");
    this.claim = require("../support/shared_claim");
    this.mockURL = "https://ipvstub.review-o.build.account.gov.uk/start";
  }

  async goto() {
    const postRequest = await this.axios.post(this.mockURL, this.claim);
    await this.page.goto(postRequest.data.AuthorizeLocation);
  }

  async goToAsAThinFileUser() {
    this.claim.evidence_requested.strengthScore = 4;
    const postRequest = await this.axios.post(this.mockURL, this.claim);
    await this.page.goto(postRequest.data.AuthorizeLocation);
  }

  isRelyingPartyServer() {
    return new URL(this.page.url()).origin === "http://example.net";
  }

  hasSuccessQueryParams() {
    const { searchParams } = new URL(this.page.url());

    return (
      searchParams.get("client_id") === "standalone" &&
      searchParams.get("state") === "sT@t3" &&
      searchParams.get("code") === "FACEFEED"
    );
  }

  hasErrorQueryParams() {
    const { searchParams } = new URL(this.page.url());

    return (
      searchParams.get("error") === "server_error" &&
      searchParams.get("error_description") === "gateway"
    );
  }
};
