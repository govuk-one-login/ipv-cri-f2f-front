const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { PostOfficeLocations, FindBranchValid } = require("../pages");

  Given(/^the user wants to change their postcode$/, async function () {
    const poLocations = new PostOfficeLocations(await this.page);
  
    expect(await poLocations.isCurrentPage()).to.be.true;

  });


  When(/^the user clicks the Change button$/, async function () {
    const poLocations = new PostOfficeLocations(await this.page);
  
    expect(await poLocations.isCurrentPage()).to.be.true;

    await poLocations.changePostcode();
  
  });
  

  Then(/^the user is navigated back to the Find Branch page$/, async function () {
    const findBranch = new FindBranchValid(await this.page);

    expect(await findBranch.isCurrentPage()).to.be.true;

  });
