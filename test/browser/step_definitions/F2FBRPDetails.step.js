const { Given, When, Then, And} = require("@cucumber/cucumber");

const { expect } = require("chai");

const { BRPDetailsPageValid, FindBranch,} = require("../pages");

  Given(/^the date entered is within accepted BRP expiration window$/, async function () {
    const brpDetailsPage = new BRPDetailsPageValid(await this.page);
  
    await brpDetailsPage.expiryDate();

  });


  When(/^the user clicks the continue button on the BRP Page$/, async function () {
    const brpDetailsPage = new BRPDetailsPageValid(await this.page);
  
    expect(await brpDetailsPage.isCurrentPage()).to.be.true;

    await brpDetailsPage.continue();
  
  });
  

  Then(/^the user is routed to the next screen in the BRP journey - Branch Finder$/, async function () {    
        const branchFinderPage = new FindBranch(await this.page);

        expect(await branchFinderPage.isCurrentPage()).to.be.true;

  });
