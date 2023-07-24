module.exports = {
  ukPassportExpiryValidator(expiryDate) {
    const expiryDate = this.values[expiryDate]
    console.log("EXPIRY DATE: ", expiryDate)
    console.log("EXPIRY YEAR - INT: ", parseInt(expiryDate[6]))
    console.log("TODAY + 10 YEARS: ", new Date(new Date().getFullYear() + 10))

    return parseInt(expiryDate[6]) < (new Date(new Date().getFullYear() + 10)) ? false : true
  }
}