const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const PhotocardDlController = require('./ukPhotocardDl');

describe("PhotocardDlController", () => {
  const photocardDlController = new PhotocardDlController({ route: '/test' });

  it("should be an instance of BaseController", () => {
    expect(photocardDlController).to.be.an.instanceOf(BaseController);
  });

})