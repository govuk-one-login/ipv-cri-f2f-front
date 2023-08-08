const { Given, Then} = require("@cucumber/cucumber");

const { PassportDetailsPageValid, PassportDetailsPageValidEdit,
      PassportDetailsPageInvalidFuture, PassportDetailsPageInvalidPast } = require("../pages");
const { expect } = require("chai");

Given(/^the user navigates directly to uk-passport-expire page$/, async function () {
    const passportDetailsPageValid = new PassportDetailsPageValid(this.page);
    await passportDetailsPageValid.goTo();

});

Then(/^the user sees an error message displayed on the uk-passport-expire page$/, async function () {
      const passportDetailsPageValid = new PassportDetailsPageValid(await this.page);
      expect(await passportDetailsPageValid.isCurrentPage()).to.be.true;
      const redirectionError = 'Sorry, there is a problem with the service';
      const error = await passportDetailsPageValid.checkRedirectionErrorText();
      expect(await error).to.equal(redirectionError);
        
});

Given(/^the user navigates directly to uk-passport-expire-invalidpast page$/, async function () {
      const passportDetailsPageInvalidPast = new PassportDetailsPageInvalidPast(this.page);
      await passportDetailsPageInvalidPast.goTo();
  
  });
  
  Then(/^the user sees an error message displayed on the uk-passport-expire-invalidpast page$/, async function () {
        const passportDetailsPageInvalidPast = new PassportDetailsPageInvalidPast(await this.page);
        expect(await passportDetailsPageInvalidPast.isCurrentPage()).to.be.true;
        const redirectionError = 'Sorry, there is a problem with the service';
        const error = await passportDetailsPageInvalidPast.checkRedirectionErrorText();
        expect(await error).to.equal(redirectionError);
          
  });

  Given(/^the user navigates directly to uk-passport-expire-invalidfuture page$/, async function () {
      const passportDetailsPageInvalidFuture = new PassportDetailsPageInvalidFuture(this.page);
      await passportDetailsPageInvalidFuture.goTo();
  
  });
  
  Then(/^the user sees an error message displayed on the uk-passport-expire-invalidfuture page$/, async function () {
        const passportDetailsPageInvalidFuture = new PassportDetailsPageInvalidFuture(await this.page);
        expect(await passportDetailsPageInvalidFuture.isCurrentPage()).to.be.true;
        const redirectionError = 'Sorry, there is a problem with the service';
        const error = await passportDetailsPageInvalidFuture.checkRedirectionErrorText();
        expect(await error).to.equal(redirectionError);
          
  });

  Given(/^the user navigates directly to uk-passport-expire-edit page$/, async function () {
      const passportDetailsPageValidEdit = new PassportDetailsPageValidEdit(this.page);
      await passportDetailsPageValidEdit.goTo();
  
  });
  
  Then(/^the user sees an error message displayed on the uk-passport-expire-edit page$/, async function () {
        const passportDetailsPageValidEdit = new PassportDetailsPageValidEdit(await this.page);
        expect(await passportDetailsPageValidEdit.isCurrentPage()).to.be.true;
        const redirectionError = 'Sorry, there is a problem with the service';
        const error = await passportDetailsPageValidEdit.checkRedirectionErrorText();
        expect(await error).to.equal(redirectionError);
          
  });
