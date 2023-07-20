module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }
  
  async goto() {  
    const axios = require("axios");
    const claim = require("../support/shared_claim")    
    const postRequest = await axios.post("https://ipvstub.review-o.build.account.gov.uk/start", claim);    
		const url = postRequest.data.AuthorizeLocation;
		if (url.includes("www")) {
			this.startingUrl = url 
		} else {
			const splitUrl = url.split("https://");
    	this.startingUrl = "https://" + "www." + splitUrl[1];
		}

    await this.page.goto(this.startingUrl);
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
