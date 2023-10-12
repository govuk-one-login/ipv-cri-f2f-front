const { Given, Then } = require("@cucumber/cucumber");

const { BRPDetailsPageInvalidFuture, BRPDetailsPageInvalidPast,
    BRPDetailsPageValid, ErrorPage } = require("../pages");
const { expect } = require("chai");

Given(/^the user navigates directly to brp-invalid-future-expiry page$/, async function () {
    const brpDetailsInvalidFuture = new BRPDetailsPageInvalidFuture(this.page);
    await brpDetailsInvalidFuture.goTo();

});

Then(/^the user sees an error message displayed on the brp-invalid-future-expiry page$/, async function () {
		const errorPage = new ErrorPage(await this.page);
		expect(await errorPage.isCurrentPage()).to.be.true;
		const redirectionError = await errorPage.getSomethingWentWrongMessage();
		const error = await errorPage.getErrorTitle();
		expect(await error).to.equal(redirectionError);

});

Given(/^the user navigates directly to brp-invalid-past-expiry page$/, async function () {
    const brpDetailsInvalidPast = new BRPDetailsPageInvalidPast(this.page);
    await brpDetailsInvalidPast.goTo();

});

Then(/^the user sees an error message displayed on the brp-invalid-past-expiry page$/, async function () {
		const errorPage = new ErrorPage(await this.page);
		expect(await errorPage.isCurrentPage()).to.be.true;
		const redirectionError = await errorPage.getSomethingWentWrongMessage();
		const error = await errorPage.getErrorTitle();
		expect(await error).to.equal(redirectionError);

});

Given(/^the user navigates directly to brp-valid page$/, async function () {
    const brpDetailsValid = new BRPDetailsPageValid(this.page);
    await brpDetailsValid.goTo();

});

Then(/^the user sees an error message displayed on the brp-valid page$/, async function () {
		const errorPage = new ErrorPage(await this.page);
		expect(await errorPage.isCurrentPage()).to.be.true;
		const redirectionError = await errorPage.getSomethingWentWrongMessage();
		const error = await errorPage.getErrorTitle();
		expect(await error).to.equal(redirectionError);

});