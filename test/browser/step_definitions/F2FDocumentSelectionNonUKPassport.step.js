const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("chai");

const {PhotoIdSelectionPage, NonUKPassportDetailsPageValid, NonUkPassportHasExpiryDatePage, FindBranch, NonUKPassportCountrySelector } = require("../pages");

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


   //NonUKPassportDetails
   Given(/^the date entered is within accepted Non UK expiration window$/, async function () {
    const nonUKPassportDetails = new NonUKPassportDetailsPageValid(await this.page);
  
    await nonUKPassportDetails.expiryDate();

  });


  When(/^the user clicks the continue button on the Non UK passport page$/, async function () {
    const nonUKPassportDetails = new NonUKPassportDetailsPageValid(await this.page);
  
    expect(await nonUKPassportDetails.isCurrentPage()).to.be.true;

    await nonUKPassportDetails.continue();
  
  });
  

  Then(/^the user is routed to the Country of Issue Selector screen$/, async function () {
    const ctrySelector = new NonUKPassportCountrySelector(await this.page);

    expect(await ctrySelector.isCurrentPage()).to.be.true;

  });

  //NonUKPassportCountrySelector
  Given(/^the user is on the Country Code Selection screen$/, async function () {
    const ctrySelector = new NonUKPassportCountrySelector(await this.page);
    
    expect(await ctrySelector.isCurrentPage()).to.be.true;
    
  });
  
  
  
    When(/^the user selects a country$/, async function () {
      const ctrySelector = new NonUKPassportCountrySelector(await this.page);
  
      expect(await ctrySelector.isCurrentPage()).to.be.true;
  
      await ctrySelector.selectCountry();
  
      await ctrySelector.continue();
  
    });
  
    Then(/^they are routed to the NonUKPassport Branch Finder screen$/, async function () {
      const branchFinderPage = new FindBranch(await this.page);
    
      expect(await branchFinderPage.isCurrentPage()).to.be.true;
    
    });
  
  
    When(/^the user clicks continue without selecting a country$/, async function () {
      const ctrySelector = new NonUKPassportCountrySelector(await this.page);
  
      expect(await ctrySelector.isCurrentPage()).to.be.true;
  
      await ctrySelector.continue();
  
      expect(await ctrySelector.checkErrorText()).to.contain('There is a problem');
  
    });
  
  
    Then(/^an inline error message is displayed$/, async function () {
      const ctrySelector = new NonUKPassportCountrySelector(await this.page);
  
      expect(await ctrySelector.isCurrentPage()).to.be.true;
  
      expect(await ctrySelector.checkErrorText()).to.contain('There is a problem');
  
    });
  
    When(/^the Back link is clicked on the NonUKPassport Country selection page$/, async function () {
      const ctrySelector = new NonUKPassportCountrySelector(await this.page);
    
      await ctrySelector.back();
    
    });
  
    Then(/^the user is navigated back to the previous screen - the Photo ID Expiry page$/, async function () {
      const nonUKPassportDetails = new NonUKPassportDetailsPageValid(await this.page);
    
      expect(await nonUKPassportDetails.isCurrentPage()).to.be.true;
    
    });
    