const { Given, When, Then, } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {PhotoIdSelectionPage, NonUKPassportDetailsPageValid, NonUkPassportHasExpiryDatePage } = require("../pages");

  Given(/^the Other passport option is selected$/, async function () {
     const photoIdPage = new PhotoIdSelectionPage(await this.page);
     
     await photoIdPage.nonUKPassportChoice();

     expect(await photoIdPage.isCurrentPage()).to.be.true
   
  });
 
  When(/^the user clicks the continue button with Non UK passport selected$/, async function () {
    const photoIdPage = new PhotoIdSelectionPage(await this.page);
  
    await photoIdPage.continue();
  
  });
  
  Then(/^the user is routed to the next screen - OtherPassport Details$/, async function () {
    const nonUKPassportDetails = new NonUKPassportDetailsPageValid(await this.page);

     expect(await nonUKPassportDetails.isCurrentPage()).to.be.true;

   });

   Then(/^the user is routed to the next screen - Non-UKPassportHasExpiryDate$/, async function () {
    const nonUkPassportHasExpiryDatePage = new NonUkPassportHasExpiryDatePage(await this.page);

     expect(await nonUkPassportHasExpiryDatePage.isCurrentPage()).to.be.true;

   });

   Then(/^the user is routed to the edit screen - Non-UKPassportHasExpiryDate$/, async function () {
    const nonUkPassportHasExpiryDatePage = new NonUkPassportHasExpiryDatePage(await this.page);

     expect(await nonUkPassportHasExpiryDatePage.isCurrentEditPage()).to.be.true;

   });
   
   When(/^the user selects yes on the passport expiry date page$/, async function () {
    const nonUkPassportHasExpiryDatePage = new NonUkPassportHasExpiryDatePage(await this.page);

     await nonUkPassportHasExpiryDatePage.yes();
     await nonUkPassportHasExpiryDatePage.continue();

   });

   When(/^the user selects no on the passport expiry date page$/, async function () {
    const nonUkPassportHasExpiryDatePage = new NonUkPassportHasExpiryDatePage(await this.page);

     await nonUkPassportHasExpiryDatePage.no();
     await nonUkPassportHasExpiryDatePage.continue();

   });
