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
    next: "landingPage",
  },
  "/landingPage": {
    next: "photoIdSelection"
  },
  "/photoIdSelection": {
    controller: photoIdSelect,
    // editable: true,
    // editBackStep: "checkDetails",
    backLinks: [
       "/eeaIdentityCardDetails"
    ],
    fields: ["photoIdChoice"],
    invalidates: [
      "ukPassportExpiryDate",
      "nonUKPassportExpiryDate",
      "ukPhotocardDlExpiryDate",
      "brpExpiryDate",
      "eeaIdCardExpiryDate",
      "euPhotocardDlExpiryDate",
      "photoIdExpiryChoice",
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
      // {
      //   field: "photoIdChoice",
      //   value: APP.PHOTO_ID_OPTIONS.CITIZEN_CARD,
      //   next: APP.PATHS.CITIZEN_CARD_DETAILS,
      // },
      // {
      //   field: "photoIdChoice",
      //   value: APP.PHOTO_ID_OPTIONS.YOUNG_SCOT_NATIONAL_ENTITLEMENT_CARD,
      //   next: APP.PATHS.YOUNG_SCOT_NATIONAL_ENTITLEMENT_CARD_DETAILS,
      // },
      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.NO_PHOTO_ID,
        next: APP.PATHS.NO_PHOTO_ID,
      },
    ],
  },
  "/ukPassportDetails": {
    fields: ["ukPassportExpiryDate"],
    controller: ukPassportDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: [
      {
        field: "ukPassportExpiryDate",
        op: "before",
        value: "18 months ago",
        next: "photoIdExpiry",
      },
      "findBranch",
    ],
  },
  "/nonUKPassportDetails": {
    fields: ["nonUKPassportExpiryDate"],
    controller: nonUKPassportDetails,
    editable: true,
    editBackStep: "checkAnswers",
    next: [
      {
        field: "nonUKPassportExpiryDate",
        op: "before",
        value: "today",
        next: "photoIdExpiry",
      },
      "nonUkPassportCountrySelector",
    ],
  },
  "/ukPhotocardDlDetails": {
    fields: ["ukPhotocardDlExpiryDate"],
    controller: ukPhotocardDlDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: [
      {
        field: "ukPhotocardDlExpiryDate",
        op: "before",
        value: "today",
        next: "photoIdExpiry",
      },
      "findBranch",
    ],
  },
  "/brpDetails": {
    fields: ["brpExpiryDate"],
    controller: brpDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: [
      {
        field: "brpExpiryDate",
        op: "before",
        value: "today",
        next: "photoIdExpiry",
      },
      "findBranch",
    ],
  },
  "/euPhotocardDlDetails": {
    fields: ["euPhotocardDlExpiryDate"],
    controller: euPhotocardDlDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: [
      {
        field: "euPhotocardDlExpiryDate",
        op: "before",
        value: "today",
        next: "photoIdExpiry",
      },
      "euDrivingLicenceAddressCheck",
    ],
  },
  "/euDrivingLicenceAddressCheck": {
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
  "/eeaIdentityCardDetails": {
    fields: ["eeaIdCardExpiryDate"],
    controller: eeaIdentityCardDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: [
      {
        field: "eeaIdCardExpiryDate",
        op: "before",
        value: "today",
        next: "photoIdExpiry",
      },
      "eeaIdCardAddressCheck",
    ],
  },
  "/eeaIdCardAddressCheck": {
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
        next: "photoIdSelection"
      },
      {
        field: "eeaIdCardAddressCheck",
        value: APP.ADDRESS_OPTIONS.NO_ADDRESS,
        next: APP.PATHS.EEA_IDENTITY_CARD_COUNTRY_SELECTOR
      }
    ]
  },
  "/photoIdExpiry": {
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
        next: "photoIdSelection",
      },
      {
        field: "photoIdExpiryChoice",
        value: APP.PHOTO_ID_EXPIRY_OPTIONS.PROVE_IDENTITY_ANOTHER_WAY,
        next: APP.PATHS.NO_PHOTO_ID,
      },
    ]
  },
  "/eeaIdentityCardCountrySelector": {
    fields: ["eeaIdentityCardCountrySelector"],
    editable: true,
    editBackStep: "checkDetails",
    next: "findBranch"
  },
  "/euDrivingLicenseCountrySelector": {
    fields: ["euDrivingLicenseCountrySelector"],
    editable: true,
    editBackStep: "checkDetails",
    next: "findBranch"

  },
  "/nonUkPassportCountrySelector": {
    fields: ["nonUkPassportCountrySelector"],
    editable: true,
    editBackStep: "checkDetails",
    next: "findBranch"
  },
  "/findBranch": {
    editable: true,
    editBackStep: "locations",
    fields: ["postcode"],
    next: "locations",
  },
  
  "/locations": {
    controller: resultsController,
    fields: ["branches"],
    revalidateIf: [
      "postcode",
      "branches"
    ],
    next: "checkDetails"
  },
  "/checkDetails": {
    controller: checkDetails,
    next: "done",
  },
  "/done": {
    skip: true,
    noPost: true,
    next: "/oauth2/callback",
  }
}