const { Given, Then} = require("@cucumber/cucumber");

const { PhotoDlDetailsPageValid, PhotoDlDetailsPageInvalidFuture,
    PhotoDlDetailsPageInvalidPast, PhotoDlAddressCheckPage } = require("../pages");
const { expect } = require("chai");

Given(/^the user navigates directly to uk-driving-licence-expire page$/, async function () {
    const photoDLDetailsPageValid = new PhotoDlDetailsPageValid(this.page);
    await photoDLDetailsPageValid.goTo();

});

Then(/^the user sees an error message displayed on the uk-driving-licence-expire page$/, async function () {
      const photoDLDetailsPageValid = new PhotoDlDetailsPageValid(await this.page);
      expect(await photoDLDetailsPageValid.isCurrentPage()).to.be.true;
      const redirectionError = 'Sorry, there is a problem with the service';
      const error = await photoDLDetailsPageValid.checkRedirectionErrorText();
      expect(await error).to.equal(redirectionError);
        
});

Given(/^the user navigates directly to uk-driving-licence-expire-invalidpast page$/, async function () {
    const photoDLDetailsPageInvalidPast = new PhotoDlDetailsPageInvalidPast(this.page);
    await photoDLDetailsPageInvalidPast.goTo();

});

Then(/^the user sees an error message displayed on the uk-driving-licence-expire-invalidpast page$/, async function () {
      const photoDLDetailsPageInvalidPast = new PhotoDlDetailsPageInvalidPast(await this.page);
      expect(await photoDLDetailsPageInvalidPast.isCurrentPage()).to.be.true;
      const redirectionError = 'Sorry, there is a problem with the service';
      const error = await photoDLDetailsPageInvalidPast.checkRedirectionErrorText();
      expect(await error).to.equal(redirectionError);
        
});

Given(/^the user navigates directly to uk-driving-licence-expire-invalidfuture page$/, async function () {
    const photoDLDetailsPageInvalidFuture = new PhotoDlDetailsPageInvalidFuture(this.page);
    await photoDLDetailsPageInvalidFuture.goTo();

});

Then(/^the user sees an error message displayed on the uk-driving-licence-expire-invalidfuture page$/, async function () {
      const photoDLDetailsPageInvalidFuture = new PhotoDlDetailsPageInvalidFuture(await this.page);
      expect(await photoDLDetailsPageInvalidFuture.isCurrentPage()).to.be.true;
      const redirectionError = 'Sorry, there is a problem with the service';
      const error = await photoDLDetailsPageInvalidFuture.checkRedirectionErrorText();
      expect(await error).to.equal(redirectionError);
        
});

Given(/^the user navigates directly to uk-driving-licence-current-address page$/, async function () {
    const photoDLAddressCheckPage = new PhotoDlAddressCheckPage(this.page);
    await photoDLAddressCheckPage.goTo();

});

Then(/^the user sees an error message displayed on the uk-driving-licence-current-address page$/, async function () {
      const photoDLAddressCheckPage = new PhotoDlAddressCheckPage(await this.page);
      expect(await photoDLAddressCheckPage.isCurrentPage()).to.be.true;
      const redirectionError = 'Sorry, there is a problem with the service';
      const error = await photoDLAddressCheckPage.checkRedirectionErrorText();
      expect(await error).to.equal(redirectionError);
        
});