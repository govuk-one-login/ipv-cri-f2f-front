import { Given, When } from "@cucumber/cucumber";
import { expect } from "chai";

import { PostOfficeCustomerLetterCheckAddress } from "../pages/index.js";

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

    expect(await postOfficeCustomerLetterCheckAddressPage.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");

    await postOfficeCustomerLetterCheckAddressPage.sendToOriginalAddress();
    await postOfficeCustomerLetterCheckAddressPage.continue();
  }
);

When(
  /^the user selects that they want to send the letter to a different address$/,
  async function () {
    const postOfficeCustomerLetterCheckAddressPage =
      new PostOfficeCustomerLetterCheckAddress(this.page);

    expect(await postOfficeCustomerLetterCheckAddressPage.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");

    await postOfficeCustomerLetterCheckAddressPage.sendToDifferentAddress();
    await postOfficeCustomerLetterCheckAddressPage.continue();
  }
);
