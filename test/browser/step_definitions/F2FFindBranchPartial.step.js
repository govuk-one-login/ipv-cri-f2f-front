const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { FindBranch } = require("../pages");

  Given(/^a partial postcode is entered$/, async function () {
    const findBranchPartial = new FindBranch(await this.page);
  
    await findBranchPartial.partialPostCode();

  });


  When(/^the user clicks the continue button on the find Post Office branch partial page$/, async function () {
    const findBranchPartial = new FindBranch(await this.page);
  
    expect(await findBranchPartial.isCurrentPage()).to.be.true;

    await findBranchPartial.continue();
  
  });
  

  Then(/^they are then shown an on screen error asking them to enter a valid postcode$/, async function () {
    const findBranchPartial = new FindBranch(await this.page);

    expect(await findBranchPartial.isCurrentPage()).to.be.true;

    expect(await findBranchPartial.checkErrorText()).to.contain('There is a problem');
    
  });
