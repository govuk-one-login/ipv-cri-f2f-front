const {
  formatDate,
  beforeNow,
  convertKeysToLowerCase,
  formatAddress,
} = require("./utils");
const { expect } = require("chai");
const moment = require("moment");

describe("formatDate", () => {
  it("returns a YYYY-MM-DD date with language set to en as DD Month(English) YYYY", () => {
    expect(formatDate("2030-03-31", "YYYY-MM-DD", "en")).to.equal(
      "31 March 2030"
    );
  });

  it("returns a YYYY-MM-DD date with language set to cy as DD Month(Welsh) YYYY", () => {
    expect(formatDate("2030-03-31", "YYYY-MM-DD", "cy")).to.equal(
      "31 Mawrth 2030"
    );
  });

  it("returns a YYYYMM/DD date as an empty string", () => {
    expect(formatDate("198903/31", "YYYY-MM-DD", "en")).to.equal("");
  });

  it("should return an empty string if date is empty string", () => {
    expect(formatDate("", "YYYY-MM-DD", "en")).to.equal("");
  });

  it("should return an empty string if date is empty", () => {
    expect(formatDate(null, "YYYY-MM-DD", "en")).to.equal("");
  });
});

describe("beforeNow", () => {
  it("should be false when UK passport issued greater than 10 years in the future", () => {
    const issueDate = moment()
      .add(10, "years")
      .add(1, "days")
      .format("YYYY-MM-DD");
    const validator = beforeNow.bind({
      values: {
        issueDate: issueDate,
      },
    });

    expect(validator(issueDate, 10, "years")).to.be.false;
  });

  it("should be true when UK passport expires less than 10 years in the future", () => {
    const issueDate = moment()
      .add(10, "years")
      .subtract(1, "days")
      .format("YYYY-MM-DD");
    const validator = beforeNow.bind({
      values: {
        issueDate: issueDate,
      },
    });

    expect(validator(issueDate, 10, "years")).to.be.true;
  });

  it("should be true when UK passport is issued exactly 10 years in the future", () => {
    const issueDate = moment().add(10, "years").format("YYYY-MM-DD");
    const validator = beforeNow.bind({
      values: {
        issueDate: issueDate,
      },
    });

    expect(validator(issueDate, 10, "years")).to.be.true;
  });

  describe("formatAddress", () => {
    it("should format address correctly", () => {
      const address = {
        uprn: "11111",
        udprn: "1111111",
        address: "34, MOCK ROAD, PLACEHOLDER PARK, FAKESVILLE, FS6 5AQ",
        building_number: "34",
        thoroughfare_name: "MOCK ROAD",
        dependent_locality: "PLACEHOLDER PARK",
        post_town: "FAKESVILLE",
        postcode: "FS6 5AQ",
      };

      const formattedAddress = formatAddress(address);
      expect(formattedAddress).to.eql({
        line1: "34 Mock Road",
        line2: "Placeholder Park",
        line3: "Fakesville",
        postcode: "FS6 5AQ",
      });
    });
  });
});

describe("convertKeysToLowerCase", () => {
  it("should turn all uppercase item keys to lower case", () => {
    const data = {
      KEY1: "value1",
      KEY2: "value2",
      KEY3: "value3",
    };

    const convertedData = convertKeysToLowerCase(data);
    expect(Object.keys(convertedData)).to.deep.equal(["key1", "key2", "key3"]);
  });
});

const data2 = [
  {
    DPA: {
      UPRN: "906700195459",
      UDPRN: "9441189",
      ADDRESS: "0/1, 2, MIDDLESEX GARDENS, GLASGOW, G41 1EL",
      SUB_BUILDING_NAME: "0/1",
      BUILDING_NUMBER: "2",
      THOROUGHFARE_NAME: "MIDDLESEX GARDENS",
      POST_TOWN: "GLASGOW",
      POSTCODE: "G41 1EL",
      RPC: "1",
      X_COORDINATE: 257175,
      Y_COORDINATE: 664548,
      STATUS: "APPROVED",
      LOGICAL_STATUS_CODE: "1",
      CLASSIFICATION_CODE: "RD06",
      CLASSIFICATION_CODE_DESCRIPTION:
        "Self Contained Flat (Includes Maisonette / Apartment)",
      LOCAL_CUSTODIAN_CODE: 9067,
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: "CITY OF GLASGOW",
      COUNTRY_CODE: "S",
      COUNTRY_CODE_DESCRIPTION: "This record is within Scotland",
      POSTAL_ADDRESS_CODE: "D",
      POSTAL_ADDRESS_CODE_DESCRIPTION: "A record which is linked to PAF",
      BLPU_STATE_CODE: "2",
      BLPU_STATE_CODE_DESCRIPTION: "In use",
      TOPOGRAPHY_LAYER_TOID: "osgb1000040390989",
      WARD_CODE: "S13002971",
      PARENT_UPRN: "906700195468",
      LAST_UPDATE_DATE: "10/02/2016",
      ENTRY_DATE: "26/01/2004",
      BLPU_STATE_DATE: "14/08/2010",
      LANGUAGE: "EN",
      MATCH: 1,
      MATCH_DESCRIPTION: "EXACT",
      DELIVERY_POINT_SUFFIX: "1A",
    },
  },
  {
    DPA: {
      UPRN: "906700195466",
      UDPRN: "9441193",
      ADDRESS: "0/2, 2, MIDDLESEX GARDENS, GLASGOW, G41 1EL",
      SUB_BUILDING_NAME: "0/2",
      BUILDING_NUMBER: "2",
      THOROUGHFARE_NAME: "MIDDLESEX GARDENS",
      POST_TOWN: "GLASGOW",
      POSTCODE: "G41 1EL",
      RPC: "1",
      X_COORDINATE: 257175,
      Y_COORDINATE: 664548,
      STATUS: "APPROVED",
      LOGICAL_STATUS_CODE: "1",
      CLASSIFICATION_CODE: "RD06",
      CLASSIFICATION_CODE_DESCRIPTION:
        "Self Contained Flat (Includes Maisonette / Apartment)",
      LOCAL_CUSTODIAN_CODE: 9067,
      LOCAL_CUSTODIAN_CODE_DESCRIPTION: "CITY OF GLASGOW",
      COUNTRY_CODE: "S",
      COUNTRY_CODE_DESCRIPTION: "This record is within Scotland",
      POSTAL_ADDRESS_CODE: "D",
      POSTAL_ADDRESS_CODE_DESCRIPTION: "A record which is linked to PAF",
      BLPU_STATE_CODE: "2",
      BLPU_STATE_CODE_DESCRIPTION: "In use",
      TOPOGRAPHY_LAYER_TOID: "osgb1000040390989",
      WARD_CODE: "S13002971",
      PARENT_UPRN: "906700195468",
      LAST_UPDATE_DATE: "10/02/2016",
      ENTRY_DATE: "26/01/2004",
      BLPU_STATE_DATE: "14/08/2010",
      LANGUAGE: "EN",
      MATCH: 1,
      MATCH_DESCRIPTION: "EXACT",
      DELIVERY_POINT_SUFFIX: "1B",
    },
  },
];

describe("convertKeysToLowerCase", () => {
  it("should turn all uppercase item keys to lower case", () => {
    const data = data2;

    const convertedData = convertKeysToLowerCase(data);
    expect(Object.keys(convertedData)).to.deep.equal(["key1", "key2", "key3"]);
  });
});
