const moment = require("moment");
const { validators } = require("hmpo-form-wizard/lib/validation");

/**
 * formatDate takes a date (e.g. '1994-05-26') and the format it is in (e.g. 'YYYY-MM-DD)
 * If this is a valid date, it returns a string of the date in DD MM YYYY format
 * If the date isn't valid (no input, empty string) then an empty string is returned
 * @param date, @param string
 * @returns {string}
 */
function formatDate(date, format) {
  const isValid = moment(date, format,true).isValid();

  if(isValid){
    const check = moment(date, format);
    const month = check.format('MM');
    const day   = check.format('DD');
    const year  = check.format('YYYY');
    return day + ' ' + month + ' ' + year;
  } else{
    return ""
  }
}

function beforeNow(_value, timePeriod, timeUnit) {
  let dateFormat = "YYYY-MM-DD";
  let test = moment(_value, dateFormat);
  let comparator;
  // One additional day added so that the check is inclusive of the current date minus X time
  comparator = moment().add(timePeriod, timeUnit).add(1, 'day').format(dateFormat);

  return (
    _value === "" || (validators.date(_value) && test.isBefore(comparator))
  );
}

module.exports = { formatDate, beforeNow };