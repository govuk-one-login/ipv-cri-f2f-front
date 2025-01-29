const { Given, When } = require("@cucumber/cucumber");

const { PostOfficeCustomerLetter } = require("../pages");

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
  const postOfficeCustomerLetterPage = new PostOfficeCustomerLetter(this.page);
  await postOfficeCustomerLetterPage.emailOnly();
  await postOfficeCustomerLetterPage.continue();
});

Then(
  /^the user is navigated back to the PO Customer Letter page$/,
  async function () {
    const postOfficeCustomerLetterPage = new PostOfficeCustomerLetter(this.page);

    expect(await postOfficeCustomerLetterPage.isCurrentPage()).to.be.true;
  }
);
