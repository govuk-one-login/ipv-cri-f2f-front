const { Given, Then } = require("@cucumber/cucumber");

const { FindBranch, FindBranchValidEdit, ErrorPage } = require("../pages");
const { expect } = require("chai");
Given(/^the user navigates directly to find-branch page$/, async function () {
  const findBranch = new FindBranch(this.page);
  await findBranch.goTo();
});

Then(
  /^the user sees an error message displayed on the find-branch page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

Given(
  /^the user navigates directly to find-branch-empty page$/,
  async function () {
    const findBranchEmpty = new FindBranch(this.page);
    await findBranchEmpty.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the find-branch-empty page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

Given(
  /^the user navigates directly to find-branch-invalid page$/,
  async function () {
    const findBranchInvalid = new FindBranch(this.page);
    await findBranchInvalid.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the find-branch-invalid page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

Given(
  /^the user navigates directly to find-branch-valid page$/,
  async function () {
    const findBranchValid = new FindBranch(this.page);
    await findBranchValid.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the find-branch-valid page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);

Given(
  /^the user navigates directly to find-branch-valid-edit page$/,
  async function () {
    const findBranchValidEdit = new FindBranchValidEdit(this.page);
    await findBranchValidEdit.goTo();
  }
);

Then(
  /^the user sees an error message displayed on the find-branch-valid-edit page$/,
  async function () {
    const errorPage = new ErrorPage(await this.page);
    expect(await errorPage.isCurrentPage()).to.be.true;
    const redirectionError = await errorPage.getSomethingWentWrongMessage();
    const error = await errorPage.getErrorTitle();
    expect(await error).to.equal(redirectionError);
  }
);
