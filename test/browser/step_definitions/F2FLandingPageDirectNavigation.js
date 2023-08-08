const { Given, Then} = require("@cucumber/cucumber");

const { LandingPage } = require("../pages");
const { expect } = require("chai");
Given(/^the user navigates directly to prove-identity-post-office page$/, async function () {
    const landingPage = new LandingPage(this.page);
    await landingPage.goTo();

});

Then(/^the user sees an error message displayed on the prove-identity-post-office page$/, async function () {
    const landingPage = new LandingPage(await this.page);
    expect(await landingPage.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await landingPage.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);
        
});