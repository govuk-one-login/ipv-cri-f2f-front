module.exports = {
  generateSearchResultString: function (address) {
    const { buildingNames, streetNames, localityNames } =
      extractAddressFields(address);
    const fullBuildingName = buildingNames.join(" ");
    let fullStreetName;
    if (streetNames) {
      fullStreetName = streetNames.join(" ");
    }

    const fullLocality = localityNames.join(" ");
    if (fullStreetName) {
      return `${fullBuildingName} ${fullStreetName}, ${fullLocality}, ${address.postcode}`.trim();
    } else {
      return `${fullBuildingName}, ${fullLocality}, ${address.postcode}`.trim();
    }
  },

  generateHTMLofAddress: function (address) {
    const { buildingNames, streetNames, localityNames } =
      extractAddressFields(address);

    const fullBuildingName = buildingNames.join(" ");
    let fullStreetName;
    if (streetNames) {
      fullStreetName = streetNames.join(" ");
    }

    const fullLocality = localityNames.join(" ");

    let addressConfirm = [];

    if (fullBuildingName) {
      addressConfirm.push(fullBuildingName);
    }

    if (fullStreetName) {
      addressConfirm.push(fullStreetName);
    }

    if (fullLocality) {
      addressConfirm.push(fullLocality);
    }

    if (address.postcode) {
      addressConfirm.push(address.postcode);
    }
    return addressConfirm.join("<br>");
  },

  titleCaseAddresses: function (address) {
    const titleCaseAddress = {};
    for (let key in address) {
      if (typeof address[key] === "string" && key !== "postcode") {
        titleCaseAddress[key] = address[key].replace(
          /\w\S*/g,
          (text) =>
            text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
        );
      } else {
        titleCaseAddress[key] = address[key];
      }
    }
    return titleCaseAddress;
  },
};

function extractAddressFields(address) {
  let buildingNames = [];
  let streetNames = [];
  let localityNames = [];

  // handle building name
  if (address.department_name) {
    buildingNames.push(address.department_name);
  }
  if (address.organisation_name) {
    buildingNames.push(address.organisation_name);
  }
  if (address.sub_building_name) {
    buildingNames.push(address.sub_building_name);
  }
  if (address.building_name) {
    buildingNames.push(address.building_name);
  }

  // street names
  if (address.building_number) {
    streetNames.push(address.building_number);
  }
  if (address.dependent_street_name) {
    streetNames.push(address.dependent_street_name);
  }
  if (address.thoroughfare_name) {
    streetNames.push(address.thoroughfare_name);
  }

  // locality names
  if (address.double_dependent_locality) {
    localityNames.push(address.double_dependent_locality);
  }
  if (address.dependent_locality) {
    localityNames.push(address.dependent_locality);
  }
  if (address.post_town) {
    localityNames.push(address.post_town);
  }
  return { buildingNames, streetNames, localityNames };
}
