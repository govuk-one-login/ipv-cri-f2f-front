const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;
const { formatDate } = require("../utils")
const { API, APP } = require("../../../lib/config");

const DateController = DateControllerMixin(BaseController);

class CheckDetailsController extends DateController {

  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      // Value for selected Post Office depends on selected PO
      const addressDetails = req.form.values.postOfficeDetails
      console.log("FORM VALUES: ", addressDetails)
      let postOfficeAddress;
      switch(req.form.values.branches) {
        case "1": {
          postOfficeAddress = addressDetails[0].hint.text;
          break;
        }
        case "2": {
          postOfficeAddress = addressDetails[1].hint.text;
          break;
        }
        case "3": {
          postOfficeAddress = addressDetails[2].hint.text;
          break;
        }
        case "4": {
          postOfficeAddress = addressDetails[3].hint.text;
          break;
        }
        case "5": {
          postOfficeAddress = addressDetails[4].hint.text;
          break;
        }
      }

      // Value for document expiry date depends on selected document
      let expiryDate
      switch(req.form.values.photoIdChoice) {
        case APP.PHOTO_ID_OPTIONS.UK_PASSPORT: {
          expiryDate = req.form.values.ukPassportExpiryDate;
          break;
        }
        case APP.PHOTO_ID_OPTIONS.BRP: {
          expiryDate = req.form.values.brpExpiryDate;
          break;
        }
        case APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL: {
          expiryDate = req.form.values.photocardDlExpiryDate;
          break;
        }
        case APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT_DETAILS: {
          expiryDate = req.form.values.nonUKPassportExpiryDate;
          break;
        }
        case APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL: {
          expiryDate = req.form.values.euPhotocardDlExpiryDate;
          break;
        }
        case APP.PHOTO_ID_OPTIONS.EEA_IDENTITY_CARD: {
          expiryDate = req.form.values.eeaIdCardExpiryDate;
          break;
        }
      }

      const idChoice = req.sessionModel.get("selectedDocument");
      const changeUrl = req.sessionModel.get("changeUrl");

      locals.formattedExpiryDate = formatDate(expiryDate, "YYYY-MM-DD");
      locals.idChoice = idChoice;
      locals.changeUrl = `/${changeUrl}`;
      locals.postOffice = postOfficeAddress;

      callback(err, locals);
    });
  }

  next() {
    return '/done'
  }

  async saveValues(req, res, callback) {

    try {
      const f2fData ={
        document_selected:  req.sessionModel.get("photoIdChoice"),
        date_of_expiry: req.sessionModel.get("expiryDate")
      }
      await this.saveF2fData(req.axios, f2fData, req);
      callback();

    } catch (err) {
      callback(err);
    }

  }

  async saveCicData(axios, f2fData, req) {

    const headers = {
      "x-govuk-signin-session-id": req.session.tokenId
    }

    const resp = await axios.post(`${API.PATHS.SAVE_F2FDATA}`, f2fData, {
      headers,
    });
    return resp.data;
  }
}

module.exports = CheckDetailsController;
