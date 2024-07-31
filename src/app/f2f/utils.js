const moment = require("moment");
const { validators } = require("hmpo-form-wizard/lib/validation");

function formatDate(date, format, language) {
  const isValid = moment(date, format, true).isValid();

  if (isValid) {
    const dateTransform = new Date(date);
    let dateFormat = "en-GB";
    if (language === "cy") {
      dateFormat = "cy";
    }
    return dateTransform.toLocaleDateString(dateFormat, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } else {
    return "";
  }
}

function beforeNow(_value, timePeriod, timeUnit) {
  let dateFormat = "YYYY-MM-DD";
  let test = moment(_value, dateFormat);
  let comparator;
  // One additional day added so that the check is inclusive of the current date minus X time
  comparator = moment()
    .add(timePeriod, timeUnit)
    .add(1, "day")
    .format(dateFormat);

  return (
    _value === "" || (validators.date(_value) && test.isBefore(comparator))
  );
}

function convertKeysToLowerCase(obj) {
  if (Array.isArray(obj)) {
    return obj.map(item => convertKeysToLowerCase(item));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key.toLowerCase()] = convertKeysToLowerCase(obj[key]);
      return acc;
    }, {});
  }
  return obj;
}


function toTitleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

function formatAddress(address) {
  const formattedAddress = {
    line1: `${toTitleCase(address.building_number)} ${toTitleCase(address.thoroughfare_name)}`, 
    line2: toTitleCase(address.dependent_locality),
    line3: toTitleCase(address.post_town),
    postcode: address.postcode
  };
  return formattedAddress
}

module.exports = { formatDate, beforeNow, convertKeysToLowerCase, toTitleCase, formatAddress };
