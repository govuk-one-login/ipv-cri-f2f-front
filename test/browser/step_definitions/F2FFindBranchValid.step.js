const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { FindBranch, PostOfficeLocations, PhotoDlAddressCheckPage } = require("../pages");

  Given(/^the postcode entered is valid$/, async function () {
    const findBranchValid = new FindBranch(await this.page);
  
    await findBranchValid.postCode();

  });

  When(/^the user clicks the FindBranch Back button$/, async function () {
    const findBranchValid = new FindBranch(await this.page);
  
    await findBranchValid.back();
  });
  

  When(/^the user clicks the continue button on the find Post Office branch page$/, async function () {
    const findBranchValid = new FindBranch(await this.page);
  
    expect(await findBranchValid.isCurrentPage()).to.be.true;

    await findBranchValid.continue();
  
  });
  

  Then(/^the user is routed to the Select Location page showing 5 nearest POs$/, async function () {
    const poLocations = new PostOfficeLocations(await this.page);
    
    const locationCount = await poLocations.numberOfLocations();
    //console.log(">>Location number is: ", locationCount);
  
    expect(await poLocations.isCurrentPage()).to.be.true;

    expect(await poLocations.numberOfLocations()).to.equal(locationCount);
  

  });


  // Then(/^the user clicks the back button on the UKPhotoDL Page$/, async function () {
  //   const ukPhotoDl = new PhotoDlDetailsPageValid(await this.page);
  
  //   expect(await ukPhotoDl.isCurrentPage()).to.be.true;
  
  // });


  Then(/^the user is navigated back to the UK DL Address Check screen$/, async function () {
    const phototDlAddress = new PhotoDlAddressCheckPage(await this.page);
  
    expect(await phototDlAddress.isCurrentPage()).to.be.true;
  
  });