const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const { LandingPage, PhotoIdSelectionPage, ThinFilePhotoIdSelectionPage} = require("../pages");

Given(/^the user wants to progress to the next step of the journey$/, async function () {
  const landingPage = new LandingPage(await this.page);

  expect(await landingPage.isCurrentPage()).to.be.true;

});

When(/^the user clicks the continue button on the Landing Page$/, async function () {
  const landingPage = new LandingPage(await this.page);

  await landingPage.continue();

});


Then(/^the user is routed to the next screen in the journey PhotoId Selection$/, async function () {
  const photoIdPage = new PhotoIdSelectionPage(await this.page);

  expect(await photoIdPage.isCurrentPage()).to.be.true;

});

Then(/^the user is routed to the next screen in the journey choose-photo-id-post-office-biometric$/, async function () {
  const thinFilePhotoIdPage = new ThinFilePhotoIdSelectionPage(await this.page);

  expect(await thinFilePhotoIdPage.isCurrentPage()).to.be.true;

});

Then(/^the page only shows thin file idetity options$/, async function () {
  const thinFilePhotoIdPage = new ThinFilePhotoIdSelectionPage(await this.page);

  expect(await thinFilePhotoIdPage.isCurrentPage()).to.be.true;

  await thinFilePhotoIdPage.validateThinFileOptions();

});
