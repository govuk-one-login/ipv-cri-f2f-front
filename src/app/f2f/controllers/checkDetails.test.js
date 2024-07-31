const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const CheckDetailsController = require("./checkDetails");
const {
  API: {
    PATHS: { SAVE_F2FDATA },
  },
  APP: { PHOTO_ID_OPTIONS },
} = require("../../../lib/config");

describe("CheckDetails controller", () => {
  let checkDetailsController;
  let req;
  let res;
  let next;

  beforeEach(() => {
    const setup = setupDefaultMocks();
    req = setup.req;
    res = setup.res;
    next = setup.next;

    checkDetailsController = new CheckDetailsController({ route: "/test" });
    req.session.tokenId = 123456;
    sinon.stub(console, "log");
    sinon.stub(console, "error");
  });

  afterEach(() => {
    console.log.restore();
    console.error.restore();
  });

  it("should be an instance of BaseController", () => {
    expect(checkDetailsController).to.be.an.instanceOf(BaseController);
  });

  describe("#locals", () => {
    let prototypeSpy;
    let error;
    let locals;
    let superLocals;

    beforeEach(() => {
      prototypeSpy = sinon.stub(BaseController.prototype, "locals");
      BaseController.prototype.locals.callThrough();
    });

    afterEach(() => {
      prototypeSpy.restore();
    });

    beforeEach(() => {
      error = new Error("Random error");
      superLocals = {
        superKey: "superValue",
      };
      locals = {
        key: "value",
        translate: (key) => key,
      };

      req.form.values.postOfficeDetails = [
        {
          value: "1",
          text: "BRANCH NAME 1",
          hint: {
            text: "NAME and POSTCODE 1",
          },
        },
        {
          value: "2",
          text: "BRANCH NAME 2",
          hint: {
            text: "NAME and POSTCODE 2",
          },
        },
        {
          value: "3",
          text: "BRANCH NAME 3",
          hint: {
            text: "NAME and POSTCODE 3",
          },
        },
        {
          value: "4",
          text: "BRANCH NAME 4",
          hint: {
            text: "NAME and POSTCODE 4",
          },
        },
        {
          value: "5",
          text: "BRANCH NAME 5",
          hint: {
            text: "NAME and POSTCODE 5",
          },
        },
      ];
      req.form.values.payLoadValues = {
        location0: {
          addressWithoutPostCode: "Address for location 0",
          postcode: "G0 0ED",
          latitude: "100000",
          longitude: "-100000",
          fadCode: "0100110",
        },
        location1: {
          addressWithoutPostCode: "Address for location 1",
          postcode: "G1 1ED",
          latitude: "100000",
          longitude: "-100000",
          fadCode: "0540110",
        },
        location2: {
          addressWithoutPostCode: "Address for location 2",
          postcode: "G2 2ED",
          latitude: "100000",
          longitude: "-100000",
          fadCode: "0550108",
        },
        location3: {
          addressWithoutPostCode: "Address for location 3",
          postcode: "G3 3ED",
          latitude: "100000",
          longitude: "-100000",
          fadCode: "2350076",
        },
        location4: {
          addressWithoutPostCode: "Address for location 4",
          postcode: "G4 4ED",
          latitude: "100000",
          longitude: "-100000",
          fadCode: "0080101",
        },
      };
      res.locals = locals;
      BaseController.prototype.locals.yields(error, superLocals);
    });

    [
      { branch: "1", detailsIndex: 0 },
      { branch: "2", detailsIndex: 1 },
      { branch: "3", detailsIndex: 2 },
      { branch: "4", detailsIndex: 3 },
      { branch: "5", detailsIndex: 4 },
    ].forEach(({ branch, detailsIndex }) => {
      it(`when the user has selected post office ${branch}, details are updated correctly`, async () => {
        const postOfficeDetails =
          req.form.values.postOfficeDetails[detailsIndex];
        const payLoadValues =
          req.form.values.payLoadValues[`location${detailsIndex}`];
        req.form.values.branches = branch;

        await checkDetailsController.locals(req, res, next);

        expect(req.sessionModel.get("postOfficeName")).to.equal(
          postOfficeDetails.text
        );
        expect(req.sessionModel.get("postOfficeAddress")).to.equal(
          postOfficeDetails.hint.text
        );
        expect(req.sessionModel.get("postOfficePostcode")).to.equal(
          payLoadValues.postcode
        );
        expect(
          req.sessionModel.get("postOfficeAddressWithoutPostCode")
        ).to.equal(payLoadValues.addressWithoutPostCode);
        expect(req.sessionModel.get("postOfficeLatitude")).to.equal(
          payLoadValues.latitude
        );
        expect(req.sessionModel.get("postOfficeLongitude")).to.equal(
          payLoadValues.longitude
        );
        expect(req.sessionModel.get("postOfficeFadCode")).to.equal(
          payLoadValues.fadCode
        );
      });
    });

    [
      {
        photoIdChoice: PHOTO_ID_OPTIONS.UK_PASSPORT,
        expiryDateKey: "ukPassportExpiryDate",
      },
      { photoIdChoice: PHOTO_ID_OPTIONS.BRP, expiryDateKey: "brpExpiryDate" },
      {
        photoIdChoice: PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL,
        expiryDateKey: "ukPhotocardDlExpiryDate",
      },
    ].forEach(({ photoIdChoice, expiryDateKey }) => {
      it(`when photoIdChoice is ${photoIdChoice} countryCode and expiryDate are set correctly`, async () => {
        req.form.values.branches = "1";
        req.form.values.photoIdChoice = photoIdChoice;
        req.form.values[expiryDateKey] = "01/01/2030";

        await checkDetailsController.locals(req, res, next);

        expect(req.sessionModel.get("countryCode")).to.equal("GBR");
        expect(req.sessionModel.get("expiryDate")).to.equal("01/01/2030");
        expect(req.sessionModel.get("idHasExpiryDate")).to.equal(undefined);
        expect(req.sessionModel.get("addressCheck")).to.equal(undefined);
        expect(req.sessionModel.get("country")).to.equal(undefined);
      });
    });

    it(`when photoIdChoice is ${PHOTO_ID_OPTIONS.NON_UK_PASSPORT} all details are set correctly`, async () => {
      req.form.values.branches = "1";
      req.form.values.photoIdChoice = PHOTO_ID_OPTIONS.NON_UK_PASSPORT;
      req.form.values.nonUKPassportExpiryDate = "01/01/2030";
      req.form.values.idHasExpiryDate = true;
      req.form.values.nonUkPassportCountrySelector = "DEU";

      await checkDetailsController.locals(req, res, next);

      expect(req.sessionModel.get("countryCode")).to.equal("DEU");
      expect(req.sessionModel.get("country")).to.equal("countries.DEU");
      expect(req.sessionModel.get("expiryDate")).to.equal("01/01/2030");
      expect(req.sessionModel.get("idHasExpiryDate")).to.equal(true);
      expect(req.sessionModel.get("addressCheck")).to.equal(undefined);
    });

    it(`when photoIdChoice is ${PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL} all details are set correctly`, async () => {
      req.form.values.branches = "1";
      req.form.values.photoIdChoice = PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL;
      req.form.values.euPhotocardDlExpiryDate = "01/01/2030";
      req.form.values.idHasExpiryDate = true;
      req.form.values.euDrivingLicenceCountrySelector = "DEU";
      req.form.values.euPhotocardDlAddressCheck = true;

      await checkDetailsController.locals(req, res, next);

      expect(req.sessionModel.get("countryCode")).to.equal("DEU");
      expect(req.sessionModel.get("country")).to.equal("countries.DEU");
      expect(req.sessionModel.get("expiryDate")).to.equal("01/01/2030");
      expect(req.sessionModel.get("idHasExpiryDate")).to.equal(true);
      expect(req.sessionModel.get("addressCheck")).to.equal(true);
    });

    it(`when photoIdChoice is ${PHOTO_ID_OPTIONS.EEA_IDENTITY_CARD} all details are set correctly`, async () => {
      req.form.values.branches = "1";
      req.form.values.photoIdChoice = PHOTO_ID_OPTIONS.EEA_IDENTITY_CARD;
      req.form.values.eeaIdCardExpiryDate = "01/01/2030";
      req.form.values.idHasExpiryDate = true;
      req.form.values.eeaIdentityCardCountrySelector = "DEU";
      req.form.values.eeaIdentityCardAddressCheck = true;

      await checkDetailsController.locals(req, res, next);

      expect(req.sessionModel.get("countryCode")).to.equal("DEU");
      expect(req.sessionModel.get("country")).to.equal("countries.DEU");
      expect(req.sessionModel.get("expiryDate")).to.equal("01/01/2030");
      expect(req.sessionModel.get("idHasExpiryDate")).to.equal(true);
      expect(req.sessionModel.get("addressCheck")).to.equal(true);
    });
  });

  describe("#saveValues", () => {
    context("on journey save f2f data", () => {
      it("should call documentSelection endpoint", async () => {
        req.axios.post = sinon.fake.resolves({
          data: {},
        });

        const f2fData = {
          document_selection: {
            document_selected: req.sessionModel.get("photoIdChoice"),
            date_of_expiry: req.sessionModel.get("expiryDate"),
            country_code: req.sessionModel.get("countryCode"),
          },
          post_office_selection: {
            name: req.sessionModel.get("postOfficeName"),
            address: req.sessionModel.get("postOfficeAddressWithoutPostCode"),
            location: {
              latitude: req.sessionModel.get("postOfficeLatitude"),
              longitude: req.sessionModel.get("postOfficeLongitude"),
            },
            post_code: req.sessionModel.get("postOfficePostcode"),
            fad_code: req.sessionModel.get("postOfficeFadCode"),
          },
          pdf_preference: req.sessionModel.get("pdfPreference"),
        };

        await checkDetailsController.saveValues(req, res, next);
        expect(next).to.have.been.calledOnce;
        expect(req.axios.post).to.have.been.calledWithExactly(
          SAVE_F2FDATA,
          f2fData,
          {
            headers: {
              "txma-audit-encoded": "dummy-txma-header",
              "x-govuk-signin-session-id": req.session.tokenId,
            },
          }
        );
      });

      it("if call to documentSelection endpoint fails, callback is called with the error", async () => {
        const error = new Error("error");
        req.axios.post = sinon.fake.rejects(error);
        await checkDetailsController.saveValues(req, res, next);
        expect(next).to.have.been.calledWith(error);
      });

      it("should redirect to /error if session token is missing", async () => {
        req.session.tokenId = null;

        await checkDetailsController.saveValues(req, res, next);

        expect(res.redirect).to.have.been.calledOnceWith("/error");
        sinon.assert.calledWith(
          console.error,
          "Missing sessionID, redirecting to /error"
        );
      });
    });
  });

  describe("#next", () => {
    it("returns the next path", () => {
      expect(checkDetailsController.next()).to.equal("/done");
    });
  });
});
