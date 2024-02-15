const { formatDate, beforeNow } = require('./utils')
const { expect } = require("chai");
const moment = require("moment");


describe('formatDate', () => {
  it('returns a YYYY-MM-DD date with language set to en as DD Month(English) YYYY', () => {
    expect(formatDate('1989-03-31', "en")).to.equal('31 March 1989');
  })

  it('returns a YYYY-MM-DD date with language set to cy as DD Month(Welsh) YYYY', () => {
    expect(formatDate('1989-03-31', "cy")).to.equal('31 Mawrth 1989');
  })

  it('returns a YYYYMM/DD date as Invalid date', () => {
    expect(formatDate('198903/31', "YYYY-MM-DD")).to.equal('Invalid Date');
  })

  it('should return an empty string if date is empty string', () => {
    expect(formatDate("", "YYYY-MM-DD")).to.equal(undefined);
  })

  it('should return an empty string if date is empty', () => {
    expect(formatDate(null, "YYYY-MM-DD")).to.equal(undefined);
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
