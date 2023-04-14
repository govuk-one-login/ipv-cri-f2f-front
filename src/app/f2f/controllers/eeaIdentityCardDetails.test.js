const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const EeaIdentityCardController = require('./eeaIdentityCardDetails');

describe("EuIdentityCardController", () => {
  const eeaIdentityCardController = new EeaIdentityCardController({ route: '/test' });

  it("should be an instance of BaseController", () => {
    expect(eeaIdentityCardController).to.be.an.instanceOf(BaseController);
  });

})