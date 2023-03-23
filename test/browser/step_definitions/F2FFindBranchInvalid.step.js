const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { FindBranchInvalid } = require("../pages");

  Given(/^the postcode entered is invalid$/, async function () {
    const findBranchInvalid = new FindBranchInvalid(await this.page);
  
    await findBranchInvalid.postCode();

  });


  When(/^the user clicks the continue button on the find Post Office branch invalid page$/, async function () {
    const findBranchInvalid = new FindBranchInvalid(await this.page);
  
    expect(await findBranchInvalid.isCurrentPage()).to.be.true;

    await findBranchInvalid.continue();
  
  });
  

  Then(/^they are shown an on screen error informing them to enter a valid postcode$/, async function () {
    const findBranchInvalid = new FindBranchInvalid(await this.page);

    expect(await findBranchInvalid.isCurrentPage()).to.be.true;

    const inlineError = 'There is a problem';

    const error = await findBranchInvalid.checkErrorText();
      
    expect(await error).to.equal(inlineError);
  });
