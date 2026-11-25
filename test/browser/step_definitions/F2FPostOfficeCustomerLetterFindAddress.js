import { Given, When } from "@cucumber/cucumber";
import { expect } from "chai";

import { PostOfficeCustomerLetterFindAddress } from "../pages/index.js";

Given(
  /^the user navigates directly to post-office-customer-letter$/,
  async function () {
    const postOfficeCustomerLetterFindAddressPage =
      new PostOfficeCustomerLetterFindAddress(this.page);
    await postOfficeCustomerLetterFindAddressPage.goTo();
  },
);

When(
  /^the user enters the postcode for the different address/,
  async function () {
    const postOfficeCustomerLetterFindAddressPage =
      new PostOfficeCustomerLetterFindAddress(this.page);

    expect(await postOfficeCustomerLetterFindAddressPage.isCurrentPage()).to.be
      .true;
    await this.page.waitForLoadState("networkidle");

    await postOfficeCustomerLetterFindAddressPage.enterPostcode();
    await postOfficeCustomerLetterFindAddressPage.continue();
  },
);
