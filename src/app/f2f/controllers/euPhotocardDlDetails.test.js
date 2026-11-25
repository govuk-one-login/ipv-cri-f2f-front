import wizard from "hmpo-form-wizard";
import { expect } from "chai";
import { EuPhotocardDlController } from "./euPhotocardDlDetails.js";

describe("EuPhotocardDlController", () => {
  const euPhotocardDlController = new EuPhotocardDlController({
    route: "/test",
  });

  it("should be an instance of BaseController", () => {
    expect(euPhotocardDlController).to.be.an.instanceOf(wizard.Controller);
  });

  it("should not pad the year field", async () => {
    var value = "30";
    var offset = 0;

    var finalYear = await euPhotocardDlController._padYear(value, offset);

    expect(finalYear).to.equal("30");
  });
});
