const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {EuDrivingLicenceHasExpiryDatePage } = require("../pages");
  

  Given(/^the user clicks the continue button only on the EuDrivingLicenceHasExpiryDatePage$/, async function () {
    const euDrivingLicenceHasExpiryDatePage = new EuDrivingLicenceHasExpiryDatePage(await this.page);
  
    await euDrivingLicenceHasExpiryDatePage.continue();
   });
  
   Then(/^the user sees an inline error message displayed on the EuDrivingLicenceHasExpiryDatePage$/, async function () {
    const euDrivingLicenceHasExpiryDatePage = new EuDrivingLicenceHasExpiryDatePage(await this.page);
   
    expect (await euDrivingLicenceHasExpiryDatePage.isCurrentPage()).to.be.true;
     
    const inlineError = 'There is a problem';

    const inlineErrorBody = 'validation.default';
   
    const error = await euDrivingLicenceHasExpiryDatePage.checkErrorText();
      
    expect(await error).to.equal(inlineError);
  
    const errorBody = await euDrivingLicenceHasExpiryDatePage.checkErrorBodyText();
  
    expect(await errorBody).to.equal(inlineErrorBody);
       
  });
  