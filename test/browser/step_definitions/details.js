const { Given, Then, When } = require("@cucumber/cucumber");

const { RelyingPartyPage, FindBranch, LandingPage, CheckDetails } = require("../pages");

const { expect } = require("chai");

Given(/^([A-Za-z ])+is using the system$/, { timeout: 2 * 50000 }, async function (name) {
  require('dotenv').config();

  this.user = this.allUsers[name];
  const rpPage = new RelyingPartyPage(this.page);

  await rpPage.goto();
});

When("they have provided their details",{
  timeout: 10 * 1000 },
  async function () {}
);

Then("they should be redirected to the Landing Page", async function () {
  const landingPage = new LandingPage(await this.page);

  expect(await landingPage.isCurrentPage()).to.be.true;
});

Then("they should be redirected to the Find a Branch page", async function () {
  const findBranchValid = new FindBranch(await this.page);

  expect(await findBranchValid.isCurrentPage()).to.be.true;
});


Then("they should be redirected as an error", function () {
  const rpPage = new RelyingPartyPage(this.page);

  expect(rpPage.isRelyingPartyServer()).to.be.true;

  expect(rpPage.hasErrorQueryParams()).to.be.true;
});


When(/^the user clicks the Check My Answers Submit button$/, async function () {
  const cmPage = new CheckDetails(await this.page);

  await cmPage.continue();

  this.state = await cmPage.setSessionState();
  this.authCode = await cmPage.setAuthCode();

})
