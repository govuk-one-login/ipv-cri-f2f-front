const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { PostOfficeLocations, FindBranch } = require("../pages");

  // Given(/^the user wants to change their postcode$/, async function () {
  //   const poLocations = new PostOfficeLocations(await this.page);
  
  //   expect(await poLocations.isCurrentPage()).to.be.true;

  // });

  Given(/^the user is on the Locations Page and wants to change their postcode$/, async function () {
    const poLocations = new PostOfficeLocations(await this.page);
  
    expect(await poLocations.isCurrentPage()).to.be.true;

  });


  When(/^the user clicks the Back button$/, async function () {
    const poLocations = new PostOfficeLocations(await this.page);
    
    expect(await poLocations.isCurrentPage()).to.be.true;

    await poLocations.back();
  
  });
  
  When(/^the user Changes the postcode$/, async function () {
    const poLocations = new PostOfficeLocations(await this.page);
    
    expect(await poLocations.isCurrentPage()).to.be.true;

    await poLocations.changePostcode();
  
  });

  Then(/^the user is navigated back to the Find Branch page$/, async function () {
    const findBranch = new FindBranch(await this.page);

    expect(await findBranch.isCurrentPage()).to.be.true;

  });

  Then(/^the user enters another postcode and is navigated back to the list of nearest POs$/, async function () {
    const findBranch = new FindBranch(await this.page);
    const poLocations = new PostOfficeLocations(await this.page);

    await findBranch.postCodeChange();

    await findBranch.continue();

    expect(await poLocations.isCurrentPage()).to.be.true;

  });
