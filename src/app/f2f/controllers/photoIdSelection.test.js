const BaseController = require("hmpo-form-wizard").Controller;
const {APP} = require("../../../lib/config");
const { expect } = require("chai");
const { afterEach } = require("mocha");
const PhotoIdSelectionController = require('./photoIdSelection');

describe("PhotoIdSelectionController", () => {
  const photoIdSelectionController = new PhotoIdSelectionController({ route: '/test' });
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
    expect(photoIdSelectionController).to.be.an.instanceOf(BaseController);
  });

  describe("saveValues", () => {
    it("should save values to sessionModel according to selected document type - UK Passport", async () => {

      req.form.values.photoIdChoice = APP.PHOTO_ID_OPTIONS.UK_PASSPORT;

        await photoIdSelectionController.saveValues(req, res, next);
        const selectedDocumentValue = req.sessionModel.get("photoIdChoice")
        const selectedDocument = req.sessionModel.get("selectedDocument");
        const changeUrl = req.sessionModel.get("changeUrl");

        expect(next).to.have.been.calledOnce;
        expect(selectedDocumentValue).to.equal(APP.PHOTO_ID_OPTIONS.UK_PASSPORT)
        expect(selectedDocument).to.equal("UK passport");
        expect(changeUrl).to.equal("uk-passport-expire");
    });

    it("should save values to sessionModel according to selected document type - BRP", async () => {

      req.form.values.photoIdChoice = APP.PHOTO_ID_OPTIONS.BRP;

        await photoIdSelectionController.saveValues(req, res, next);
        const selectedDocumentValue = req.sessionModel.get("photoIdChoice")
        const selectedDocument = req.sessionModel.get("selectedDocument");
        const changeUrl = req.sessionModel.get("changeUrl");

        expect(next).to.have.been.calledOnce;
        expect(selectedDocumentValue).to.equal(APP.PHOTO_ID_OPTIONS.BRP)
        expect(selectedDocument).to.equal("Biometric residence permit (BRP)");
        expect(changeUrl).to.equal("biometric-residence-permit-expire");
    });

    it("should save values to sessionModel according to selected document type - UK Driving Licence", async () => {

      req.form.values.photoIdChoice = APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL;

        await photoIdSelectionController.saveValues(req, res, next);
        const selectedDocumentValue = req.sessionModel.get("photoIdChoice")
        const selectedDocument = req.sessionModel.get("selectedDocument");
        const changeUrl = req.sessionModel.get("changeUrl");

        expect(next).to.have.been.calledOnce;
        expect(selectedDocumentValue).to.equal(APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL)
        expect(selectedDocument).to.equal("UK photocard driving licence");
        expect(changeUrl).to.equal("uk-driving-licence-expire");
    });

    it("should save values to sessionModel according to selected document type - Non-UK Passport", async () => {

      req.form.values.photoIdChoice = APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT;

        await photoIdSelectionController.saveValues(req, res, next);
        const selectedDocumentValue = req.sessionModel.get("photoIdChoice")
        const selectedDocument = req.sessionModel.get("selectedDocument");
        const changeUrl = req.sessionModel.get("changeUrl");

        expect(next).to.have.been.calledOnce;
        expect(selectedDocumentValue).to.equal(APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT)
        expect(selectedDocument).to.equal("Non-UK passport");
        expect(changeUrl).to.equal("non-uk-passport-expire");
    });

    it("should save values to sessionModel according to selected document type - EU Driving Licence", async () => {

      req.form.values.photoIdChoice = APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL;

        await photoIdSelectionController.saveValues(req, res, next);
        const selectedDocumentValue = req.sessionModel.get("photoIdChoice")
        const selectedDocument = req.sessionModel.get("selectedDocument");
        const changeUrl = req.sessionModel.get("changeUrl");

        expect(next).to.have.been.calledOnce;
        expect(selectedDocumentValue).to.equal(APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL)
        expect(selectedDocument).to.equal("EU photocard driving licence");
        expect(changeUrl).to.equal("eu-driving-licence-expire");
    });

    it("should save values to sessionModel according to selected document type - EEA Identity Card", async () => {

      req.form.values.photoIdChoice = APP.PHOTO_ID_OPTIONS.EEA_IDENTITY_CARD;

        await photoIdSelectionController.saveValues(req, res, next);
        const selectedDocumentValue = req.sessionModel.get("photoIdChoice")
        const selectedDocument = req.sessionModel.get("selectedDocument");
        const changeUrl = req.sessionModel.get("changeUrl");

        expect(next).to.have.been.calledOnce;
        expect(selectedDocumentValue).to.equal(APP.PHOTO_ID_OPTIONS.EEA_IDENTITY_CARD)
        expect(selectedDocument).to.equal("National identity card from an EEA country");
        expect(changeUrl).to.equal("national-identity-card-expire");
    });

    it("should abort the journey if no photo ID is selected", async () => {
      req.form.values.photoIdChoice = APP.PHOTO_ID_OPTIONS.NO_PHOTO_ID;

      await photoIdSelectionController.saveValues(req, res, next);
      const selectedDocumentValue = req.sessionModel.get("photoIdChoice");

      expect(next).to.have.been.calledOnce;
      expect(selectedDocumentValue).to.equal("noPhotoId");
    })
  });

  describe("saveValues when user selects no option", () => {
    it("should call next with error", async () => {

      req.form.values.photoIdChoice = undefined;

        await photoIdSelectionController.saveValues(req, res, next);
        const nextError = next.firstArg;
        const nextErrMessage = ("photo-id-selection: Invalid action " + undefined);
        expect(next).to.have.been.calledWith(nextError);
        expect(nextError).to.be.instanceOf(Error);
        expect(nextError.message).to.equal(nextErrMessage);
    });
  });
  });
