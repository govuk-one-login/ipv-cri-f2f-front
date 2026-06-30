const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const PostOfficeCustomerLetterController = require("./postOfficeCustomerLetter");

describe("CheckAddress controller", () => {
  const postOfficeCustomerLetterController = new PostOfficeCustomerLetterController({ route: "/test" });

  it("should be an instance of BaseController", () => {
    expect(postOfficeCustomerLetterController).to.be.an.instanceOf(BaseController);
  });
});
