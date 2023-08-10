const { Given, Then } = require("@cucumber/cucumber");

const { PhotoIdSelectionPage, PhotoIdSelectionPageEdit, PhotoIdExpiryPage } = require("../pages");
const { expect } = require("chai");

Given(/^the user navigates directly to photoID- expiry page$/, async function () {
    const photoIDExpiry = new PhotoIdExpiryPage(this.page);
    await photoIDExpiry.goTo();

});

Then(/^the user sees an error message displayed on the photoID- expiry page$/, async function () {
    const photoIDExpiry = new PhotoIdExpiryPage(await this.page);
    expect(await photoIDExpiry.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await photoIDExpiry.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);

});

Given(/^the user navigates directly to photoID- selection page$/, async function () {
    const photoIDSelection = new PhotoIdSelectionPage(this.page);
    await photoIDSelection.goTo();

});

Then(/^the user sees an error message displayed on the photoID- selection page$/, async function () {
    const photoIDSelection = new PhotoIdSelectionPage(await this.page);
    expect(await photoIDSelection.isCurrentPage()).to.be.true;
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await photoIDSelection.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);

});

Given(/^the user navigates directly to photoID- selection- edit page$/, async function () {
    const photoIDSelectionEdit = new PhotoIdSelectionPageEdit(this.page);
    await photoIDSelectionEdit.goTo();

});

Then(/^the user sees an error message displayed on the photoID- selection- edit page$/, async function () {
    const photoIDSelectionEdit = new PhotoIdSelectionPageEdit(await this.page);
    const redirectionError = 'Sorry, there is a problem with the service';
    const error = await photoIDSelectionEdit.checkRedirectionErrorText();
    expect(await error).to.equal(redirectionError);

});