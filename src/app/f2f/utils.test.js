const { formatDate, beforeNow } = require('./utils')
const { expect } = require("chai");
const moment = require("moment");


describe('formatDate', () => {
  it('returns a YYYY-MM-DD date as DD MM YYYY', () => {
    expect(formatDate('1989-03-31', "YYYY-MM-DD")).to.equal('31 03 1989');
  })

  it('returns a YYYY-MM-DD date as DD MM YYYY', () => {
    expect(formatDate('198903/31', "YYYY-MM-DD")).to.equal('');
  })

  it('should return an empty string if date is empty string', () => {
    expect(formatDate("","YYYY-MM-DD")).to.equal("");
  })

  it('should return an empty string if date is empty', () => {
    expect(formatDate(null,"YYYY-MM-DD")).to.equal("");
  })
})

describe('beforeNow', () => {

  it("should be false when UK passport issued greater than 10 years in the future", () => {
    const issueDate = moment()
      .add(10, "years")
      .add(1, "days")
      .format("YYYY-MM-DD");
    const validator = beforeNow.bind({
      values: {
        issueDate: issueDate
      }
    });

    expect(validator(issueDate, 10, "years")).to.be.false;
  });

  it("should be true when UK passport expires less than 10 years in the future", () => {
    const issueDate = moment()
      .add(10, "years")
      .subtract(1, "days")
      .format("YYYY-MM-DD");
    const validator = beforeNow.bind({
      values: {
        issueDate: issueDate
      }
    });

    expect(validator(issueDate, 10, "years")).to.be.true;
  });

  it("should be true when UK passport is issued exactly 10 years in the future", () => {
    const issueDate = moment().add(10, "years").format("YYYY-MM-DD");
    const validator = beforeNow.bind({
      values: {
        issueDate: issueDate
      }
    });

    expect(validator(issueDate, 10, "years")).to.be.true;
  });

})
