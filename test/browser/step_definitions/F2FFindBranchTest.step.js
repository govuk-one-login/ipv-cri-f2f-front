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
    
  
    expect(await poLocations.isCurrentPage()).to.be.true;

    expect(await poLocations.numberOfLocations()).to.equal(locationCount);
  

  });


  Then(/^the user is navigated back to the UK DL Address Check screen$/, async function () {
    const phototDlAddress = new PhotoDlAddressCheckPage(await this.page);
  
    expect(await phototDlAddress.isCurrentPage()).to.be.true;
  
  });

  //Invalid Checks

//Find Branch Empty  
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

  expect(await findBranchEmpty.checkErrorText()).to.contain('There is a problem');

});

//Find Branch Invalid
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

//Find Branch Partial
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