const { expect } = require("chai");
const {
  generateSearchResultString,
  generateHTMLofAddress,
} = require("./addressPresenter");

const address = {
  organisation_name: "A Company",
  department_name: "Some Department",
  building_name: "That Building",
  sub_building_name: "Room 5",
  building_number: "1",
  dependent_street_name: "Outer street",
  double_dependent_locality: "Double dependent town",
  dependent_locality: "Dependent town",
  post_town: "Town",
  postcode: "ABC 123",
};

const addressWithStreet = {
  ...address,
  thoroughfare_name: "Inner street",
};

const buildingText = [
  address.department_name,
  address.organisation_name,
  address.sub_building_name,
  address.building_name,
].join(" ");

const localityText = [
  address.double_dependent_locality,
  address.dependent_locality,
  address.post_town,
].join(" ");

describe("Generate search result string", () => {
  const streetText = [
    buildingText,
    address.building_number,
    address.dependent_street_name,
  ].join(" ");

  it("should generate search result string without street name", () => {
    expect(generateSearchResultString(address)).to.equal(
      [streetText, localityText, address.postcode].join(", ")
    );
  });

  it("should generate search result string with street name", () => {
    expect(generateSearchResultString(addressWithStreet)).to.equal(
      [
        [streetText, addressWithStreet.thoroughfare_name].join(" "),
        localityText,
        address.postcode,
      ].join(", ")
    );
  });
});

describe("Generate HTML of address", () => {
  it("should generate HTML without street name", () => {
    expect(generateHTMLofAddress(address)).to.equal(
      [
        [
          buildingText,
          [address.building_number, address.dependent_street_name].join(" "),
        ].join("<br>"),
        localityText,
        address.postcode,
      ]
        .join(",<br>")
        .concat("<br>")
    );
  });

  it("should generate HTML with street name", () => {
    expect(generateHTMLofAddress(addressWithStreet)).to.equal(
      [
        [
          buildingText,
          [
            address.building_number,
            address.dependent_street_name,
            addressWithStreet.thoroughfare_name,
          ].join(" "),
        ].join("<br>"),
        localityText,
        address.postcode,
      ]
        .join(",<br>")
        .concat("<br>")
    );
  });
});
