const photoIdSelect = require("./controllers/photoIdSelection");
const resultsController = require("./controllers/results");
const ukPassportDetails = require("./controllers/ukPassportDetails");
const ukPhotocardDlDetails = require("./controllers/ukPhotocardDl");
const photoIdSelectThinFile = require("./controllers/photoIdSelectionThinFile");
const nonUKPassportDetails = require("./controllers/nonUKPassportDetails");
const eeaIdentityCardDetails = require("./controllers/eeaIdentityCardDetails");
const euPhotocardDlDetails = require("./controllers/euPhotocardDlDetails");
const checkDetails = require("./controllers/checkDetails");
const abort = require("./controllers/abort");
const photoIdExpiry = require("./controllers/photoIdExpiry");
const root = require("./controllers/root");
const landingPage = require("./controllers/landingPage");
const addressResults = require("./controllers/addressResults");
const { APP } = require("../../lib/config");
const checkAddressController = require("./controllers/checkAddress");

module.exports = {
  [`${APP.PATHS.F2F}`]: {
    resetJourney: true,
    reset: true,
    entryPoint: true,
    skip: true,
    controller: root,
    next: APP.PATHS.LANDING_PAGE,
  },
  [`${APP.PATHS.LANDING_PAGE}`]: {
    controller: landingPage,
    next: [
      {
        field: "isThinFileUser",
        value: true,
        next: APP.PATHS.PHOTO_ID_SELECTION_THIN_FILE,
      },
      {
        field: "isThinFileUser",
        value: false,
        next: APP.PATHS.PHOTO_ID_SELECTION,
      },
    ],
  },
  [`${APP.PATHS.PHOTO_ID_SELECTION}`]: {
    controller: photoIdSelect,
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    fields: ["photoIdChoice"],
    invalidates: [
      "ukPassportExpiryDate",
      "nonUKPassportExpiryDate",
      "ukPhotocardDlExpiryDate",
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
        value: APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL,
        next: APP.PATHS.UK_PHOTOCARD_DL_DETAILS,
      },
      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT,
        next: APP.PATHS.NON_UK_PASSPORT_HAS_EXPIRY_DATE,
      },
      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL,
        next: APP.PATHS.EU_DRIVING_LICENCE_HAS_EXPIRY_DATE,
      },
      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.EEA_IDENTITY_CARD,
        next: APP.PATHS.NATIONAL_IDENTITY_CARD_HAS_EXPIRY_DATE,
      },
      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.NO_PHOTO_ID,
        next: APP.PATHS.ABORT,
      },
    ],
  },
  [`${APP.PATHS.PHOTO_ID_SELECTION_THIN_FILE}`]: {
    controller: photoIdSelectThinFile,
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    fields: ["photoIdChoiceThinFile"],
    invalidates: [
      "ukPassportExpiryDate",
      "nonUKPassportExpiryDate",
      "ukPhotocardDlExpiryDate",
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
        value: APP.PHOTO_ID_OPTIONS.NO_PHOTO_ID,
        next: APP.PATHS.ABORT,
      },
    ],
  },
  [`${APP.PATHS.UK_PASSPORT_DETAILS}`]: {
    fields: ["ukPassportExpiryDate"],
    controller: ukPassportDetails,
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: [
      {
        field: "ukPassportExpiryDate",
        op: "before",
        value: "18 months ago",
        next: APP.PATHS.EXPIRED_ID,
      },
      APP.PATHS.FIND_POST_OFFICE,
    ],
  },
  [`${APP.PATHS.NON_UK_PASSPORT_DETAILS}`]: {
    fields: ["nonUKPassportExpiryDate"],
    controller: nonUKPassportDetails,
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: [
      {
        field: "nonUKPassportExpiryDate",
        op: "before",
        value: "today",
        next: APP.PATHS.EXPIRED_ID,
      },
      APP.PATHS.NON_UK_PASSPORT_COUNTRY_SELECTOR,
    ],
  },
  [`${APP.PATHS.NON_UK_PASSPORT_HAS_EXPIRY_DATE}`]: {
    fields: ["idHasExpiryDate"],
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: [
      {
        field: "idHasExpiryDate",
        value: APP.HAS_EXPIRY_DATE.YES,
        next: APP.PATHS.NON_UK_PASSPORT_DETAILS,
      },
      {
        field: "idHasExpiryDate",
        value: APP.HAS_EXPIRY_DATE.NO,
        next: APP.PATHS.NON_UK_PASSPORT_COUNTRY_SELECTOR,
      },
    ],
  },
  [`${APP.PATHS.UK_PHOTOCARD_DL_DETAILS}`]: {
    fields: ["ukPhotocardDlExpiryDate"],
    controller: ukPhotocardDlDetails,
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: [
      {
        field: "ukPhotocardDlExpiryDate",
        op: "before",
        value: "today",
        next: APP.PATHS.EXPIRED_ID,
      },
      APP.PATHS.UK_PHOTOCARD_DL_ADDRESS_CHECK,
    ],
  },
  [`${APP.PATHS.EU_PHOTOCARD_DL_DETAILS}`]: {
    fields: ["euPhotocardDlExpiryDate"],
    controller: euPhotocardDlDetails,
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: [
      {
        field: "euPhotocardDlExpiryDate",
        op: "before",
        value: "today",
        next: APP.PATHS.EXPIRED_ID,
      },
      APP.PATHS.EU_DRIVING_LICENCE_ADDRESS_CHECK,
    ],
  },
  [`${APP.PATHS.EU_DRIVING_LICENCE_HAS_EXPIRY_DATE}`]: {
    fields: ["idHasExpiryDate"],
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: [
      {
        field: "idHasExpiryDate",
        value: APP.HAS_EXPIRY_DATE.YES,
        next: APP.PATHS.EU_PHOTOCARD_DL_DETAILS,
      },
      {
        field: "idHasExpiryDate",
        value: APP.HAS_EXPIRY_DATE.NO,
        next: APP.PATHS.EU_DRIVING_LICENCE_ADDRESS_CHECK,
      },
    ],
  },
  [`${APP.PATHS.EU_DRIVING_LICENCE_ADDRESS_CHECK}`]: {
    fields: ["euPhotocardDlAddressCheck"],
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: [
      {
        field: "euPhotocardDlAddressCheck",
        value: APP.ADDRESS_OPTIONS.CURRENT_ADDRESS,
        next: APP.PATHS.EU_DRIVING_LICENCE_COUNTRY_SELECTOR,
      },
      {
        field: "euPhotocardDlAddressCheck",
        value: APP.ADDRESS_OPTIONS.DIFFERENT_ADDRESS,
        next: APP.PATHS.PHOTO_ID_SELECTION,
      },
      {
        field: "euPhotocardDlAddressCheck",
        value: APP.ADDRESS_OPTIONS.NO_ADDRESS,
        next: APP.PATHS.EU_DRIVING_LICENCE_COUNTRY_SELECTOR,
      },
    ],
  },
  [`${APP.PATHS.EEA_IDENTITY_CARD_DETAILS}`]: {
    fields: ["eeaIdCardExpiryDate"],
    controller: eeaIdentityCardDetails,
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: [
      {
        field: "eeaIdCardExpiryDate",
        op: "before",
        value: "today",
        next: APP.PATHS.EXPIRED_ID,
      },
      APP.PATHS.EEA_IDENTITY_CARD_ADDRESS_CHECK,
    ],
  },
  [`${APP.PATHS.NATIONAL_IDENTITY_CARD_HAS_EXPIRY_DATE}`]: {
    fields: ["idHasExpiryDate"],
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: [
      {
        field: "idHasExpiryDate",
        value: APP.HAS_EXPIRY_DATE.YES,
        next: APP.PATHS.EEA_IDENTITY_CARD_DETAILS,
      },
      {
        field: "idHasExpiryDate",
        value: APP.HAS_EXPIRY_DATE.NO,
        next: APP.PATHS.EEA_IDENTITY_CARD_ADDRESS_CHECK,
      },
    ],
  },
  [`${APP.PATHS.EEA_IDENTITY_CARD_ADDRESS_CHECK}`]: {
    fields: ["eeaIdentityCardAddressCheck"],
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: [
      {
        field: "eeaIdentityCardAddressCheck",
        value: APP.ADDRESS_OPTIONS.CURRENT_ADDRESS,
        next: APP.PATHS.EEA_IDENTITY_CARD_COUNTRY_SELECTOR,
      },
      {
        field: "eeaIdentityCardAddressCheck",
        value: APP.ADDRESS_OPTIONS.DIFFERENT_ADDRESS,
        next: APP.PATHS.PHOTO_ID_SELECTION,
      },
      {
        field: "eeaIdentityCardAddressCheck",
        value: APP.ADDRESS_OPTIONS.ID_NO_ADDRESS,
        next: APP.PATHS.EEA_IDENTITY_CARD_COUNTRY_SELECTOR,
      },
    ],
  },
  [`${APP.PATHS.EXPIRED_ID}`]: {
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
            value: APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL,
            next: APP.PATHS.UK_PHOTOCARD_DL_DETAILS,
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
        ],
      },
      {
        field: "photoIdExpiryChoice",
        value: APP.PHOTO_ID_EXPIRY_OPTIONS.CHOOSE_DIFFERENT_PHOTO_ID,
        next: APP.PATHS.PHOTO_ID_SELECTION,
      },
      {
        field: "photoIdExpiryChoice",
        value: APP.PHOTO_ID_EXPIRY_OPTIONS.PROVE_IDENTITY_ANOTHER_WAY,
        next: APP.PATHS.ABORT,
      },
    ],
  },
  [`${APP.PATHS.UK_PHOTOCARD_DL_ADDRESS_CHECK}`]: {
    fields: ["ukPhotocardDlAddressCheck"],
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: [
      {
        field: "ukPhotocardDlAddressCheck",
        value: APP.ADDRESS_OPTIONS.CURRENT_ADDRESS,
        next: APP.PATHS.FIND_POST_OFFICE,
      },
      {
        field: "ukPhotocardDlAddressCheck",
        value: APP.ADDRESS_OPTIONS.DIFFERENT_ADDRESS,
        next: APP.PATHS.PHOTO_ID_SELECTION,
      },
    ],
  },
  [`${APP.PATHS.EEA_IDENTITY_CARD_COUNTRY_SELECTOR}`]: {
    fields: ["eeaIdentityCardCountrySelector"],
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: APP.PATHS.FIND_POST_OFFICE,
  },
  [`${APP.PATHS.EU_DRIVING_LICENCE_COUNTRY_SELECTOR}`]: {
    fields: ["euDrivingLicenceCountrySelector"],
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: APP.PATHS.FIND_POST_OFFICE,
  },
  [`${APP.PATHS.NON_UK_PASSPORT_COUNTRY_SELECTOR}`]: {
    fields: ["nonUkPassportCountrySelector"],
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: APP.PATHS.FIND_POST_OFFICE,
  },
  [`${APP.PATHS.FIND_POST_OFFICE}`]: {
    editable: true,
    editBackStep: APP.PATHS.CHOOSE_POST_OFFICE,
    fields: ["postcode"],
    next: APP.PATHS.CHOOSE_POST_OFFICE,
  },
  [`${APP.PATHS.CHOOSE_POST_OFFICE}`]: {
    controller: resultsController,
    fields: ["branches"],
    revalidateIf: ["postcode", "branches"],
    next: APP.PATHS.POST_OFFICE_CUSTOMER_LETTER
  },
  [`${APP.PATHS.POST_OFFICE_CUSTOMER_LETTER}`]: {
    fields: ["postOfficeCustomerLetterChoice"],
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: [
      {
        field: "postOfficeCustomerLetterChoice",
        value: APP.POST_OFFICE_CUSTOMER_LETTER.EMAIL,
        next: APP.PATHS.CHECK_DETAILS,
      },
      {
        field: "postOfficeCustomerLetterChoice",
        value: APP.POST_OFFICE_CUSTOMER_LETTER.POST,
        next: APP.PATHS.CHECK_ADDRESS,
      },
    ],
  },
  [`${APP.PATHS.CHECK_ADDRESS}`]: {
    fields: ["customerLetterCheckAddress"],
    controller: checkAddressController,
    next: [
      {
        field: "customerLetterCheckAddress",
        value: APP.CHECK_ADDRESS.EXISTING_ADDRESS,
        next: APP.PATHS.CHECK_DETAILS,
      },
      {
        field: "customerLetterCheckAddress",
        value: APP.CHECK_ADDRESS.DIFFERENT_ADDRESS,
        next: APP.PATHS.FIND_ADDRESS,
      },
    ],
  },
  [`${APP.PATHS.FIND_ADDRESS}`]: {
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    fields: ["letterPostcode"],
    next: APP.PATHS.CHOOSE_ADDRESS,
  },
  [`${APP.PATHS.CHOOSE_ADDRESS}`]: {
    controller: addressResults,
    fields: ["addressResults"],
    next: APP.PATHS.CHECK_DETAILS,
  },
  [`${APP.PATHS.CHECK_DETAILS}`]: {
    controller: checkDetails,
    next: APP.PATHS.DONE,
  },
  [`${APP.PATHS.ABORT}`]: {
    entryPoint: true,
    skip: true,
    controller: abort,
  },
  [`${APP.PATHS.DONE}`]: {
    skip: true,
    noPost: true,
    next: APP.PATHS.OAUTH2,
  },
  [`${APP.PATHS.ERROR}`]: {
    entryPoint: true,
  },
};
