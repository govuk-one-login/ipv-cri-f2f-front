const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { FindBranch } = require("../pages");

  Given(/^the postcode entry box is left empty$/, async function () {
    const findBranchEmpty = new FindBranch(await this.page);
  
    expect(await findBranchEmpty.isCurrentPage()).to.be.true;
  });


  When(/^the user clicks the continue button on the find Post Office branch empty page$/, async function () {
    const findBranchEmpty = new FindBranch(await this.page);
  
    expect(await findBranchEmpty.isCurrentPage()).to.be.true;

    await findBranchEmpty.continue();
  
  });
  

  Then(/^they are shown an on-screen error asking them to enter a valid postcode$/, async function () {
    const findBranchEmpty = new FindBranch(await this.page);

    expect(await findBranchEmpty.isCurrentPage()).to.be.true;

    const inlineError = 'There is a problem';

    const error = await findBranchEmpty.checkErrorText();
      
    expect(await error).to.equal(inlineError);
  });
