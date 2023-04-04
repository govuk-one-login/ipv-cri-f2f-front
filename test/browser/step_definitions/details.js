const { Given, Then, When } = require("@cucumber/cucumber");

const { RelyingPartyPage, FindBranch } = require("../pages");

const { expect } = require("chai");

Given(/^([A-Za-z ])+is using the system$/, async function (name) {
  this.user = this.allUsers[name];
  const rpPage = new RelyingPartyPage(this.page);

  await rpPage.goto();
});

When("they have provided their details",{
  timeout: 10 * 1000 },
  async function () {}
);

Then("they should be redirected to the Find a Branch page", async function () {
  const findBranchValid = new FindBranch(await this.page);

  expect(await findBranchValid.isCurrentPage()).to.be.true;
});


Then("they should be redirected as an error", function () {
  const rpPage = new RelyingPartyPage(this.page);

  expect(rpPage.isRelyingPartyServer()).to.be.true;

  expect(rpPage.hasErrorQueryParams()).to.be.true;
});