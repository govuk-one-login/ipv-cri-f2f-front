const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {EeaIdentityCardHasExpiryDatePage } = require("../pages");
  

  Given(/^the user clicks the continue button only on the EEAIdentityCardHasExpiryDatePage$/, async function () {
    const eeaIdentityCardHasExpiryDatePage = new EeaIdentityCardHasExpiryDatePage(await this.page);
  
    await eeaIdentityCardHasExpiryDatePage.continue();
   });
  
   Then(/^the user sees an inline error message displayed on the EEAIdentityCardHasExpiryDatePage$/, async function () {
    const eeaIdentityCardHasExpiryDatePage = new EeaIdentityCardHasExpiryDatePage(await this.page);
   
    expect (await eeaIdentityCardHasExpiryDatePage.isCurrentPage()).to.be.true;
     
    const inlineError = 'There is a problem';

    const inlineErrorBody = 'validation.default';
   
    const error = await eeaIdentityCardHasExpiryDatePage.checkErrorText();
      
    expect(await error).to.equal(inlineError);
  
    const errorBody = await eeaIdentityCardHasExpiryDatePage.checkErrorBodyText();
  
    expect(await errorBody).to.equal(inlineErrorBody);
       
  });
  