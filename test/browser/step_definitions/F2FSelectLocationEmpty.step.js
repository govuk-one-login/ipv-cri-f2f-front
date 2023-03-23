const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { PostOfficeLocationsEmpty } = require("../pages");

  Given(/^no Post Office branch is selected$/, async function () {
    const poLocations = new PostOfficeLocationsEmpty(await this.page);
  
    expect(await poLocations.isCurrentPage()).to.be.true;

  });


  When(/^the user clicks Continue$/, async function () {
    const poLocations = new PostOfficeLocationsEmpty(await this.page);
  
    expect(await poLocations.isCurrentPage()).to.be.true;

    await poLocations.continue();
  
  });
  

  Then(/^they are shown an on screen error asking them to select a branch$/, async function () {
    const poLocations = new PostOfficeLocationsEmpty(await this.page);

    expect(await poLocations.isCurrentPage()).to.be.true;

    const inlineError = 'There is a problem';

    const error = await poLocations.checkErrorText();
      
    expect(await error).to.equal(inlineError);

  });
