const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { FindBranch } = require("../pages");

  Given(/^the postcode entered is invalid$/, async function () {
    const findBranchInvalid = new FindBranch(await this.page);
  
    await findBranchInvalid.invalidPostCode();

  });


  When(/^the user clicks the continue button on the find Post Office branch invalid page$/, async function () {
    const findBranchInvalid = new FindBranch(await this.page);
  
    expect(await findBranchInvalid.isCurrentPage()).to.be.true;

    await findBranchInvalid.continue();
  
  });
  

  Then(/^they are shown an on screen error asking them to enter a valid postcode$/, async function () {
    const findBranchInvalid = new FindBranch(await this.page);

    expect(await findBranchInvalid.isCurrentPage()).to.be.true;

    expect(await findBranchInvalid.checkErrorText()).to.contain('There is a problem');
    
  });
