const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;
const { formatDate } = require("../utils")
const { APP, API } = require("../../../lib/config");
const { NON_UK_PASSPORT } = require("../countryCodes/nonUkPassport");

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
      const country = req.form.values.euDrivingLicenseCountrySelector
      let expiryDate

      // Sets country code value and country name
      Object.values(NON_UK_PASSPORT).forEach(val => {
        if(val.text == country) {
          req.sessionModel.set("countryCode", val.code)
          req.sessionModel.set("country", country)
        }
      })

      switch (req.form.values.photoIdChoice) {
        case APP.PHOTO_ID_OPTIONS.UK_PASSPORT: {
          expiryDate = req.form.values.ukPassportExpiryDate;
          req.sessionModel.set("countryCode", "GBP");
          break;
        }
        case APP.PHOTO_ID_OPTIONS.BRP: {
          expiryDate = req.form.values.brpExpiryDate;
          req.sessionModel.set("countryCode", "GBP");
          break;
        }
        case APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL: {
          expiryDate = req.form.values.ukPhotocardDlExpiryDate;
          req.sessionModel.set("countryCode", "GBP");
          break;
        }
        case APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT: {
          expiryDate = req.form.values.nonUKPassportExpiryDate;
          countryCode = req.form.values.nonUkPassportcountrySelector;
          break;
        }
        case APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL: {
          expiryDate = req.form.values.euPhotocardDlExpiryDate;
          countryCode = req.form.values.euDrivingLicenseCountrySelector;
          break;
        }
        case APP.PHOTO_ID_OPTIONS.EEA_IDENTITY_CARD: {
          expiryDate = req.form.values.eeaIdCardExpiryDate;
          countryCode = req.form.values.eeaIdentityCardCountrySelector;
          break;
        }
      }
      req.sessionModel.set("expiryDate", expiryDate);
      req.sessionModel.set("addressCheck", req.form.values.euDrivingLicenceAddressCheck)

      //Confirmation display values
      const idChoice = req.sessionModel.get("selectedDocument");
      const changeUrl = req.sessionModel.get("changeUrl");
      const addressCheck = req.sessionModel.get("addressCheck");
      locals.country = req.sessionModel.get("country");

      locals.formattedExpiryDate = formatDate(expiryDate, "YYYY-MM-DD");
      locals.idChoice = idChoice;
      locals.changeUrl = `/${changeUrl}`;
      locals.addressCheck = addressCheck;
      locals.postOfficeAddress = postOfficeAddress.split(", ")
      locals.postOfficeName = postOfficeName;
      console.log("COUNTRY CODE", req.sessionModel.get("countryCode"))
      console.log("COUNTRY", req.sessionModel.get("country"))
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
          "country_code": req.sessionModel.get("countryCode")
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
      await this.saveF2fData(req.axios, f2fData, req);
      callback();

    } catch (err) {
      callback(err);
    }

  }

  async saveF2fData(axios, f2fData, req) {

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
