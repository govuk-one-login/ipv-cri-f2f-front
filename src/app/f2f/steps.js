const photoIdSelect = require("./controllers/photoIdSelection");
const resultsController = require("./controllers/results");
const ukPassportDetails = require("./controllers/ukPassportDetails");
const ukPhotocardDlDetails = require("./controllers/ukPhotocardDl");
const brpDetails = require("./controllers/brpDetails");
const nonUKPassportDetails = require("./controllers/nonUKPassportDetails");
const eeaIdentityCardDetails = require("./controllers/eeaIdentityCardDetails");
const euPhotocardDlDetails = require("./controllers/euPhotocardDlDetails");
const checkDetails = require("./controllers/checkDetails");
const photoIdExpiry = require("./controllers/photoIdExpiry");
const root = require("./controllers/root");
const { APP } = require("../../lib/config");

module.exports = {
  "/": {
    resetJourney: true,
    reset: true,
    entryPoint: true,
    skip: true,
    controller: root,
    next: "prove-identity-post-office",
  },
  "/prove-identity-post-office": {
    next: "choose-photo-id-post-office"
  },
  "/choose-photo-id-post-office": {
    controller: photoIdSelect,
    fields: ["photoIdChoice"],
    invalidates: [
      "ukPassportExpiryDate",
      "nonUKPassportExpiryDate",
      "ukPhotocardDlExpiryDate",
      "brpExpiryDate",
      "eeaIdCardExpiryDate",
      "euPhotocardDlExpiryDate",
      "photo-id-expired",
    ],
    next: [
      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.UK_PASSPORT,
        next: APP.PATHS.UK_PASSPORT_DETAILS,
      },
      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.BRP,
        next: APP.PATHS.BRP_DETAILS,
      },
      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL,
        next: APP.PATHS.PHOTOCARD_DL_DETAILS,
      },
      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT,
        next: APP.PATHS.NON_UK_PASSPORT_DETAILS,
      },
      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL,
        next: APP.PATHS.EU_PHOTOCARD_DL_DETAILS,
      },
      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.EEA_IDENTITY_CARD,
        next: APP.PATHS.EEA_IDENTITY_CARD_DETAILS,
      },
      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.NO_PHOTO_ID,
        next: APP.PATHS.NO_PHOTO_ID,
      },
    ],
  },
  "/uk-passport-expire": {
    fields: ["ukPassportExpiryDate"],
    controller: ukPassportDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: [
      {
        field: "ukPassportExpiryDate",
        op: "before",
        value: "18 months ago",
        next: "photo-id-expired",
      },
      "find-post-office-prove-identity",
    ],
  },
  "/non-uk-passport-expire": {
    fields: ["nonUKPassportExpiryDate"],
    controller: nonUKPassportDetails,
    editable: true,
    editBackStep: "checkAnswers",
    next: [
      {
        field: "nonUKPassportExpiryDate",
        op: "before",
        value: "today",
        next: "photo-id-expired",
      },
      "select-country-non-uk-passport",
    ],
  },
  "/uk-driving-licence-expire": {
    fields: ["ukPhotocardDlExpiryDate"],
    controller: ukPhotocardDlDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: [
      {
        field: "ukPhotocardDlExpiryDate",
        op: "before",
        value: "today",
        next: "photo-id-expired",
      },
      "uk-driving-licence-current-address",
    ],
  },
  "/biometric-residence-permit-expire": {
    fields: ["brpExpiryDate"],
    controller: brpDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: [
      {
        field: "brpExpiryDate",
        op: "before",
        value: "today",
        next: "photo-id-expired",
      },
      "find-post-office-prove-identity",
    ],
  },
  "/eu-driving-licence-expire": {
    fields: ["euPhotocardDlExpiryDate"],
    controller: euPhotocardDlDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: [
      {
        field: "euPhotocardDlExpiryDate",
        op: "before",
        value: "today",
        next: "photo-id-expired",
      },
      "eu-driving-licence-current-address",
    ],
  },
  "/eu-driving-licence-current-address": {
    fields: ["euDrivingLicenceAddressCheck"],
    editable: true,
    editBackStep: "checkDetails",
    next: [
      {
        field: "euDrivingLicenceAddressCheck",
        value: APP.ADDRESS_OPTIONS.CURRENT_ADDRESS,
        next: APP.PATHS.EU_DRIVING_LICENCE_COUNTRY_SELECTOR
      },
      {
        field: "euDrivingLicenceAddressCheck",
        value: APP.ADDRESS_OPTIONS.DIFFERENT_ADDRESS,
        next: APP.PATHS.PHOTO_ID_SELECTION
      },
      {
        field: "euDrivingLicenceAddressCheck",
        value: APP.ADDRESS_OPTIONS.NO_ADDRESS,
        next: APP.PATHS.EU_DRIVING_LICENCE_COUNTRY_SELECTOR
      }
    ]
  },
  "/national-identity-card-expire": {
    fields: ["eeaIdCardExpiryDate"],
    controller: eeaIdentityCardDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: [
      {
        field: "eeaIdCardExpiryDate",
        op: "before",
        value: "today",
        next: "photo-id-expired",
      },
      "national-identity-card-current-address",
    ],
  },
  "/national-identity-card-current-address": {
    fields: ["eeaIdCardAddressCheck"],
    editable: true,
    editBackStep: "checkDetails",
    next: [
      {
        field: "eeaIdCardAddressCheck",
        value: APP.ADDRESS_OPTIONS.CURRENT_ADDRESS,
        next: APP.PATHS.EEA_IDENTITY_CARD_COUNTRY_SELECTOR
      },
      {
        field: "eeaIdCardAddressCheck",
        value: APP.ADDRESS_OPTIONS.DIFFERENT_ADDRESS,
        next: "choose-photo-id-post-office"
      },
      {
        field: "eeaIdCardAddressCheck",
        value: APP.ADDRESS_OPTIONS.ID_NO_ADDRESS,
        next: APP.PATHS.EEA_IDENTITY_CARD_COUNTRY_SELECTOR
      }
    ]
  },
  "/photo-id-expired": {
    controller: photoIdExpiry,
    fields: ["photoIdExpiryChoice"],
    next: [
      {
        field: "photoIdExpiryChoice",
        value: APP.PHOTO_ID_EXPIRY_OPTIONS.RE_ENTER_DETAILS,
        next: [
          {
            field: "photoIdChoice",
            value: APP.PHOTO_ID_OPTIONS.UK_PASSPORT,
            next: APP.PATHS.UK_PASSPORT_DETAILS,
          },
          {
            field: "photoIdChoice",
            value: APP.PHOTO_ID_OPTIONS.BRP,
            next: APP.PATHS.BRP_DETAILS,
          },
          {
            field: "photoIdChoice",
            value: APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL,
            next: APP.PATHS.PHOTOCARD_DL_DETAILS,
          },
          {
            field: "photoIdChoice",
            value: APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT,
            next: APP.PATHS.NON_UK_PASSPORT_DETAILS,
          },
          {
            field: "photoIdChoice",
            value: APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL,
            next: APP.PATHS.EU_PHOTOCARD_DL_DETAILS,
          },
          {
            field: "photoIdChoice",
            value: APP.PHOTO_ID_OPTIONS.EEA_IDENTITY_CARD,
            next: APP.PATHS.EEA_IDENTITY_CARD_DETAILS,
          }
        ],
      },
      {
        field: "photoIdExpiryChoice",
        value: APP.PHOTO_ID_EXPIRY_OPTIONS.CHOOSE_DIFFERENT_PHOTO_ID,
        next: "choose-photo-id-post-office",
      },
      {
        field: "photoIdExpiryChoice",
        value: APP.PHOTO_ID_EXPIRY_OPTIONS.PROVE_IDENTITY_ANOTHER_WAY,
        next: APP.PATHS.NO_PHOTO_ID,
      },
    ]
  },
  "/uk-driving-licence-current-address": {
    fields: ["ukDlAddressCheck"],
    editable: true,
    editBackStep: "checkDetails",
    next: [
      {
        field: "ukDlAddressCheck",
        value: "Yes",
        next: "find-post-office-prove-identity"
      },
      {
        field: "ukDlAddressCheck",
        value: "No",
        next: "choose-photo-id-post-office"
      }
    ]
  },
  "/select-country-national-identity-card": {
    fields: ["eeaIdentityCardCountrySelector"],
    editable: true,
    editBackStep: "checkDetails",
    next: "find-post-office-prove-identity"
  },
  "/select-country-eu-driving-licence": {
    fields: ["euDrivingLicenceCountrySelector"],
    editable: true,
    editBackStep: "checkDetails",
    next: "find-post-office-prove-identity"

  },
  "/select-country-non-uk-passport": {
    fields: ["nonUkPassportCountrySelector"],
    editable: true,
    editBackStep: "checkDetails",
    next: "find-post-office-prove-identity"
  },
  "/find-post-office-prove-identity": {
    editable: true,
    editBackStep: "choose-post-office-prove-identity",
    fields: ["postcode"],
    next: "choose-post-office-prove-identity",
  },
  
  "/choose-post-office-prove-identity": {
    controller: resultsController,
    fields: ["branches"],
    revalidateIf: [
      "postcode",
      "branches"
    ],
    next: "check-details"
  },
  "/check-details": {
    controller: checkDetails,
    next: "done",
  },
  "/done": {
    skip: true,
    noPost: true,
    next: "/oauth2/callback",
  }
}