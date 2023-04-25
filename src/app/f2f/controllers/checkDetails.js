const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;
const { formatDate } = require("../utils")
const { APP, API } = require("../../../lib/config");

const DateController = DateControllerMixin(BaseController);

class CheckDetailsController extends DateController {

  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      // Value for selected Post Office depends on selected PO
      const addressDetails = req.form.values.postOfficeDetails
      const payLoadDetails = req.form.values.payLoadValues
      let postOfficeAddress;
      let postOfficeName;
      let postOfficePostcode;
      let postOfficeLatitude;
      let postOfficeLongitude;
      switch (req.form.values.branches) {
        case "1": {
          postOfficeAddress = addressDetails[0].hint.text;
          postOfficeName = addressDetails[0].text;
          postOfficePostcode = payLoadDetails.location0.postcode
          postOfficeLatitude = payLoadDetails.location0.latitude
          postOfficeLongitude = payLoadDetails.location0.longitude
          break;
        }
        case "2": {
          postOfficeAddress = addressDetails[1].hint.text;
          postOfficeName = addressDetails[1].text;
          postOfficePostcode = payLoadDetails.location1.postcode
          postOfficeLatitude = payLoadDetails.location1.latitude
          postOfficeLongitude = payLoadDetails.location1.longitude
          break;
        }
        case "3": {
          postOfficeAddress = addressDetails[2].hint.text;
          postOfficeName = addressDetails[2].text;
          postOfficePostcode = payLoadDetails.location2.postcode
          postOfficeLatitude = payLoadDetails.location2.latitude
          postOfficeLongitude = payLoadDetails.location2.longitude
          break;
        }
        case "4": {
          postOfficeAddress = addressDetails[3].hint.text;
          postOfficeName = addressDetails[3].text;
          postOfficePostcode = payLoadDetails.location3.postcode
          postOfficeLatitude = payLoadDetails.location3.latitude
          postOfficeLongitude = payLoadDetails.location3.longitude
          break;
        }
        case "5": {
          postOfficeAddress = addressDetails[4].hint.text;
          postOfficeName = addressDetails[4].text;
          postOfficePostcode = payLoadDetails.location4.postcode
          postOfficeLatitude = payLoadDetails.location4.latitude
          postOfficeLongitude = payLoadDetails.location4.longitude
          break;
        }
      }
      req.sessionModel.set("postOfficeAddress", postOfficeAddress);
      req.sessionModel.set("postOfficePostcode", postOfficePostcode);
      req.sessionModel.set("postOfficeLatitude", postOfficeLatitude);
      req.sessionModel.set("postOfficeLongitude", postOfficeLongitude);


      // Value for document expiry date depends on selected document
      let expiryDate
      switch (req.form.values.photoIdChoice) {
        case APP.PHOTO_ID_OPTIONS.UK_PASSPORT: {
          expiryDate = req.form.values.ukPassportExpiryDate;
          break;
        }
        case APP.PHOTO_ID_OPTIONS.BRP: {
          expiryDate = req.form.values.brpExpiryDate;
          break;
        }
        case APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL: {
          expiryDate = req.form.values.ukPhotocardDlExpiryDate;
          break;
        }
        case APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT: {
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
      req.sessionModel.set("expiryDate", expiryDate);

      //Confirmation display values
      const idChoice = req.sessionModel.get("selectedDocument");
      const changeUrl = req.sessionModel.get("changeUrl");

      locals.formattedExpiryDate = formatDate(expiryDate, "YYYY-MM-DD");
      locals.idChoice = idChoice;
      locals.changeUrl = `/${changeUrl}`;
      locals.postOfficeAddress = postOfficeAddress.split(", ")
      locals.postOfficeName = postOfficeName;

      callback(err, locals);
    });
  }

  next() {
    return '/done'
  }

  async saveValues(req, res, callback) {

    try {
      const f2fData = {
        "document_selection": {
          "document_selected": req.sessionModel.get("photoIdChoice"),
          "date_of_expiry": req.sessionModel.get("expiryDate"),
        },
        "post_office_selection": {
          "address": req.sessionModel.get("postOfficeAddress"),
          "location": {
            "latitude": req.sessionModel.get("postOfficeLatitude"),
            "longitude": req.sessionModel.get("postOfficeLongitude"),
          },
          "post_code": req.sessionModel.get("postOfficePostcode")
        }
      }
      console.log("text", f2fData);
      await this.saveF2fData(req.axios, f2fData, req);
      callback();

    } catch (err) {
      callback(err);
    }

  }

  async saveF2fData(axios, f2fData, req) {

    const headers = {
      "x-govuk-signin-session-id": "1d5cff8e-5103-4349-9b1b-aebd01a60ff3"
    }

    const resp = await axios.post(`${API.PATHS.SAVE_F2FDATA}`, f2fData, {
      headers,
    });
    return resp.data;
  }
}

module.exports = CheckDetailsController;
