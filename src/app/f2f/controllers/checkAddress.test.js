const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const CheckAddressController = require("./checkAddress");

describe("CheckAddress controller", () => {
  const checkAddressController = new CheckAddressController({ route: "/test" });
  
  it("should be an instance of BaseController", () => {
    expect(checkAddressController).to.be.an.instanceOf(BaseController);
  });
});