const { Given, Then} = require("@cucumber/cucumber");

const { EuDrivingLicenceAddressCheck, EuDrivingLicenceDetailsPageValid,
    EuDrivingLicenceDetailsPageValidEdit, EuDrivingLicenceDetailsPageInvalidFuture,
    EuDrivingLicenceDetailsPageInvalidPast, EuDrivingLicenceCountrySelector,
    EuDrivingLicenceHasExpiryDatePage } = require("../pages");
const { expect } = require("chai");
Given(/^the user navigates directly to eu-driving-licence-current-address page$/, async function () {
    const euDrivingLicenceAddress = new EuDrivingLicenceAddressCheck(this.page);
    await euDrivingLicenceAddress.goTo();

});

Then(/^the user sees an error message displayed on the eu-driving-licence-current-address page$/, async function () {
    const euDrivingLicenceAddress = new EuDrivingLicenceAddressCheck(await this.page);
    expect(await euDrivingLicenceAddress.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await euDrivingLicenceAddress.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);
        
});

Given(/^the user navigates directly to select-country-eu-driving-licence page$/, async function () {
    const euDrivingLicenceCountrySelector = new EuDrivingLicenceCountrySelector(this.page);
    await euDrivingLicenceCountrySelector.goTo();

});

Then(/^the user sees an error message displayed on the select-country-eu-driving-licence page$/, async function () {
    const euDrivingLicenceCountrySelector = new EuDrivingLicenceCountrySelector(await this.page);
    expect(await euDrivingLicenceCountrySelector.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await euDrivingLicenceCountrySelector.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);
        
});

Given(/^the user navigates directly to eu-driving-licence-expire-invalidpast page$/, async function () {
    const euDrivingLicenceInvalidPast = new EuDrivingLicenceDetailsPageInvalidPast(this.page);
    await euDrivingLicenceInvalidPast.goTo();

});

Then(/^the user sees an error message displayed on the eu-driving-licence-expire-invalidpast page$/, async function () {
    const euDrivingLicenceInvalidPast = new EuDrivingLicenceDetailsPageInvalidPast(await this.page);
    expect(await euDrivingLicenceInvalidPast.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await euDrivingLicenceInvalidPast.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);
        
});

Given(/^the user navigates directly to eu-driving-licence-expire-invalidfuture page$/, async function () {
    const euDrivingLicenceInvalidFuture = new EuDrivingLicenceDetailsPageInvalidFuture(this.page);
    await euDrivingLicenceInvalidFuture.goTo();

});

Then(/^the user sees an error message displayed on the eu-driving-licence-expire-invalidfuture page$/, async function () {
    const euDrivingLicenceInvalidFuture = new EuDrivingLicenceDetailsPageInvalidFuture(await this.page);
    expect(await euDrivingLicenceInvalidFuture.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await euDrivingLicenceInvalidFuture.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);
        
});

Given(/^the user navigates directly to eu-driving-licence-expire page$/, async function () {
    const euDrivingLicenceValid = new EuDrivingLicenceDetailsPageValid(this.page);
    await euDrivingLicenceValid.goTo();

});

Then(/^the user sees an error message displayed on the eu-driving-licence-expire page$/, async function () {
    const euDrivingLicenceValid = new EuDrivingLicenceDetailsPageValid(await this.page);
    expect(await euDrivingLicenceValid.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await euDrivingLicenceValid.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);
        
});

Given(/^the user navigates directly to eu-driving-licence-expire-edit page$/, async function () {
    const euDrivingLicenceValidEdit = new EuDrivingLicenceDetailsPageValidEdit(this.page);
    await euDrivingLicenceValidEdit.goTo();

});

Then(/^the user sees an error message displayed on the eu-driving-licence-expire-edit page$/, async function () {
    const euDrivingLicenceValidEdit = new EuDrivingLicenceDetailsPageValidEdit(await this.page);
    expect(await euDrivingLicenceValidEdit.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await euDrivingLicenceValidEdit.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);
        
});

Given(/^the user navigates directly to eu-driving-licence-has-expiry-date page$/, async function () {
    const euDrivingLicenceHasExpiryPage = new EuDrivingLicenceHasExpiryDatePage(this.page);
    await euDrivingLicenceHasExpiryPage.goTo();

});

Then(/^the user sees an error message displayed on the eu-driving-licence-has-expiry-date page$/, async function () {
    const euDrivingLicenceHasExpiryPage = new EuDrivingLicenceHasExpiryDatePage(await this.page);
    expect(await euDrivingLicenceHasExpiryPage.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await euDrivingLicenceHasExpiryPage.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);
        
});