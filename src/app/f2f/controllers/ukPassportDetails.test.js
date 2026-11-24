import wizard from "hmpo-form-wizard";
import { expect } from "chai";
import { PassportDetailsController } from "./ukPassportDetails.js";

describe("PassportDetailsController", () => {
  const passportDetailsController = new PassportDetailsController({
    route: "/test",
  });

  it("should be an instance of BaseController", () => {
    expect(passportDetailsController).to.be.an.instanceOf(wizard.Controller);
  });

  it("should not pad the year field", async () => {
    var value = "30";
    var offset = 0;

    var finalYear = await passportDetailsController._padYear(value, offset);

    expect(finalYear).to.equal("30");
  });
});
