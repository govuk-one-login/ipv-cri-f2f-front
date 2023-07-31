const moment = require('moment');

module.exports = {
  ukPassportExpiryValidator(expiryDate) {
    const userDate = moment(expiryDate, "YYYY-MM-DD")

    if (!userDate.isValid()) {
      return false;
    }
    
    const currentDate = moment();

    const maxFutureDate = currentDate.clone().add(10, 'years')
    if (userDate.isAfter(maxFutureDate)) {
      return false
    }

    return true;
  }
}