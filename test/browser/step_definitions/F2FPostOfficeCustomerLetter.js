const { Given, When, Then } = require("@cucumber/cucumber");

const { PostOfficeCustomerLetter, PostOfficeCustomerLetterLanguageChoice } = require("../pages");

const { expect } = require("chai");

Given(
  /^the user navigates directly to post-office-customer-letter$/,
  async function () {
    const postOfficeCustomerLetterPage = new PostOfficeCustomerLetter(
      this.page
    );
    await postOfficeCustomerLetterPage.goTo();
  }
);

When(/^the user selects an Email only Post Office Letter$/, async function () {
  await this.page.waitForLoadState("networkidle");
  
  const postOfficeCustomerLetterPage = new PostOfficeCustomerLetter(this.page);
  await postOfficeCustomerLetterPage.emailOnly();
  await postOfficeCustomerLetterPage.continue();
});

When(/^the user selects an Email and Post Office Letter$/, async function () {
  const postOfficeCustomerLetterPage = new PostOfficeCustomerLetter(this.page);
  
  expect(await postOfficeCustomerLetterPage.isCurrentPage()).to.be.true;
  await this.page.waitForLoadState("networkidle");
  
  await postOfficeCustomerLetterPage.emailAndPost();
  await postOfficeCustomerLetterPage.continue();
});

Then(
  /^the user is navigated back to the PO Customer Letter page$/,
  async function () {
    const postOfficeCustomerLetterPage = new PostOfficeCustomerLetter(
      this.page
    );

    expect(await postOfficeCustomerLetterPage.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);
