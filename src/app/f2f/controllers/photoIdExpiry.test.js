const BaseController = require("hmpo-form-wizard").Controller;
const { APP } = require("../../../lib/config");
const { expect } = require("chai");
const { afterEach } = require("mocha");
const PhotoIdExpiryController = require('./photoIdExpiry');

describe("PhotoIdExpiryController", () => {
  const photoIdExpiryController = new PhotoIdExpiryController({ route: '/test' });
  let req;
  let res;
  let next;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    const setup = setupDefaultMocks();
    req = setup.req;
    res = setup.res;
    next = setup.next;
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should be an instance of BaseController", () => {
    expect(photoIdExpiryController).to.be.an.instanceOf(BaseController);
  });

  describe("saveValues", () => {
    it("should save values to sessionModel according to selected option", async () => {

      req.form.values.photoIdExpiryChoice = APP.PHOTO_ID_EXPIRY_OPTIONS.RE_ENTER_DETAILS;

      await photoIdExpiryController.saveValues(req, res, next);
      const selectedOption = req.sessionModel.get("photoIdExpiryChoice")

      expect(next).to.have.been.calledOnce;
      expect(selectedOption).to.equal(APP.PHOTO_ID_EXPIRY_OPTIONS.RE_ENTER_DETAILS)
    });
  });

  describe("saveValues when user selects no option", () => {
    it("should call next with error", async () => {

      req.form.values.photoIdExpiryChoice = undefined;

      await photoIdExpiryController.saveValues(req, res, next);
      const nextError = next.firstArg;
      const nextErrMessage = ("photo-id-expiry: Invalid action " + undefined);
      expect(next).to.have.been.calledOnce;
      expect(nextError).to.be.instanceOf(Error);
      expect(nextError.message).to.equal(nextErrMessage);
    });
  });
});
