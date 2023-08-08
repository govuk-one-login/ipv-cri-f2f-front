const { Given, Then} = require("@cucumber/cucumber");

const { NonPassportDetailsPageValidEdit, NonUKPassportDetailsPageValid,
    NonUKPassportDetailsPageInvalidFuture, NonUKPassportDetailsPageInvalidPast,
    NonUKPassportCountrySelector, NonUkPassportHasExpiryDatePage } = require("../pages");
const { expect } = require("chai");

Given(/^the user navigates directly to select-country-non-uk-passport page$/, async function () {
    const nonUKPassportCountrySelectorPage = new NonUKPassportCountrySelector(this.page);
    await nonUKPassportCountrySelectorPage.goTo();

});

Then(/^the user sees an error message displayed on the select-country-non-uk-passport page$/, async function () {
    const nonUKPassportCountrySelectorPage = new NonUKPassportCountrySelector(await this.page);
    expect(await nonUKPassportCountrySelectorPage.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await nonUKPassportCountrySelectorPage.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);
        
});

Given(/^the user navigates directly to non-uk-passport-expire-invalidpast page$/, async function () {
    const nonUKPassportInvalidPastPage = new NonUKPassportDetailsPageInvalidPast(this.page);
    await nonUKPassportInvalidPastPage.goTo();

});

Then(/^the user sees an error message displayed on the non-uk-passport-expire-invalidpast page$/, async function () {
    const nonUKPassportInvalidPastPage = new NonUKPassportDetailsPageInvalidPast(await this.page);
    expect(await nonUKPassportInvalidPastPage.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await nonUKPassportInvalidPastPage.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);

});

Given(/^the user navigates directly to non-uk-passport-expire-invalidfuture page$/, async function () {
    const nonUKPassportInvalidFuturePage = new NonUKPassportDetailsPageInvalidFuture(this.page);
    await nonUKPassportInvalidFuturePage.goTo();

});

Then(/^the user sees an error message displayed on the non-uk-passport-expire-invalidfuture page$/, async function () {
    const nonUKPassportInvalidFuturePage = new NonUKPassportDetailsPageInvalidFuture(await this.page);
    expect(await nonUKPassportInvalidFuturePage.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await nonUKPassportInvalidFuturePage.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);
    
});

Given(/^the user navigates directly to non-uk-passport-expire page$/, async function () {
    const nonUKPassportDetailsPageValid = new NonUKPassportDetailsPageValid(this.page);
    await nonUKPassportDetailsPageValid.goTo();

});

Then(/^the user sees an error message displayed on the non-uk-passport-expire page$/, async function () {
    const nonUKPassportDetailsPageValid = new NonUKPassportDetailsPageValid(await this.page);
    expect(await nonUKPassportDetailsPageValid.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await nonUKPassportDetailsPageValid.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);
    
});

Given(/^the user navigates directly to non-uk-passport-expire-edit page$/, async function () {
    const nonUKPassportDetailsPageValidEdit = new NonPassportDetailsPageValidEdit(this.page);
    await nonUKPassportDetailsPageValidEdit.goTo();

});

Then(/^the user sees an error message displayed on the non-uk-passport-expire-edit page$/, async function () {
    const nonUKPassportDetailsPageValidEdit = new NonPassportDetailsPageValidEdit(await this.page);
    expect(await nonUKPassportDetailsPageValidEdit.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await nonUKPassportDetailsPageValidEdit.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);
    
});

Given(/^the user navigates directly to non-uk-passport-has-expiry-date page$/, async function () {
    const nonUKPassportExpiryDatePage = new NonUkPassportHasExpiryDatePage(this.page);
    await nonUKPassportExpiryDatePage.goTo();

});

Then(/^the user sees an error message displayed on the non-uk-passport-has-expiry-date page$/, async function () {
    const nonUKPassportExpiryDatePage = new NonUkPassportHasExpiryDatePage(await this.page);
    expect(await nonUKPassportExpiryDatePage.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await nonUKPassportExpiryDatePage.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);
    
});