const { expect } = require("chai");
const {
  generateSearchResultString,
  generateHTMLofAddress,
  titleCaseAddresses,
} = require("./addressPresenter");

const userSelectedAddress = {
  organisation_name: "A COMPANY",
  department_name: "SOME DEPARTMENT",
  building_name: "THAT BUILDING",
  sub_building_name: "ROOM 5",
  building_number: "1",
  dependent_street_name: "OUTER STREET",
  double_dependent_locality: "DOUBLE DEPENDENT TOWN",
  dependent_locality: "DEPENDENT TOWN",
  post_town: "TOWN",
  postcode: "ABC 123",
};

const titleCasedAddress = {
  organisation_name: "A Company",
  department_name: "Some Department",
  building_name: "That Building",
  sub_building_name: "Room 5",
  building_number: "1",
  dependent_street_name: "Outer Street",
  double_dependent_locality: "Double Dependent Town",
  dependent_locality: "Dependent Town",
  post_town: "Town",
  postcode: "ABC 123",
};

const titleCasedAddressWithStreet = {
  ...titleCasedAddress,
  thoroughfare_name: "Inner street",
};

const buildingText = [
  titleCasedAddress.department_name,
  titleCasedAddress.organisation_name,
  titleCasedAddress.sub_building_name,
  titleCasedAddress.building_name,
].join(" ");

const localityText = [
  titleCasedAddress.double_dependent_locality,
  titleCasedAddress.dependent_locality,
  titleCasedAddress.post_town,
].join(" ");

describe("Generate search result string", () => {
  const streetText = [
    buildingText,
    titleCasedAddress.building_number,
    titleCasedAddress.dependent_street_name,
  ].join(" ");

  it("should generate search result string without street name", () => {
    expect(generateSearchResultString(titleCasedAddress)).to.equal(
      [streetText, localityText, titleCasedAddress.postcode].join(", ")
    );
  });

  it("should generate search result string with street name", () => {
    expect(generateSearchResultString(titleCasedAddressWithStreet)).to.equal(
      [
        [streetText, titleCasedAddressWithStreet.thoroughfare_name].join(" "),
        localityText,
        titleCasedAddress.postcode,
      ].join(", ")
    );
  });
});

describe("Generate HTML of address", () => {
  it("should generate HTML without street name", () => {
    expect(generateHTMLofAddress(titleCasedAddress)).to.equal(
      [
        [
          buildingText,
          [
            titleCasedAddress.building_number,
            titleCasedAddress.dependent_street_name,
          ].join(" "),
        ].join("<br>"),
        localityText,
        titleCasedAddress.postcode,
      ].join("<br>")
    );
  });

  it("should generate HTML with street name", () => {
    expect(generateHTMLofAddress(titleCasedAddressWithStreet)).to.equal(
      [
        [
          buildingText,
          [
            titleCasedAddress.building_number,
            titleCasedAddress.dependent_street_name,
            titleCasedAddressWithStreet.thoroughfare_name,
          ].join(" "),
        ].join("<br>"),
        localityText,
        titleCasedAddress.postcode,
      ].join("<br>")
    );
  });
});

describe("titleCaseAddresses", () => {
  it("should title case addresses", () => {
    expect(titleCaseAddresses(userSelectedAddress)).to.deep.equal(
      titleCasedAddress
    );
  });

  const testCases = [
    { postCodeValue: "PoSt cOde" },
    { postCodeValue: "PO51 CDE" },
    { postCodeValue: "po51 cde" },
  ];

  it("should not title case postalCode field for postcode fields", () => {
    testCases.forEach((testCase) => {
      userSelectedAddress.postcode = testCase.postCodeValue;
      titleCasedAddress.postcode = testCase.postCodeValue;
      expect(titleCaseAddresses(userSelectedAddress)).to.deep.equal(
        titleCasedAddress
      );
    });
  });

  it("should return empty string if address is empty", () => {
    const returnedAddresses = titleCaseAddresses({});
    expect(returnedAddresses).to.deep.equal({});
  });

  it("should not attempt to title case null fields", () => {
    const returnedAddresses = titleCaseAddresses({ buildingName: null });
    expect(returnedAddresses).to.deep.equal({ buildingName: null });
  });

  it("should not attempt to title case non string fields", () => {
    const returnedAddresses = titleCaseAddresses({
      buildingNumber: 1,
      booleanField: true,
    });
    expect(returnedAddresses).to.deep.equal({
      buildingNumber: 1,
      booleanField: true,
    });
  });
});
