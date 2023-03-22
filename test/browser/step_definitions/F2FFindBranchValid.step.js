const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { FindBranchValid, PostOfficeLocations } = require("../pages");

  Given(/^the postcode entered is valid$/, async function () {
    const findBranchValid = new FindBranchValid(await this.page);
  
    await findBranchValid.postCode();

  });


  When(/^the user clicks the continue button on the find Post Office branch page$/, async function () {
    const findBranchValid = new FindBranchValid(await this.page);
  
    expect(await findBranchValid.isCurrentPage()).to.be.true;

    await findBranchValid.continue();
  
  });
  

  Then(/^the user is routed to the next screen in the journey - Select Location$/, async function () {
    const poLocations = new PostOfficeLocations(await this.page);

    expect(await poLocations.isCurrentPage()).to.be.true;

  });
