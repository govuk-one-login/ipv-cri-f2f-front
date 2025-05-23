const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;
const { formatDate } = require("../utils");
const { APP, API } = require("../../../lib/config");
const DateController = DateControllerMixin(BaseController);
const {
  createPersonalDataHeaders,
} = require("@govuk-one-login/frontend-passthrough-headers");
const {
  generateHTMLofAddress,
  titleCaseAddresses,
} = require("../../../presenters/addressPresenter");

class CheckDetailsController extends DateController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }
      // Value for selected Post Office depends on selected PO
      const addressDetails = req.form.values.postOfficeDetails;
      const payLoadDetails = req.form.values.payLoadValues;
      let postOfficeAddress;
      let postOfficeName;
      let postOfficeAddressWithoutPostCode;
      let postOfficePostcode;
      let postOfficeLatitude;
      let postOfficeLongitude;
      let postOfficeFadCode;

      switch (req.form.values.branches) {
        case "1": {
          postOfficeAddress = addressDetails[0].hint.text;
          postOfficeName = addressDetails[0].text;
          postOfficeAddressWithoutPostCode =
            payLoadDetails.location0.addressWithoutPostCode;
          postOfficePostcode = payLoadDetails.location0.postcode;
          postOfficeLatitude = payLoadDetails.location0.latitude;
          postOfficeLongitude = payLoadDetails.location0.longitude;
          postOfficeFadCode = payLoadDetails.location0.fadCode;
          break;
        }
        case "2": {
          postOfficeAddress = addressDetails[1].hint.text;
          postOfficeName = addressDetails[1].text;
          postOfficeAddressWithoutPostCode =
            payLoadDetails.location1.addressWithoutPostCode;
          postOfficePostcode = payLoadDetails.location1.postcode;
          postOfficeLatitude = payLoadDetails.location1.latitude;
          postOfficeLongitude = payLoadDetails.location1.longitude;
          postOfficeFadCode = payLoadDetails.location1.fadCode;
          break;
        }
        case "3": {
          postOfficeAddress = addressDetails[2].hint.text;
          postOfficeName = addressDetails[2].text;
          postOfficeAddressWithoutPostCode =
            payLoadDetails.location2.addressWithoutPostCode;
          postOfficePostcode = payLoadDetails.location2.postcode;
          postOfficeLatitude = payLoadDetails.location2.latitude;
          postOfficeLongitude = payLoadDetails.location2.longitude;
          postOfficeFadCode = payLoadDetails.location2.fadCode;
          break;
        }
        case "4": {
          postOfficeAddress = addressDetails[3].hint.text;
          postOfficeName = addressDetails[3].text;
          postOfficeAddressWithoutPostCode =
            payLoadDetails.location3.addressWithoutPostCode;
          postOfficePostcode = payLoadDetails.location3.postcode;
          postOfficeLatitude = payLoadDetails.location3.latitude;
          postOfficeLongitude = payLoadDetails.location3.longitude;
          postOfficeFadCode = payLoadDetails.location3.fadCode;
          break;
        }
        case "5": {
          postOfficeAddress = addressDetails[4].hint.text;
          postOfficeName = addressDetails[4].text;
          postOfficeAddressWithoutPostCode =
            payLoadDetails.location4.addressWithoutPostCode;
          postOfficePostcode = payLoadDetails.location4.postcode;
          postOfficeLatitude = payLoadDetails.location4.latitude;
          postOfficeLongitude = payLoadDetails.location4.longitude;
          postOfficeFadCode = payLoadDetails.location4.fadCode;
          break;
        }
      }
      req.sessionModel.set("postOfficeName", postOfficeName);
      req.sessionModel.set("postOfficeAddress", postOfficeAddress);
      req.sessionModel.set(
        "postOfficeAddressWithoutPostCode",
        postOfficeAddressWithoutPostCode
      );
      req.sessionModel.set("postOfficePostcode", postOfficePostcode);
      req.sessionModel.set("postOfficeLatitude", postOfficeLatitude);
      req.sessionModel.set("postOfficeLongitude", postOfficeLongitude);
      req.sessionModel.set("postOfficeFadCode", postOfficeFadCode);

      // Value for document expiry date depends on selected document
      let idHasExpiryDate;
      let expiryDate;
      let address;

      switch (req.form.values.photoIdChoice) {
        case APP.PHOTO_ID_OPTIONS.UK_PASSPORT: {
          expiryDate = req.form.values.ukPassportExpiryDate;
          req.sessionModel.set("countryCode", "GBR");
          break;
        }
        case APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL: {
          expiryDate = req.form.values.ukPhotocardDlExpiryDate;
          address = req.form.values.ukPhotocardDlAddressCheck;
          req.sessionModel.set("countryCode", "GBR");
          break;
        }
        case APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT: {
          idHasExpiryDate = req.form.values.idHasExpiryDate;
          expiryDate = req.form.values.nonUKPassportExpiryDate;
          req.sessionModel.set(
            "countryCode",
            req.form.values.nonUkPassportCountrySelector
          );
          req.sessionModel.set(
            "country",
            res.locals.translate(
              `countries.${req.form.values.nonUkPassportCountrySelector}`
            )
          );
          break;
        }
        case APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL: {
          idHasExpiryDate = req.form.values.idHasExpiryDate;
          expiryDate = req.form.values.euPhotocardDlExpiryDate;
          address = req.form.values.euPhotocardDlAddressCheck;
          req.sessionModel.set(
            "countryCode",
            req.form.values.euDrivingLicenceCountrySelector
          );
          req.sessionModel.set(
            "country",
            res.locals.translate(
              `countries.${req.form.values.euDrivingLicenceCountrySelector}`
            )
          );
          break;
        }
        case APP.PHOTO_ID_OPTIONS.EEA_IDENTITY_CARD: {
          idHasExpiryDate = req.form.values.idHasExpiryDate;
          expiryDate = req.form.values.eeaIdCardExpiryDate;
          address = req.form.values.eeaIdentityCardAddressCheck;
          req.sessionModel.set(
            "countryCode",
            req.form.values.eeaIdentityCardCountrySelector
          );
          req.sessionModel.set(
            "country",
            res.locals.translate(
              `countries.${req.form.values.eeaIdentityCardCountrySelector}`
            )
          );
          break;
        }
      }

      req.sessionModel.set("idHasExpiryDate", idHasExpiryDate);
      req.sessionModel.set("expiryDate", expiryDate);
      req.sessionModel.set("addressCheck", address);

      //Confirmation display values
      const idChoice = req.sessionModel.get("photoIdChoice");
      const changeUrl = req.sessionModel.get("changeUrl");
      const addressCheck = req.sessionModel.get("addressCheck");
      const hasExpiryDate = req.sessionModel.get("idHasExpiryDate");
      const format = "YYYY-MM-DD";
      const language = req.lng;

      // Values for PCL
      const postalAddress = req.sessionModel.get("postalAddress");
      if (
        postalAddress !== undefined &&
        req.sessionModel.get("customerLetterCheckAddress") ===
          "differentAddress"
      ) {
        const displayAddress = generateHTMLofAddress(
          titleCaseAddresses(postalAddress)
        );
        locals.addressLine = displayAddress;
      } else {
        locals.addressLine = req.sessionModel.get(
          "fullParsedSharedClaimsAddress"
        );
      }

      // Assign values for display text and API payload
      req.sessionModel.set("pdfPreference", "EMAIL_ONLY");
      if (req.sessionModel.get("postOfficeCustomerLetterChoice") === "email") {
        locals.pdfPreferenceText = res.locals.translate(
          "checkDetails.pdfPreferenceTextEmail"
        );
      } else if (
        req.sessionModel.get("postOfficeCustomerLetterChoice") === "post"
      ) {
        locals.pdfPreferenceText = res.locals.translate(
          "checkDetails.pdfPreferenceTextPcl"
        );
        req.sessionModel.set("pdfPreference", "PRINTED_LETTER");
      }

      locals.formattedExpiryDate = formatDate(expiryDate, format, language);
      locals.idTranslatedString = res.locals.translate(
        `photoIdChoice.items.${idChoice}.label`
      );
      locals.addressCheckTranslatedString = res.locals.translate(
        `${idChoice}AddressCheck.items.${addressCheck}.label`
      );
      locals.hasExpiryDateTranslatedString = res.locals.translate(
        `idHasExpiryDate.items.${hasExpiryDate}.label`
      );
      locals.countryTranslatedString = req.sessionModel.get("country");

      locals.changeUrl = `/${changeUrl}`;
      locals.hasExpiryDate = hasExpiryDate;
      locals.postOfficeAddress = postOfficeAddress.split(", ");
      locals.postOfficeName = postOfficeName;

      callback(err, locals);
    });
  }
  next() {
    return "/done";
  }
  async saveValues(req, res, callback) {
    const postal_address = req.sessionModel.get("postalAddress");
    try {
      const f2fData = {
        document_selection: {
          document_selected: req.sessionModel.get("photoIdChoice"),
          date_of_expiry: req.sessionModel.get("expiryDate"),
          country_code: req.sessionModel.get("countryCode"),
        },
        post_office_selection: {
          address: req.sessionModel.get("postOfficeAddressWithoutPostCode"),
          name: req.sessionModel.get("postOfficeName"),
          location: {
            latitude: req.sessionModel.get("postOfficeLatitude"),
            longitude: req.sessionModel.get("postOfficeLongitude"),
          },
          post_code: req.sessionModel.get("postOfficePostcode"),
          fad_code: req.sessionModel.get("postOfficeFadCode"),
        },
        pdf_preference: req.sessionModel.get("pdfPreference"),
      };
      const mappedAddress = await this.mapPostalAddressFromOS(postal_address);
      if (mappedAddress) {
        f2fData.postal_address = mappedAddress;
      }
      await this.saveF2fData(req.axios, f2fData, req, res);
      callback();
    } catch (error) {
      callback(error);
    }
  }

  async mapPostalAddressFromOS(postal_address) {
    if (!postal_address) {
      return undefined;
    } else {
      let mappedAddress = {};
      if (postal_address.uprn) {
        mappedAddress.uprn = Number(postal_address.uprn);
      }
      if (postal_address.department_name) {
        mappedAddress.departmentName = postal_address.department_name;
      }
      if (postal_address.organisation_name) {
        mappedAddress.organisationName = postal_address.organisation_name;
      }
      if (postal_address.sub_building_name) {
        mappedAddress.subBuildingName = postal_address.sub_building_name;
      }
      if (postal_address.building_name) {
        mappedAddress.buildingName = postal_address.building_name;
      }
      if (postal_address.building_number) {
        mappedAddress.buildingNumber = postal_address.building_number;
      }
      if (postal_address.thoroughfare_name) {
        mappedAddress.streetName = postal_address.thoroughfare_name;
      }
      if (postal_address.post_town) {
        mappedAddress.addressLocality = postal_address.post_town;
      }
      if (postal_address.dependent_locality) {
        mappedAddress.dependentAddressLocality = postal_address.dependent_locality;
      }
      if (postal_address.double_dependent_locality) {
        mappedAddress.doubleDependentAddressLocality = postal_address.double_dependent_locality;
      }
      if (postal_address.postcode) {
        mappedAddress.postalCode = postal_address.postcode;
      }
      // Hard coded as only UK addresses have a postcode required for this functionality
      mappedAddress.addressCountry = "GB";
      mappedAddress.preferredAddress = true;
      return mappedAddress;
    }
  }

  async saveF2fData(axios, f2fData, req, res) {
    const tokenId = req.session.tokenId;

    if (tokenId) {
      const headers = {
        "x-govuk-signin-session-id": tokenId,
        ...createPersonalDataHeaders(
          `${API.BASE_URL}${API.PATHS.SAVE_F2FDATA}`,
          req
        ),
      };
      const resp = await axios.post(`${API.PATHS.SAVE_F2FDATA}`, f2fData, {
        headers,
      });
      return resp.data;
    } else {
      console.error("Missing sessionID, redirecting to /error");
      res.redirect("/error");
    }
  }
  
}

module.exports = CheckDetailsController;
