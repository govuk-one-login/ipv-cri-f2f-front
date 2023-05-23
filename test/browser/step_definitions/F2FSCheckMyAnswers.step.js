const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {
  CheckDetails,
  PhotoIdSelectionPageEdit,
  EuDrivingLicenceDetailsPageValidEdit,
  PassportDetailsPageValidEdit,
  FindBranchValidEdit,
  PostOfficeLocations,
} = require("../pages");

Given(
  /^the user has navigated to the Check My Answers Page$/,
  async function () {
    const cma = new CheckDetails(await this.page);

    expect(await cma.isCurrentPage()).to.be.true;
  }
);

When(/^the user clicks the CMA Back button$/, async function () {
  const cma = new CheckDetails(await this.page);

  await cma.back();
});

Then(/^the user is navigated back to the PO Locations page$/, async function () {
  const poLocations = new PostOfficeLocations(await this.page);

  expect(await poLocations.isCurrentPage()).to.be.true;

});


/**             DOCUMENT SELECTION CHANGE             */

When(/^the user clicks the PhotoIdChange button$/, async function () {
  const cma = new CheckDetails(await this.page);

  expect(await cma.isCurrentPage()).to.be.true;

  await cma.changePhotoIDLink();
});

Then(
  /^the user is navigated back to the PhotoIdSelection page$/, async function () {
    const pIDEditPage = new PhotoIdSelectionPageEdit(await this.page);

    expect(await pIDEditPage.isCurrentPage()).to.be.true;
  }
);

Then(/^the user selects a new PhotoId Document$/, async function () {
  const pIDEditPage = new PhotoIdSelectionPageEdit(await this.page);

  expect(await pIDEditPage.isCurrentPage()).to.be.true;

  await pIDEditPage.euDrivingLicenceChoice();

  await pIDEditPage.continue();
});

Then(/^the user enters the PhotoId Expiry Date page$/, async function () {
  const euDLVld = new EuDrivingLicenceDetailsPageValidEdit(await this.page);

  expect(await euDLVld.isCurrentPage()).to.be.true;

  await euDLVld.expiryDate();
});

Then(/^the user returns to the CMA page$/, async function () {
  const euDLVld = new EuDrivingLicenceDetailsPageValidEdit(await this.page);

  expect(await euDLVld.isCurrentPage()).to.be.true;

  await euDLVld.continue();
});

/**             EXPIRY DATE SELECTION CHANGE             */

/** 1. Click the Change button */
When(/^the user clicks the ExpiryDate Change button$/, async function () {
  const cma = new CheckDetails(await this.page);

  expect(await cma.isCurrentPage()).to.be.true;

  await cma.changeExpiryDate();
});

/** 2. Navigate back to the page for editing */
Then(/^the user is navigated back to the Expiry Date Page$/, async function () {
  const ppDEditPage = new PassportDetailsPageValidEdit(await this.page);

  expect(await ppDEditPage.isCurrentPage()).to.be.true;
});

/** 3. Make the change and return to the CMA page*/
Then(/^the user changes the Expiry Date$/, async function () {
  const ppDEditPage = new PassportDetailsPageValidEdit(await this.page);

  expect(await ppDEditPage.isCurrentPage()).to.be.true;

  await ppDEditPage.expiryDate();
});

/** 4. Make the change and return to the CMA page*/
Then(/^the user continues to the CMA page$/, async function () {
  const ppDEditPage = new PassportDetailsPageValidEdit(await this.page);

  expect(await ppDEditPage.isCurrentPage()).to.be.true;

  await ppDEditPage.continue();
});

/**             POST OFFICE SELECTION CHANGE             */

/** 1. Click the Change button */
When(/^the user clicks the PO Location Change button$/, async function () {
  const cma = new CheckDetails(await this.page);

  expect(await cma.isCurrentPage()).to.be.true;

  await cma.changePOLocation();
});

/** 2. Navigate back to the PO page for editing */
Then(
  /^the user is navigated back to the FindBranchEdit page$/,
  async function () {
    const findBranchEdit = new FindBranchValidEdit(await this.page);

    expect(await findBranchEdit.isCurrentPage()).to.be.true;
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
  }
);

/** 4. Make the change and return to the CMA page*/
Then(
  /^the user selects a record and continues to the CMA page$/,
  async function () {
    const poLocations = new PostOfficeLocations(await this.page);

    expect(await poLocations.isCurrentPage()).to.be.true;

    await poLocations.continue();
  }
);
