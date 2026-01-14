const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const NonUKPassportDetailsController = require("./nonUKPassportDetails");

describe("NonUKPassportDetailsController", () => {
  const nonUKPassportDetailsController = new NonUKPassportDetailsController({
    route: "/test",
  });

  it("should be an instance of BaseController", () => {
    expect(nonUKPassportDetailsController).to.be.an.instanceOf(BaseController);
  });

  it("should not pad the year field", async () => {
    var value = "30";
    var offset = 0;

    var finalYear = await nonUKPassportDetailsController._padYear(
      value,
      offset
    );

    expect(finalYear).to.equal("30");
  });
});
