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
    req.session.tokenId = "123abc";
    req.axios.get = sinon.fake.resolves({ data: { evidence_requested: {strengthScore: 3 } } });

    landingPageController = new LandingPageController({ route: "/test" });

    sinon.stub(console, "log");
  });

  afterEach(() => {
    console.log.restore();
  });

  it("should be an instance of BaseController", () => {
    expect(landingPageController).to.be.an.instanceOf(BaseController);
  });

  describe("#saveValues", () => {
    it("should set isThinFileUser to false by default", async () => {
      req.sessionModel.set = sinon.fake();
      await landingPageController.saveValues(req, res, next);
      expect(req.sessionModel.set).to.have.been.calledWith("isThinFileUser", false);
    });

    it("should fetch session configuration", async () => {
      await landingPageController.saveValues(req, res, next);
      expect(req.axios.get).to.have.been.calledWith("/sessionConfiguration", {
        headers: {
          "x-govuk-signin-session-id": req.session.tokenId,
        }
      });
    });

    it("should log error if session configuration can't be fetched", async () => {
      req.axios.get = sinon.fake.rejects("Error fetching");
      await landingPageController.saveValues(req, res, next);
      expect(console.log).to.have.been.calledWith("Error calling /sessionConfiguration");
    });

    it("if strength score is 4 isThinFileUser is set to true", async () => {
      req.sessionModel.set = sinon.fake();
      req.axios.get = sinon.fake.resolves({ data: { evidence_requested: {strengthScore: 4 } } });
      await landingPageController.saveValues(req, res, next);
      expect(req.sessionModel.set).to.have.been.calledWith("isThinFileUser", true);
    });

    it("should save the values to the sessionModel if all is successful", async () => {
      const saveValuesStub = sinon.stub(BaseController.prototype, "saveValues");
      await landingPageController.saveValues(req, res, next);
      expect(saveValuesStub).to.have.been.calledWith(req, res, next);
    });
  });
});
