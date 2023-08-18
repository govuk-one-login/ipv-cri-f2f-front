const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const CheckDetailsController = require("./checkDetails");
const {
  API: {
    PATHS: { SAVE_F2FDATA },
  }
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
  });

  it("should be an instance of BaseController", () => {
    expect(checkDetailsController).to.be.an.instanceOf(BaseController);
  });

  describe("#locals", () => {
    let prototypeSpy;

    beforeEach(() => {
      prototypeSpy = sinon.stub(BaseController.prototype, "locals");
      BaseController.prototype.locals.callThrough();
    });

    afterEach(() => {
      prototypeSpy.restore();
    });

    context("with error on callback", () => {
      let error;
      let locals;
      let superLocals;

      beforeEach(async () => {
        error = new Error("Random error");
        superLocals = {
          superKey: "superValue",
        };

        locals = {
          key: "value",
        };
        req.form.values.branches = "1"
        req.form.values.postOfficeDetails = [
          {
            value: "1",
            text: "BRANCH NAME",
            hint: {
              text: "NAME" + ", " + " " + ", " + " " + ", " + "POSTCODE"
            }
          },
        ]
        req.form.values.payLoadValues = {
          location0: {
            postcode: "G41 1ED",
            latitude: "100000",
            longitude: "-100000"
          }
        }
        res.locals = locals;
        BaseController.prototype.locals.yields(error, superLocals);

        await checkDetailsController.locals(req, res, next);
      });

      it("should call callback with error and existing locals - first Post Office option", () => {
        req.sessionModel.set("countryCode", "GBR");
        req.sessionModel.set("country", "United Kingdom");
        const postOfficeName = req.sessionModel.get("postOfficeName");
        const postOfficePostcode = req.sessionModel.get("postOfficePostcode");
        const postCodeLat = req.sessionModel.get("postOfficeLatitude");
        const postCodeLong = req.sessionModel.get("postOfficeLongitude");
        const countryCode = req.sessionModel.get("countryCode");
        const country = req.sessionModel.get("country");

        expect(next).to.have.been.calledWith(error, superLocals);
        expect(postOfficeName).to.equal("BRANCH NAME");
        expect(postOfficePostcode).to.equal("G41 1ED");
        expect(postCodeLat).to.equal("100000");
        expect(postCodeLong).to.equal("-100000");
        expect(countryCode).to.equal("GBR");
        expect(country).to.equal("United Kingdom");
        
      });

      it("should call callback with error and existing locals - third Post Office option", () => {
        req.form.values.branches = "3"
        req.form.values.postOfficeDetails.value = "3"
        expect(next).to.have.been.calledWith(error, superLocals);
        expect(req.form.values.branches).to.equal("3")
        expect(req.form.values.postOfficeDetails.value).to.equal("3")
      });

      it("should call callback with error and existing locals - last Post Office option", () => {
        req.form.values.branches = "5"
        req.form.values.postOfficeDetails.value = "5"
        expect(next).to.have.been.calledWith(error, superLocals);
        expect(req.form.values.branches).to.equal("5")
        expect(req.form.values.postOfficeDetails.value).to.equal("5")
      });
    });
  });

  describe("#saveValues", () => {
    context("on journey save f2f data", () => {
      it("should call documentSelection endpoint", async () => {
        req.axios.post = sinon.fake.resolves();

        const f2fData = {
          "document_selection": {
            "document_selected": req.sessionModel.get("photoIdChoice"),
            "date_of_expiry": req.sessionModel.get("expiryDate"),
            "country_code": req.sessionModel.get("countryCode")
          },
          "post_office_selection": {
            "name": req.sessionModel.get("postOfficeName"),
            "address": req.sessionModel.get("postOfficeAddressWithoutPostCode"),
            "location": {
              "latitude": req.sessionModel.get("postOfficeLatitude"),
              "longitude": req.sessionModel.get("postOfficeLongitude"),
            },
            "post_code": req.sessionModel.get("postOfficePostcode")
          }
        }

        await checkDetailsController.saveValues(req, res, next);
        expect(next).to.have.been.calledOnce;
        expect(req.axios.post).to.have.been.calledWithExactly(
          SAVE_F2FDATA,
          f2fData,
          {
            headers: {
              "x-govuk-signin-session-id": req.session.tokenId
            },
          }
        );
      });

    });
  });
});
