import wizard from "hmpo-form-wizard";
import { expect } from "chai";
import { CheckAddressController } from "./checkAddress.js";

describe("CheckAddress controller", () => {
  const checkAddressController = new CheckAddressController({ route: "/test" });

  it("should be an instance of BaseController", () => {
    expect(checkAddressController).to.be.an.instanceOf(wizard.Controller);
  });
});
