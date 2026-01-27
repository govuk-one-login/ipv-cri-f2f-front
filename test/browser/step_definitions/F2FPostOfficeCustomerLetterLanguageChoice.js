const { Given, When, Then } = require("@cucumber/cucumber");
const { PostOfficeCustomerLetterLanguageChoice } = require("../pages");
const { expect } = require("chai");


Given(/^the letter language choice feature is enabled$/, function () {
  const enabled = process.env.LETTER_LANGUAGE_CHOICE_ENABLED === "true";
  if (!enabled) {
    throw new Error("Expected letter language choice feature to be enabled, but it is not.");
  }
  this.featureFlags = { letterLanguageChoiceEnabled: true };
});

Given(/^the user navigates directly to post-office-customer-letter-choose-language$/, async function () {
  const languageChoicePage = new PostOfficeCustomerLetterLanguageChoice(this.page);
  await languageChoicePage.goTo();
  expect(await languageChoicePage.isCurrentPage()).to.be.true;
});

When(/^the user selects English language$/, async function () {
  const page = new PostOfficeCustomerLetterLanguageChoice(this.page);
  expect(await page.isCurrentPage()).to.be.true;
  await page.selectEnglish();
  await page.continue();
});

When(/^the user selects Welsh language$/, async function () {
  const page = new PostOfficeCustomerLetterLanguageChoice(this.page);
  expect(await page.isCurrentPage()).to.be.true;
  await page.selectWelsh();
  await page.continue();
});

When(/^the user selects Both English and Welsh languages$/, async function () {
  const page = new PostOfficeCustomerLetterLanguageChoice(this.page);
  expect(await page.isCurrentPage()).to.be.true;
  await page.selectBoth();
  await page.continue();
});

Then(/^the user is on the language selection page$/, async function () {
  const page = new PostOfficeCustomerLetterLanguageChoice(this.page);
  expect(await page.isCurrentPage()).to.be.true;
  await this.page.waitForLoadState("networkidle");
});