const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {
  CheckDetails,
  PhotoIdSelectionPageEdit,
  EuDrivingLicenceDetailsPageValidEdit,
  PassportDetailsPageValidEdit,
  FindBranchValidEdit,
  PostOfficeLocations,
  EEAIdentityCardAddressCheckEdit,
  EEAIdentityCardCountrySelectorPageEdit,
} = require("../pages");

Given(
  /^the user has navigated to the Check My Answers Page$/,
  async function () {
    const cma = new CheckDetails(await this.page);

    expect(await cma.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

When(/^the user clicks the CMA Back button$/, async function () {
  const cma = new CheckDetails(await this.page);

  await cma.back();
});

Then(
  /^Does your photo ID have an expiry date option is displayed as Yes$/,
  async function () {
    const cma = new CheckDetails(await this.page);

    expect(await cma.getChangeIDHASExpiryDateSelection()).equal("Yes");
  }
);

Then(
  /^Does your photo ID have an expiry date option is displayed as No$/,
  async function () {
    const cma = new CheckDetails(await this.page);

    expect(await cma.getChangeIDHASExpiryDateSelection()).equal("No");
  }
);

Then(
  /^Does your photo ID have an expiry date option is not displayed$/,
  async function () {
    const cma = new CheckDetails(await this.page);

    expect(await cma.isExpiryDateSelectionDisplayed()).to.be.false;
  }
);

Then(/^Expiry date is not displayed$/, async function () {
  const cma = new CheckDetails(await this.page);

  expect(await cma.isExpiryDateDisplayed()).not.equal("Expiry date");
});

Then(/^Expiry date is displayed$/, async function () {
  const cma = new CheckDetails(await this.page);

  expect(await cma.isExpiryDateDisplayed()).equal("Expiry date");
});

Then(/^$/, async function () {
  const cma = new CheckDetails(await this.page);

  expect(await cma.getChangeIDHASExpiryDateSelection()).equal("No");
});

Then(
  /^the user is navigated back to the PO Locations page$/,
  async function () {
    const poLocations = new PostOfficeLocations(await this.page);

    expect(await poLocations.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

/**             DOCUMENT SELECTION CHANGE             */

When(/^the user clicks the PhotoIdChange button$/, async function () {
  const cma = new CheckDetails(await this.page);

  expect(await cma.isCurrentPage()).to.be.true;
  await this.page.waitForLoadState("networkidle");
  
  await cma.changePhotoIDLink();
});

Then(
  /^the user is navigated back to the PhotoIdSelection page$/,
  async function () {
    const pIDEditPage = new PhotoIdSelectionPageEdit(await this.page);

    expect(await pIDEditPage.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

Then(/^the user selects a new PhotoId Document$/, async function () {
  const pIDEditPage = new PhotoIdSelectionPageEdit(await this.page);

  expect(await pIDEditPage.isCurrentPage()).to.be.true;
  await this.page.waitForLoadState("networkidle");
  
  await pIDEditPage.euDrivingLicenceChoice();

  await pIDEditPage.continue();
});

Then(/^the user enters the PhotoId Expiry Date page$/, async function () {
  const euDLVld = new EuDrivingLicenceDetailsPageValidEdit(await this.page);

  expect(await euDLVld.isCurrentPage()).to.be.true;
  await this.page.waitForLoadState("networkidle");

  await euDLVld.expiryDate();
});

Then(/^the user clicks continue on the PhotoId Expiry Date page$/, async function () {
  const euDLVld = new EuDrivingLicenceDetailsPageValidEdit(await this.page);

  expect(await euDLVld.isCurrentPage()).to.be.true;
  await this.page.waitForLoadState("networkidle");
  
  await euDLVld.continue();
});

/**             EXPIRY DATE SELECTION CHANGE             */

/** 1. Click the Change button */
When(/^the user clicks the ExpiryDate Change button$/, async function () {
  const cma = new CheckDetails(await this.page);

  expect(await cma.isCurrentPage()).to.be.true;
  await this.page.waitForLoadState("networkidle");
  
  await cma.changeExpiryDate();
});

/** 2. Navigate back to the page for editing */
Then(/^the user is navigated back to the Expiry Date Page$/, async function () {
  const ppDEditPage = new PassportDetailsPageValidEdit(await this.page);

  expect(await ppDEditPage.isCurrentPage()).to.be.true;
  await this.page.waitForLoadState("networkidle");
});

/** 3. Make the change and return to the CMA page*/
Then(/^the user changes the Expiry Date$/, async function () {
  const ppDEditPage = new PassportDetailsPageValidEdit(await this.page);

  expect(await ppDEditPage.isCurrentPage()).to.be.true;
  await this.page.waitForLoadState("networkidle");

  await ppDEditPage.expiryDate();
});

/** 4. Make the change and return to the CMA page*/
Then(/^the user continues to the CMA page$/, async function () {
  const ppDEditPage = new PassportDetailsPageValidEdit(await this.page);

  expect(await ppDEditPage.isCurrentPage()).to.be.true;
  await this.page.waitForLoadState("networkidle");

  await ppDEditPage.continue();
});

When(/^the user clicks the IDHASExpiryDate Change button$/, async function () {
  const cma = new CheckDetails(await this.page);

  expect(await cma.isCurrentPage()).to.be.true;
  await this.page.waitForLoadState("networkidle");

  await cma.changeIDHASExpiryDate();
});

When(/^the user clicks the EEAHASExpiryDate Change button$/, async function () {
  const cma = new CheckDetails(await this.page);

  expect(await cma.isCurrentPage()).to.be.true;
  await this.page.waitForLoadState("networkidle");

  await cma.changeEEAHASExpiryDate();
});

When(
  /^the user clicks the EUDLHASSExpiryDate Change button$/,
  async function () {
    const cma = new CheckDetails(await this.page);

    expect(await cma.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");

    await cma.changeEUDLHASExpiryDate();
  }
);

/**             POST OFFICE SELECTION CHANGE             */

/** 1. Click the Change button */
When(/^the user clicks the PO Location Change button$/, async function () {
  const cma = new CheckDetails(await this.page);

  expect(await cma.isCurrentPage()).to.be.true;
  await this.page.waitForLoadState("networkidle");

  await cma.changePOLocation();
});

/** 2. Navigate back to the PO page for editing */
Then(
  /^the user is navigated back to the FindBranchEdit page$/,
  async function () {
    const findBranchEdit = new FindBranchValidEdit(await this.page);

    expect(await findBranchEdit.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

Then(
  /^the user changes the Post Code and is navigated back to the list of nearest POs$/,
  async function () {
    const findBranchEdit = new FindBranchValidEdit(await this.page);
    const poLocations = new PostOfficeLocations(await this.page);

    await findBranchEdit.postCodeChange();

    await findBranchEdit.continue();

    expect(await poLocations.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

/** 4. Make the change and return to the CMA page*/
Then(
  /^the user selects a record and continues to the CMA page$/,
  async function () {
    const poLocations = new PostOfficeLocations(await this.page);

    expect(await poLocations.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");

    await poLocations.continue();
  }
);

/**             ADDRESS CHECK SELECTION CHANGE             */

/** 1. Click the Change button */
When(/^the user clicks the Address Check Change button$/, async function () {
  const cma = new CheckDetails(await this.page);

  expect(await cma.isCurrentPage()).to.be.true;
  await this.page.waitForLoadState("networkidle");

  await cma.changeAddressCheckLocation();
});

/** 2. Navigate back to the Address Check page for editing */
Then(
  /^the user is navigated back to the Address Check Page$/,
  async function () {
    const addressCheckEdit = new EEAIdentityCardAddressCheckEdit(
      await this.page
    );

    expect(await addressCheckEdit.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

/** 3. Change address selction choice to "My identity card does not have my address on it" */

Then(
  /^the user changes the address selection to "My identity card does not have my address on it"$/,
  async function () {
    const addressCheckEdit = new EEAIdentityCardAddressCheckEdit(
      await this.page
    );

    await addressCheckEdit.noAddress();
  }
);

/** 4. Return to the CMA page*/
Then(
  /^the user continues to the CMA page from the Address Check page$/,
  async function () {
    const addressCheckEdit = new EEAIdentityCardAddressCheckEdit(
      await this.page
    );

    const checkDetails = new CheckDetails(await this.page);

    await addressCheckEdit.continue();

    expect(await checkDetails.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

/**             COUNTRY SELECTOR CHANGE             */

/** 1. Click the Change button */
When(/^the user clicks the Country Change button$/, async function () {
  const cma = new CheckDetails(await this.page);

  expect(await cma.isCurrentPage()).to.be.true;
  await this.page.waitForLoadState("networkidle");

  await cma.changeCountry();
});

/** 2. Navigate back to country selector for editing */
Then(
  /^the user is navigated back to the Country Selector Page$/,
  async function () {
    const countrySelector = new EEAIdentityCardCountrySelectorPageEdit(
      await this.page
    );

    expect(await countrySelector.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);

/** 3. Change country of issue */

Then(/^the user changes the country of issue$/, async function () {
  const countrySelector = new EEAIdentityCardCountrySelectorPageEdit(
    await this.page
  );

  await countrySelector.selectCountry();
});

/** 4. Return to the CMA page*/
Then(
  /^the user continues to the CMA page from the Country Selector page$/,
  async function () {
    const countrySelector = new EEAIdentityCardCountrySelectorPageEdit(
      await this.page
    );

    const checkDetails = new CheckDetails(await this.page);

    await countrySelector.continue();

    expect(await checkDetails.isCurrentPage()).to.be.true;
    await this.page.waitForLoadState("networkidle");
  }
);
