const { Given, Then } = require("@cucumber/cucumber");

const { NonPassportDetailsPageValidEdit, NonUKPassportDetailsPageValid,
    NonUKPassportDetailsPageInvalidFuture, NonUKPassportDetailsPageInvalidPast,
    NonUKPassportCountrySelector, NonUkPassportHasExpiryDatePage, ErrorPage } = require("../pages");
const { expect } = require("chai");

Given(/^the user navigates directly to select-country-non-uk-passport page$/, async function () {
    const nonUKPassportCountrySelectorPage = new NonUKPassportCountrySelector(this.page);
    await nonUKPassportCountrySelectorPage.goTo();

});

Then(/^the user sees an error message displayed on the select-country-non-uk-passport page$/, async function () {
		const errorPage = new ErrorPage(await this.page);
		expect(await errorPage.isCurrentPage()).to.be.true;
		const redirectionError = await errorPage.getSomethingWentWrongMessage();
		const error = await errorPage.getErrorTitle();
		expect(await error).to.equal(redirectionError);

});

Given(/^the user navigates directly to non-uk-passport-expire-invalidpast page$/, async function () {
    const nonUKPassportInvalidPastPage = new NonUKPassportDetailsPageInvalidPast(this.page);
    await nonUKPassportInvalidPastPage.goTo();

});

Then(/^the user sees an error message displayed on the non-uk-passport-expire-invalidpast page$/, async function () {
		const errorPage = new ErrorPage(await this.page);
		expect(await errorPage.isCurrentPage()).to.be.true;
		const redirectionError = await errorPage.getSomethingWentWrongMessage();
		const error = await errorPage.getErrorTitle();
		expect(await error).to.equal(redirectionError);

});

Given(/^the user navigates directly to non-uk-passport-expire-invalidfuture page$/, async function () {
    const nonUKPassportInvalidFuturePage = new NonUKPassportDetailsPageInvalidFuture(this.page);
    await nonUKPassportInvalidFuturePage.goTo();

});

Then(/^the user sees an error message displayed on the non-uk-passport-expire-invalidfuture page$/, async function () {
		const errorPage = new ErrorPage(await this.page);
		expect(await errorPage.isCurrentPage()).to.be.true;
		const redirectionError = await errorPage.getSomethingWentWrongMessage();
		const error = await errorPage.getErrorTitle();
		expect(await error).to.equal(redirectionError);

});

Given(/^the user navigates directly to non-uk-passport-expire page$/, async function () {
    const nonUKPassportDetailsPageValid = new NonUKPassportDetailsPageValid(this.page);
    await nonUKPassportDetailsPageValid.goTo();

});

Then(/^the user sees an error message displayed on the non-uk-passport-expire page$/, async function () {
		const errorPage = new ErrorPage(await this.page);
		expect(await errorPage.isCurrentPage()).to.be.true;
		const redirectionError = await errorPage.getSomethingWentWrongMessage();
		const error = await errorPage.getErrorTitle();
		expect(await error).to.equal(redirectionError);

});

Given(/^the user navigates directly to non-uk-passport-expire-edit page$/, async function () {
    const nonUKPassportDetailsPageValidEdit = new NonPassportDetailsPageValidEdit(this.page);
    await nonUKPassportDetailsPageValidEdit.goTo();

});

Then(/^the user sees an error message displayed on the non-uk-passport-expire-edit page$/, async function () {
		const errorPage = new ErrorPage(await this.page);
		expect(await errorPage.isCurrentPage()).to.be.true;
		const redirectionError = await errorPage.getSomethingWentWrongMessage();
		const error = await errorPage.getErrorTitle();
		expect(await error).to.equal(redirectionError);

});

Given(/^the user navigates directly to non-uk-passport-expiry-date page$/, async function () {
    const nonUKPassportExpiryDatePage = new NonUkPassportHasExpiryDatePage(this.page);
    await nonUKPassportExpiryDatePage.goTo();

});

Then(/^the user sees an error message displayed on the non-uk-passport-expiry-date page$/, async function () {
		const errorPage = new ErrorPage(await this.page);
		expect(await errorPage.isCurrentPage()).to.be.true;
		const redirectionError = await errorPage.getSomethingWentWrongMessage();
		const error = await errorPage.getErrorTitle();
		expect(await error).to.equal(redirectionError);

});