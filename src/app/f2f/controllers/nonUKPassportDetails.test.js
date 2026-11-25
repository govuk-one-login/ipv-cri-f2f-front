import wizard from "hmpo-form-wizard";
import { expect } from "chai";
import { NonUKPassportDetailsController } from "./nonUKPassportDetails.js";

describe("NonUKPassportDetailsController", () => {
  const nonUKPassportDetailsController = new NonUKPassportDetailsController({
    route: "/test",
  });

  it("should be an instance of BaseController", () => {
    expect(nonUKPassportDetailsController).to.be.an.instanceOf(
      wizard.Controller,
    );
  });

  it("should not pad the year field", async () => {
    var value = "30";
    var offset = 0;

    var finalYear = await nonUKPassportDetailsController._padYear(
      value,
      offset,
    );

    expect(finalYear).to.equal("30");
  });
});
