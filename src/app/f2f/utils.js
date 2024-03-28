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

module.exports = { formatDate, beforeNow };
