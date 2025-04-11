const { Given, Then, When } = require("@cucumber/cucumber");

const {
  RelyingPartyPage,
  FindBranch,
  LandingPage,
  CheckDetails,
} = require("../pages");

const { expect } = require("chai");

Given(
  /^([^"]*) is using the system$/,
  { timeout: 2 * 5000 },
  async function (name) {
    const claim = this.allUserClaims[name];
    const rpPage = new RelyingPartyPage(this.page);

    await rpPage.goto(claim);
  }
);

When(
  "they have provided their details",
  {
    timeout: 10 * 1000,
  },
  async function () {}
);

Then("they should be redirected to the Landing Page", async function () {
  const landingPage = new LandingPage(await this.page);

  expect(await landingPage.isCurrentPage()).to.be.true;
});

Then(
  "the user should see they have 15 days to visit the Post Office",
  async function () {
    const landingPage = new LandingPage(await this.page);

    expect(await landingPage.getPostOfficeNumberOfDays()).to.contain("15 days");
  }
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

When(/^the user clicks the Check My Answers Submit button$/, async function () {
  const cmPage = new CheckDetails(await this.page);

  await cmPage.continue();

  this.state = await cmPage.setSessionState();
  this.authCode = await cmPage.setAuthCode();
});

Then("the language toggle is present on the screen", async function () {
  const landingPage = new LandingPage(await this.page);
  await landingPage.languageTogglePresent();
});

Then(
  "The HTML Language Attribute is set to {string}",
  async function (languageAttribute) {
    const landingPage = new LandingPage(await this.page);
    expect(await landingPage.returnLanguageAttribute()).to.equal(
      languageAttribute
    );
  }
);

When("the user switches language to {string}", async function (language) {
  const landingPage = new LandingPage(await this.page);
  await landingPage.selectLanguageToggle(language);
});

When(
  "the language toggle updates the {string} hyperlink",
  async function (language) {
    const landingPage = new LandingPage(await this.page);
    expect(await landingPage.returnLanguageToggleHref(language)).to.be.null;
  }
);

Then("the {string} cookie has been set", async function(cookieName) {
  const cookies = await this.page.context().cookies();
  const expectedCookie = cookies.find(cookie => cookie.name === cookieName);
  expect(expectedCookie).to.exist;
});
