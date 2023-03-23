const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { PostOfficeLocations, Done } = require("../pages");

  Given(/^a Post Office branch is selected$/, async function () {
    const poLocations = new PostOfficeLocations(await this.page);
  
    await poLocations.firstChoice();

  });


  When(/^the user clicks continue$/, async function () {
    const poLocations = new PostOfficeLocations(await this.page);
  
    expect(await poLocations.isCurrentPage()).to.be.true;

    await poLocations.continue();
  
  });
  

  Then(/^the user is navigated to the next step in the journey - Confirm Answer$/, async function () {
    const confirmAnswers = new Done(await this.page);

    expect(await confirmAnswers.isCurrentPage()).to.be.true;

  });
