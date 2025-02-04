const { Given, When } = require("@cucumber/cucumber");

const { PostOfficeCustomerLetterCheckAddress } = require("../pages");

Given(
  /^the user navigates directly to post-office-customer-letter$/,
  async function () {
    const postOfficeCustomerLetterCheckAddressPage =
      new PostOfficeCustomerLetterCheckAddress(this.page);
    await postOfficeCustomerLetterCheckAddressPage.goTo();
  }
);

When(
  /^the user selects that they want to send the letter to the original address/,
  async function () {
    const postOfficeCustomerLetterCheckAddressPage =
      new PostOfficeCustomerLetterCheckAddress(this.page);
    await postOfficeCustomerLetterCheckAddressPage.sendToOriginalAddress();
    await postOfficeCustomerLetterCheckAddressPage.continue();
  }
);

When(
  /^the user selects that they want to send the letter to a different address$/,
  async function () {
    const postOfficeCustomerLetterCheckAddressPage =
      new PostOfficeCustomerLetterCheckAddress(this.page);
    await postOfficeCustomerLetterCheckAddressPage.sendToDifferentAddress();
    await postOfficeCustomerLetterCheckAddressPage.continue();
  }
);
