const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const EeaIdentityCardController = require("./eeaIdentityCardDetails");

describe("EuIdentityCardController", () => {
  const eeaIdentityCardController = new EeaIdentityCardController({
    route: "/test",
  });

  it("should be an instance of BaseController", () => {
    expect(eeaIdentityCardController).to.be.an.instanceOf(BaseController);
  });

  it("should not pad the year field", async () => {
    var value = "30";
    var offset = 0;

    var finalYear = await eeaIdentityCardController._padYear(value, offset);

    expect(finalYear).to.equal("30");
  });
});
