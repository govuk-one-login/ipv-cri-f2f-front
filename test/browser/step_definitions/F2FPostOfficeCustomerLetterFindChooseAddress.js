const { Given, When } = require("@cucumber/cucumber");
const { expect } = require("chai");

const { PostOfficeCustomerLetterChooseAddress } = require("../pages");

Given(
  /^the user navigates directly to post-office-customer-letter choose address$/,
  async function () {
    const postOfficeCustomerLetterChooseAddress =
      new PostOfficeCustomerLetterChooseAddress(this.page);
    await postOfficeCustomerLetterChooseAddress.goTo();
  }
);

When(/^the user selects an address from the dropdown list/, async function () {
  const postOfficeCustomerLetterChooseAddress =
    new PostOfficeCustomerLetterChooseAddress(this.page);

  expect(await postOfficeCustomerLetterChooseAddress.isCurrentPage()).to.be.true;
  await this.page.waitForLoadState("networkidle");

  await postOfficeCustomerLetterChooseAddress.selectAddress();
  await postOfficeCustomerLetterChooseAddress.continue();
});
