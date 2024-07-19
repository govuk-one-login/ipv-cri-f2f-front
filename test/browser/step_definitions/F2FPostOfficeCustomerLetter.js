const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { PostOfficeCustomerLetterPage } = require("../pages");

When(
  "the user selects a Post Office customer letter option of {string}",
  async function (customerLetterType) {
    const postOfficeCustomerLetterPage = new PostOfficeCustomerLetterPage(await this.page);
    await postOfficeCustomerLetterPage.selectCustomerLetterOption(customerLetterType);
    await postOfficeCustomerLetterPage.continue();
  }
);

When(
  /^the user continues without selecting a Post Office Customer Letter option$/,
  async function () {
    const postOfficeCustomerLetterPage = new PostOfficeCustomerLetterPage(await this.page);
    postOfficeCustomerLetterPage.continue();
  }
);


Then(
  /^the user clicks the PCL Back button$/,
  async function () {
    const postOfficeCustomerLetterPage = new PostOfficeCustomerLetterPage(await this.page);

    await postOfficeCustomerLetterPage.back();
  }
);

Then(
  /^the user is successfully routed to the Post Office customer letter screen$/,
  async function () {
    const postOfficeCustomerLetterPage = new PostOfficeCustomerLetterPage(await this.page);

    expect(await postOfficeCustomerLetterPage.isCurrentPage()).to.be.true;
  }
);

Then(
  /^the user sees an inline error message displayed on the Post Office Customer Letter page$/,
  async function () {
    const postOfficeCustomerLetterPage = new PostOfficeCustomerLetterPage(await this.page);
    expect(await postOfficeCustomerLetterPage.isCurrentPage()).to.be.true;
    expect(await postOfficeCustomerLetterPage.checkErrorText()).to.contain(
      "There is a problem"
    );
  }
);