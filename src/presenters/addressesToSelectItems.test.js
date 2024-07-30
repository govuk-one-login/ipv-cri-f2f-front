const { expect } = require("chai");
const addressesToSelectItems = require("./addressesToSelectItems");

const addressPresenter = require("./addressPresenter");

describe("Addresses to SelectItems Presenter", () => {
  beforeEach(() => {
    sinon
      .stub(addressPresenter, "generateSearchResultString")
      .returns("SEARCH_RESULT");
  });

  afterEach(() => {
    addressPresenter.generateSearchResultString.restore();
  });



  it("should return items from addresses", () => {
    const addresses = [
        {
            uprn: '11111',
            udprn: '1111111',
            address: '34, MOCK ROAD, PLACEHOLDER PARK, FAKESVILLE, FS6 5AQ',
            building_number: '34',
            thoroughfare_name: 'MOCK ROAD',
            dependent_locality: 'PLACEHOLDER PARK',
            post_town: 'FAKESVILLE',
            postcode: 'FS6 5AQ'
          },
          {
            uprn: '22222',
            udprn: '222222',
            address: 'BASEMENT FLAT, 36, MOCK ROAD, PLACEHOLDER PARK, FAKESVILLE, FS6 5AQ',
            sub_building_name: 'BASEMENT FLAT',
            building_number: '36',
            thoroughfare_name: 'MOCK ROAD',
            dependent_locality: 'PLACEHOLDER PARK',
            post_town: 'FAKESVILLE',
            postcode: 'FS6 5AQ'
          }
    ];


    const items = addressesToSelectItems({ addresses });

    expect(items[0].text).to.deep.equal("2 addresses found")
    expect(items[1].value).to.deep.equal("34 MOCK ROAD, PLACEHOLDER PARK FAKESVILLE, FS6 5AQ")
    expect(items[2].value).to.deep.equal("BASEMENT FLAT 36 MOCK ROAD, PLACEHOLDER PARK FAKESVILLE, FS6 5AQ")
  });
});
