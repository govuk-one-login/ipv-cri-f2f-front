const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const PassportDetailsController = require("./ukPassportDetails");

describe("PassportDetailsController", () => {
  const passportDetailsController = new PassportDetailsController({
    route: "/test",
  });

  it("should be an instance of BaseController", () => {
    expect(passportDetailsController).to.be.an.instanceOf(BaseController);
  });

  it("should not pad the year field", async () => {
    var value = "30";
    var offset = 0;

    var finalYear = await passportDetailsController._padYear(value, offset);

    expect(finalYear).to.equal("30");
  });
});
