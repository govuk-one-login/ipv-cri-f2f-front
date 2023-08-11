const { Given, Then } = require("@cucumber/cucumber");

const { EeaIdentityCardHasExpiryDatePage, EEAIdentityCardAddressCheck, EEAIdentityCardCountrySelectorPage,
    EEAIdentityCardDetailsPageValid, EEAIdentityCardDetailsPageInvalidPast,
    EEAIdentityCardDetailsPageInvalidFuture, EEAIdentityCardAddressCheckEdit,
    EEAIdentityCardCountrySelectorPageEdit } = require("../pages");
const { expect } = require("chai");

Given(/^the user navigates directly to national-identity-card-has-expiry-date page$/, async function () {
    const eeaExpiryDatePage = new EeaIdentityCardHasExpiryDatePage(this.page);
    await eeaExpiryDatePage.goTo();

});

Then(/^the user sees an error message displayed on the national-identity-card-has-expiry-date page$/, async function () {
    const eeaExpiryDatePage = new EeaIdentityCardHasExpiryDatePage(await this.page);
    expect(await eeaExpiryDatePage.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await eeaExpiryDatePage.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);

});

Given(/^the user navigates directly to select-country-national-identity-card page$/, async function () {
    const eeaCountrySelectPage = new EEAIdentityCardCountrySelectorPage(this.page);
    await eeaCountrySelectPage.goTo();

});

Then(/^the user sees an error message displayed on the select-country-national-identity-card page$/, async function () {
    const eeaCountrySelectPage = new EEAIdentityCardCountrySelectorPage(await this.page);
    expect(await eeaCountrySelectPage.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await eeaCountrySelectPage.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);

});


Given(/^the user navigates directly to national-identity-card-current-address page$/, async function () {
    const eeaAddressCheckPage = new EEAIdentityCardAddressCheck(this.page);
    await eeaAddressCheckPage.goTo();

});

Then(/^the user sees an error message displayed on the national-identity-card-current-address page$/, async function () {
    const eeaAddressCheckPage = new EEAIdentityCardAddressCheck(await this.page);
    expect(await eeaAddressCheckPage.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await eeaAddressCheckPage.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);

});

Given(/^the user navigates directly to national-identity-card-expire-invalidpast page$/, async function () {
    const eeaCardDetailsInvalidPast = new EEAIdentityCardDetailsPageInvalidPast(this.page);
    await eeaCardDetailsInvalidPast.goTo();

});

Then(/^the user sees an error message displayed on the national-identity-card-expire-invalidpast page$/, async function () {
    const eeaCardDetailsInvalidPast = new EEAIdentityCardDetailsPageInvalidPast(await this.page);
    expect(await eeaCardDetailsInvalidPast.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await eeaCardDetailsInvalidPast.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);

});

Given(/^the user navigates directly to national-identity-card-expire-invalidfuture page$/, async function () {
    const eeaCardDetailsInvalidFuture = new EEAIdentityCardDetailsPageInvalidFuture(this.page);
    await eeaCardDetailsInvalidFuture.goTo();

});

Then(/^the user sees an error message displayed on the national-identity-card-expire-invalidfuture page$/, async function () {
    const eeaCardDetailsInvalidFuture = new EEAIdentityCardDetailsPageInvalidFuture(await this.page);
    expect(await eeaCardDetailsInvalidFuture.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await eeaCardDetailsInvalidFuture.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);

});

Given(/^the user navigates directly to national-identity-card-expire page$/, async function () {
    const eeaCardDetailsValid = new EEAIdentityCardDetailsPageValid(this.page);
    await eeaCardDetailsValid.goTo();

});

Then(/^the user sees an error message displayed on the national-identity-card-expire page$/, async function () {
    const eeaCardDetailsValid = new EEAIdentityCardDetailsPageValid(await this.page);
    expect(await eeaCardDetailsValid.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await eeaCardDetailsValid.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);

});

Given(/^the user navigates directly to eu-driving-licence-current-address-edit page$/, async function () {
    const eeaAddressCheckEditPage = new EEAIdentityCardAddressCheckEdit(this.page);
    await eeaAddressCheckEditPage.goTo();

});

Then(/^the user sees an error message displayed on the eu-driving-licence-current-address-edit page$/, async function () {
    const eeaAddressCheckEditPage = new EEAIdentityCardAddressCheckEdit(await this.page);
    expect(await eeaAddressCheckEditPage.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await eeaAddressCheckEditPage.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);

});

Given(/^the user navigates directly to euDrivingLicenceCountrySelector-edit page$/, async function () {
    const eeaCountrySelectorEditPage = new EEAIdentityCardCountrySelectorPageEdit(this.page);
    await eeaCountrySelectorEditPage.goTo();

});

Then(/^the user sees an error message displayed on the euDrivingLicenceCountrySelector-edit page$/, async function () {
    const eeaCountrySelectorEditPage = new EEAIdentityCardCountrySelectorPageEdit(await this.page);
    expect(await eeaCountrySelectorEditPage.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await eeaCountrySelectorEditPage.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);

});