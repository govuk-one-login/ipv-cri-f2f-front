const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { EEAIdentityCardCountrySelectorPage, FindBranch } = require("../pages");

Given(/^the user is on the NI Card EEA Country Code Selection screen$/, async function () {
  const ctrySelector = new EEAIdentityCardCountrySelectorPage(await this.page);

  expect(await ctrySelector.isCurrentPage()).to.be.true;

});

When(/^the user selects an EEA country code$/, async function () {
  const euCtrySelector = new EEAIdentityCardCountrySelectorPage(await this.page);

  expect(await euCtrySelector.isCurrentPage()).to.be.true;

  await euCtrySelector.selectCountry();

  await euCtrySelector.continue();

});


Then(/^the user is routed from NI Card EEA Country to Branch Finder Screen$/, async function () {
  const findBranchValid = new FindBranch(await this.page);

  expect(await findBranchValid.isCurrentPage()).to.be.true;

 // await findBranchValid.continue();

});