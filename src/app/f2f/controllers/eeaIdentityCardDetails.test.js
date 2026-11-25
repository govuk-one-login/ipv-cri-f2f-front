import wizard from "hmpo-form-wizard";
import { expect } from "chai";
import { EeaIdentityCardDetailsController } from "./eeaIdentityCardDetails.js";

describe("EeaIdentityCardDetailsController", () => {
  const eeaIdentityCardDetailsController = new EeaIdentityCardDetailsController(
    {
      route: "/test",
    },
  );

  it("should be an instance of BaseController", () => {
    expect(eeaIdentityCardDetailsController).to.be.an.instanceOf(
      wizard.Controller,
    );
  });

  it("should not pad the year field", async () => {
    var value = "30";
    var offset = 0;

    var finalYear = await eeaIdentityCardDetailsController._padYear(
      value,
      offset,
    );

    expect(finalYear).to.equal("30");
  });
});
