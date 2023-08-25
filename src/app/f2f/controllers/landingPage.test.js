const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const LandingPageController = require('./landingPage');

describe("LandingPage", () => {
  let landingPageController;

  let req;
  let res;
  let next;

  beforeEach(() => {
    const setup = setupDefaultMocks();
    req = setup.req;
    res = setup.res;
    next = setup.next;

    landingPageController = new LandingPageController({ route: "/test" });
  });

  it("should be an instance of BaseController", () => {
    expect(landingPageController).to.be.an.instanceOf(BaseController);
  });

  describe("#saveValues", () => {
    it("should save the values to the sessionModel", async () => {
      req.session.tokenId = "123abc"

      await landingPageController.saveValues(req, res, next);
      expect(next).to.have.been.calledOnce;
    })
  })

})

