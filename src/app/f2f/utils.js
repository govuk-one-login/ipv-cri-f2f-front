const moment = require("moment");

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

function countryListValidator(values) {
  for (val in values) {
    if (val === "choose") {
      console.log("no country selected", value)
      return true
    } else {
      console.log("actual country selected")
      return false
  }
}
  // if (value === "choose") {
  //   console.log("no country selected", value)
  //   return true
  // } else {
  //   console.log("actual country selected")
  //   return false
  // }
  
}

module.exports = { formatDate, countryListValidator };