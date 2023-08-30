const BaseController = require("hmpo-form-wizard").Controller;
const {APP} = require("../../../lib/config");
const { expect } = require("chai");
const { afterEach } = require("mocha");
const PhotoIdSelectionThinFileController = require('./photoIdSelectionThinFile');

describe("PhotoIdSelectionThinFileController", () => {
  const photoIdSelectionThinFileController = new PhotoIdSelectionThinFileController({ route: '/test' });
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
    expect(photoIdSelectionThinFileController).to.be.an.instanceOf(BaseController);
  });

  describe("#saveValues", () => {
    it("should save values to sessionModel when selected document type is UK_PASSPORT", async () => {
      req.form.values.photoIdChoiceThinFile = APP.PHOTO_ID_OPTIONS.UK_PASSPORT;

      await photoIdSelectionThinFileController.saveValues(req, res, next);
      const selectedDocumentValue = req.sessionModel.get("photoIdChoice");
      const selectedDocument = req.sessionModel.get("selectedDocument");
      const changeUrl = req.sessionModel.get("changeUrl");

      expect(next).to.have.been.calledOnce;
      expect(selectedDocumentValue).to.equal(APP.PHOTO_ID_OPTIONS.UK_PASSPORT);
      expect(selectedDocument).to.equal("UK passport");
      expect(changeUrl).to.equal("uk-passport-expire");
    });

    it("should save values to sessionModel when selected document type is NON_UK_PASSPORT", async () => {
      req.form.values.photoIdChoiceThinFile = APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT;

      await photoIdSelectionThinFileController.saveValues(req, res, next);
      const selectedDocumentValue = req.sessionModel.get("photoIdChoice");
      const selectedDocument = req.sessionModel.get("selectedDocument");
      const changeUrl = req.sessionModel.get("changeUrl");

      expect(next).to.have.been.calledOnce;
      expect(selectedDocumentValue).to.equal(APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT);
      expect(selectedDocument).to.equal("Non-UK passport");
      expect(changeUrl).to.equal("non-uk-passport-expire");
    });

    it("should save values to sessionModel when selected document type is NO_PHOTO_ID", async () => {
      req.form.values.photoIdChoiceThinFile = APP.PHOTO_ID_OPTIONS.NO_PHOTO_ID;

      await photoIdSelectionThinFileController.saveValues(req, res, next);
      const selectedDocumentValue = req.sessionModel.get("photoIdChoice");
      const selectedDocument = req.sessionModel.get("selectedDocument");
      const changeUrl = req.sessionModel.get("changeUrl");

      expect(next).to.have.been.calledOnce;
      expect(selectedDocumentValue).to.equal(APP.PHOTO_ID_OPTIONS.NO_PHOTO_ID);
      expect(selectedDocument).to.equal(undefined);
      expect(changeUrl).to.equal(undefined);
    });

    it("when user selects no option, should call next with invalid action error", async () => {
      req.form.values.photoIdChoice = undefined;

      await photoIdSelectionThinFileController.saveValues(req, res, next);

      const nextError = next.firstArg;
      const nextErrMessage = ("photo-id-selection: Invalid action " + undefined);

      expect(next).to.have.been.calledOnce;
      expect(nextError).to.be.instanceOf(Error);
      expect(nextError.message).to.equal(nextErrMessage);
    });
  });
});
