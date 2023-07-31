const sinon = require('sinon');
const { expect } = require("chai");
const { ukPassportExpiryValidator } = require("./fieldsHelper");

describe('dateValidator', function () {
  let clock;

  before(function() {
    clock = sinon.useFakeTimers(new Date(2023, 7, 30));
  });

  after(function () {
    clock.restore();
  });

  it('should return true for valid dates within 10 years', () => {
    const validDate = new Date(2023, 7, 31)
    expect(ukPassportExpiryValidator(validDate)).to.be.true;
  });

  it('should return false for dates more than 10 years in the future', () => {
    const futureDate = new Date(2035, 7, 31);
    expect(ukPassportExpiryValidator(futureDate)).to.be.false;
  })

  it('should return false for an invalid dates', () => {
    const invalidDate = 'invalid date';
    expect(ukPassportExpiryValidator(invalidDate)).to.be.false
  })
})