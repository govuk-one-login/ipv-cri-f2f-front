const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");

const {
  PhotoIdSelectionPage,
  EEAIdentityCardDetailsPageValid,
  EeaIdentityCardHasExpiryDatePage,
  EEAIdentityCardAddressCheck,
  EEAIdentityCardCountrySelectorPage,
  FindBranch,
} = require("../pages");

Given(/^the EEA National Identity Card option is selected$/, async function () {
  const photoIdPage = new PhotoIdSelectionPage(await this.page);

  await photoIdPage.nationalIdentityCardEEAChoice();
});

When(
  /^the user clicks the PhotoId continue button with EEA National Identity Card selected$/,
  async function () {
    const photoIdPage = new PhotoIdSelectionPage(await this.page);

    await photoIdPage.continue();
  }
);

Then(
  /^the user is routed to the next screen in the EEA National Identity journey - EEA National Identity Card details$/,
  async function () {
    const nationalIdentityCardEEA = new EEAIdentityCardDetailsPageValid(
      await this.page
    );

    expect(await nationalIdentityCardEEA.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

Then(
  /^the user is routed to the EEA Has Expiry Entry Screen$/,
  async function () {
    const eeaIdentityCardHasExpiryDatePage =
      new EeaIdentityCardHasExpiryDatePage(await this.page);

    expect(await eeaIdentityCardHasExpiryDatePage.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

Then(
  /^the user is routed to the EEA edit HAS Expiry Entry Screen$/,
  async function () {
    const eeaIdentityCardHasExpiryDatePage =
      new EeaIdentityCardHasExpiryDatePage(await this.page);

    expect(await eeaIdentityCardHasExpiryDatePage.isCurrentEditPage()).to.be
      .true;
    await this.page.waitForLoadState("networkidle");
  }
);

When(
  /^the user selects yes on the EEA identity expiry date page$/,
  async function () {
    const eeaIdentityCardHasExpiryDatePage =
      new EeaIdentityCardHasExpiryDatePage(await this.page);

    await eeaIdentityCardHasExpiryDatePage.yes();
    await eeaIdentityCardHasExpiryDatePage.continue();
  }
);

When(
  /^the user selects no on the EEA identity expiry date page$/,
  async function () {
    const eeaIdentityCardHasExpiryDatePage =
      new EeaIdentityCardHasExpiryDatePage(await this.page);

    await eeaIdentityCardHasExpiryDatePage.no();
    await eeaIdentityCardHasExpiryDatePage.continue();
  }
);

//EEANationalIdentityCard
Given(
  /^the date entered is within accepted National Identity Card EEA expiration window$/,
  async function () {
    const nationalIdentityCardEEA = new EEAIdentityCardDetailsPageValid(
      await this.page
    );

    await nationalIdentityCardEEA.expiryDate();
  }
);

Given(
  /^the user selects Yes, it has my current address on it for EEA ID$/,
  async function () {
    const addressCheck = new EEAIdentityCardAddressCheck(await this.page);

    await addressCheck.sameAddress();
  }
);

Given(
  /^the user selects No, it has my previous address on it for EEA ID$/,
  async function () {
    const addressCheck = new EEAIdentityCardAddressCheck(await this.page);

    await addressCheck.differentAddress();
  }
);

Given(
  /^the user selects My identity card does not have my address on it$/,
  async function () {
    const addressCheck = new EEAIdentityCardAddressCheck(await this.page);

    await addressCheck.noAddress();
  }
);

Given(/^the user is on the EEA ID address check page$/, async function () {
  const addressCheck = new EEAIdentityCardAddressCheck(await this.page);

  expect(await addressCheck.isCurrentPage()).to.be.true;
});

Given(
  /^no option has been chosen on the National Identity Card EEA Address Check screen$/,
  async function () {
    const addressCheck = new EEAIdentityCardAddressCheck(await this.page);

    expect(await addressCheck.isCurrentPage()).to.be.true;
  }
);

When(
  /^the user clicks the continue button on the National Identity Card EEA Page$/,
  async function () {
    const nationalIdentityCardEEA = new EEAIdentityCardDetailsPageValid(
      await this.page
    );

    await nationalIdentityCardEEA.continue();
  }
);

When(
  /^the user clicks the Back button on the National Identity Card EEA Page$/,
  async function () {
    const nationalIdentityCardEEA = new EEAIdentityCardAddressCheck(
      await this.page
    );

    await nationalIdentityCardEEA.back();
  }
);

When(/^they click the EEA ID address check back button$/, async function () {
  const nationalIdentityCardEEA = new EEAIdentityCardAddressCheck(
    await this.page
  );

  await nationalIdentityCardEEA.back();
});

When(
  /^the user clicks continue on the EEA Identity Card address check page$/,
  async function () {
    const addressCheck = new EEAIdentityCardAddressCheck(await this.page);

    await addressCheck.continue();
  }
);

Then(
  /^the user is routed to the next screen in the National Identity Card EEA journey - Find Branch$/,
  async function () {
    const branchFinderPage = new FindBranch(await this.page);

    expect(await branchFinderPage.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

Then(
  /^the user is routed from NI Card EEA Details to the address check page$/,
  async function () {
    const addressCheck = new EEAIdentityCardAddressCheck(await this.page);

    expect(await addressCheck.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

Then(
  /^the user is routed to the previous screen in the NIC EEA journey$/,
  async function () {
    const photoIdPage = new PhotoIdSelectionPage(await this.page);

    expect(await photoIdPage.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

Then(
  /^they are routed to the EEA ID country code selection screen$/,
  async function () {
    const countryCode = new EEAIdentityCardCountrySelectorPage(await this.page);

    expect(await countryCode.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

Then(
  /^they are routed back to the Document Selection screen from EEA ID address check$/,
  async function () {
    const photoIdPage = new PhotoIdSelectionPage(await this.page);

    expect(await photoIdPage.isCurrentPage()).to.be.true;
  }
);

Then(
  /^they are routed back to the EEA ID expiry date page$/,
  async function () {
    const nationalIdentityCardEEA = new EEAIdentityCardDetailsPageValid(
      await this.page
    );

    expect(await nationalIdentityCardEEA.isCurrentPage()).to.be.true;
  }
);

Then(
  /^the user sees an inline error message displayed on the National Identity Card EEA address check page$/,
  async function () {
    const addressCheck = new EEAIdentityCardAddressCheck(await this.page);

    expect(await addressCheck.isCurrentPage()).to.be.true;

    expect(await addressCheck.checkErrorText()).to.contain(
      "There is a problem"
    );
  }
);

//CountrySelector
Given(
  /^the user is on the NI Card EEA Country Code Selection screen$/,
  async function () {
    const ctrySelector = new EEAIdentityCardCountrySelectorPage(
      await this.page
    );

    expect(await ctrySelector.isCurrentPage()).to.be.true;
  }
);

When(/^the user selects an EEA country code$/, async function () {
  const euCtrySelector = new EEAIdentityCardCountrySelectorPage(
    await this.page
  );

  expect(await euCtrySelector.isCurrentPage()).to.be.true;

  await euCtrySelector.selectCountry();

  await euCtrySelector.continue();
});

Then(
  /^the user is routed from NI Card EEA Country to Branch Finder Screen$/,
  async function () {
    const findBranchValid = new FindBranch(await this.page);

    expect(await findBranchValid.isCurrentPage()).to.be.true;

    // await findBranchValid.continue();
  }
);
