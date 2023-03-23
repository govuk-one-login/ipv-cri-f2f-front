const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { FindBranchInvalid } = require("../pages");

  Given(/^the postcode entry box is left empty$/, async function () {
    const findBranchInvalid = new FindBranchInvalid(await this.page);
  
    await findBranchInvalid.postCode();

  });


  When(/^the user clicks the continue button on the find Post Office branch empty page$/, async function () {
    const findBranchInvalid = new FindBranchInvalid(await this.page);
  
    expect(await findBranchInvalid.isCurrentPage()).to.be.true;

    await findBranchInvalid.continue();
  
  });
  

  Then(/^they are shown an on screen error asking them to enter a valid postcode$/, async function () {
    const findBranchInvalid = new FindBranchInvalid(await this.page);

    expect(await findBranchInvalid.isCurrentPage()).to.be.true;

    const inlineError = 'There is a problem';

    const error = await findBranchInvalid.checkErrorText();
      
    expect(await error).to.equal(inlineError);
  });
