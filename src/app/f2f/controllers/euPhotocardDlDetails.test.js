const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const EuPhotocardDlController = require("./euPhotocardDlDetails");

describe("EuPhotocardDlController", () => {
  const euPhotocardDlController = new EuPhotocardDlController({
    route: "/test",
  });

  it("should be an instance of BaseController", () => {
    expect(euPhotocardDlController).to.be.an.instanceOf(BaseController);
  });

  it("should not pad the year field", async () => {
    var value = "30";
    var offset = 0;

    var finalYear = await euPhotocardDlController._padYear(value, offset);

    expect(finalYear).to.equal("30");
  });
});
