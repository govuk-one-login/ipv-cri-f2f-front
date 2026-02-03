const { When, Then } = require("@cucumber/cucumber");
const { PostOfficeCustomerLetterLanguageChoice } = require("../pages");
const { expect } = require("chai");

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