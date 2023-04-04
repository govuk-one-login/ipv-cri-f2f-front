const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { FindBranch, PostOfficeLocations } = require("../pages");

  Given(/^the postcode entered is valid$/, async function () {
    const findBranchValid = new FindBranch(await this.page);
  
    await findBranchValid.postCode();

  });


  When(/^the user clicks the continue button on the find Post Office branch page$/, async function () {
    const findBranchValid = new FindBranch(await this.page);
  
    expect(await findBranchValid.isCurrentPage()).to.be.true;

    await findBranchValid.continue();
  
  });
  

  Then(/^the user is routed to the Select Location page showing 5 nearest POs$/, async function () {
    const poLocations = new PostOfficeLocations(await this.page);

    expect(await poLocations.isCurrentPage()).to.be.true;

  });
