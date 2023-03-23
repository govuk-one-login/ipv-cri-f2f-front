const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { LandingPage, FindBranchValid} = require("../pages");


Given(/^the user wants to progress to the next step of the journey$/, async function () {
  const landingPage = new LandingPage(await this.page);

  expect(await landingPage.isCurrentPage()).to.be.true;
 
});

When(/^the user clicks the continue button on the LandingPage$/, async function () {
  const landingPage = new LandingPage(await this.page);

  await landingPage.continue();

});


Then(/^the user is routed to the next screen in the journey - Find Branch$/, async function () {
  const findBranchValid = new FindBranchValid(await this.page);

  expect(await findBranchValid.isCurrentPage()).to.be.true;


});
