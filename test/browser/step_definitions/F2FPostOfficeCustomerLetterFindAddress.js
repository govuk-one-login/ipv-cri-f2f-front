const { Given, When } = require("@cucumber/cucumber");

const { PostOfficeCustomerLetterFindAddress } = require("../pages");

Given(
  /^the user navigates directly to post-office-customer-letter$/,
  async function () {
    const postOfficeCustomerLetterFindAddressPage =
      new PostOfficeCustomerLetterFindAddress(this.page);
    await postOfficeCustomerLetterFindAddressPage.goTo();
  }
);

When(
  /^the user enters the postcode for the different address/,
  async function () {
    const postOfficeCustomerLetterFindAddressPage =
      new PostOfficeCustomerLetterFindAddress(this.page);
    await postOfficeCustomerLetterFindAddressPage.enterPostcode();
    await postOfficeCustomerLetterFindAddressPage.continue();
  }
);

When(/^the user selects an address from the dropdown list/, async function () {
  const postOfficeCustomerLetterFindAddressPage =
    new PostOfficeCustomerLetterFindAddress(this.page);
  await postOfficeCustomerLetterFindAddressPage.selectAddress();
  await postOfficeCustomerLetterFindAddressPage.continue();
});
