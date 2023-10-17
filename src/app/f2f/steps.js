const photoIdSelect = require("./controllers/photoIdSelection");
const resultsController = require("./controllers/results");
const ukPassportDetails = require("./controllers/ukPassportDetails");
const ukPhotocardDlDetails = require("./controllers/ukPhotocardDl");
const photoIdSelectThinFile = require("./controllers/photoIdSelectionThinFile");
const brpDetails = require("./controllers/brpDetails");
const nonUKPassportDetails = require("./controllers/nonUKPassportDetails");
const eeaIdentityCardDetails = require("./controllers/eeaIdentityCardDetails");
const euPhotocardDlDetails = require("./controllers/euPhotocardDlDetails");
const checkDetails = require("./controllers/checkDetails");
const abort = require("./controllers/abort");
const photoIdExpiry = require("./controllers/photoIdExpiry");
const root = require("./controllers/root");
const landingPage = require("./controllers/landingPage");
const { APP } = require("../../lib/config");

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
		  next: APP.PATHS.PHOTO_ID_SELECTION_THIN_FILE
		},
		{
		  field: "isThinFileUser",
		  value: false,
		  next: APP.PATHS.PHOTO_ID_SELECTION_CY,
		}
	]
  },
  [`${APP.PATHS.PHOTO_ID_SELECTION}`]: {
    controller: photoIdSelect,
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
  [`${APP.PATHS.PHOTO_ID_SELECTION_CY}`]: {
    controller: photoIdSelect,
    fields: ["photoIdChoiceCy"],
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
    fields: ["photoIdChoiceThinFile"],
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
        value: APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT,
        next: APP.PATHS.NON_UK_PASSPORT_HAS_EXPIRY_DATE,
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
  "/non-uk-passport-has-expiry-date": {
    fields: ["idHasExpiryDate"],
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: [
      {
        field: "idHasExpiryDate",
        value: APP.HAS_EXPIRY_DATE.YES,
        next: APP.PATHS.NON_UK_PASSPORT_DETAILS
      },
      {
        field: "idHasExpiryDate",
        value: APP.HAS_EXPIRY_DATE.NO,
        next: APP.PATHS.NON_UK_PASSPORT_COUNTRY_SELECTOR
      }
    ]
  },
  [`${APP.PATHS.PHOTOCARD_DL_DETAILS}`]: {
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
      APP.PATHS.PHOTOCARD_DL_ADDRESS_CHECK,
    ],
  },
  [`${APP.PATHS.BRP_DETAILS}`]: {
    fields: ["brpExpiryDate"],
    controller: brpDetails,
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: [
      {
        field: "brpExpiryDate",
        op: "before",
        value: "today",
        next: APP.PATHS.EXPIRED_ID,
      },
      APP.PATHS.FIND_POST_OFFICE,
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
  "/eu-driving-licence-has-expiry-date": {
    fields: ["idHasExpiryDate"],
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: [
      {
        field: "idHasExpiryDate",
        value: APP.HAS_EXPIRY_DATE.YES,
        next: APP.PATHS.EU_PHOTOCARD_DL_DETAILS
      },
      {
        field: "idHasExpiryDate",
        value: APP.HAS_EXPIRY_DATE.NO,
        next: APP.PATHS.EU_DRIVING_LICENCE_ADDRESS_CHECK
      }
    ]
  },
  [`${APP.PATHS.EU_DRIVING_LICENCE_ADDRESS_CHECK}`]: {
    fields: ["euDrivingLicenceAddressCheck"],
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
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
  "/national-identity-card-has-expiry-date": {
    fields: ["idHasExpiryDate"],
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: [
      {
        field: "idHasExpiryDate",
        value: APP.HAS_EXPIRY_DATE.YES,
        next: APP.PATHS.EEA_IDENTITY_CARD_DETAILS
      },
      {
        field: "idHasExpiryDate",
        value: APP.HAS_EXPIRY_DATE.NO,
        next: APP.PATHS.EEA_IDENTITY_CARD_ADDRESS_CHECK
      }
    ]
  },
  [`${APP.PATHS.EEA_IDENTITY_CARD_ADDRESS_CHECK}`]: {
    fields: ["eeaIdCardAddressCheck"],
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: [
      {
        field: "eeaIdCardAddressCheck",
        value: APP.ADDRESS_OPTIONS.CURRENT_ADDRESS,
        next: APP.PATHS.EEA_IDENTITY_CARD_COUNTRY_SELECTOR
      },
      {
        field: "eeaIdCardAddressCheck",
        value: APP.ADDRESS_OPTIONS.DIFFERENT_ADDRESS,
        next: APP.PATHS.PHOTO_ID_SELECTION
      },
      {
        field: "eeaIdCardAddressCheck",
        value: APP.ADDRESS_OPTIONS.ID_NO_ADDRESS,
        next: APP.PATHS.EEA_IDENTITY_CARD_COUNTRY_SELECTOR
      }
    ]
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
        next: APP.PATHS.PHOTO_ID_SELECTION,
      },
      {
        field: "photoIdExpiryChoice",
        value: APP.PHOTO_ID_EXPIRY_OPTIONS.PROVE_IDENTITY_ANOTHER_WAY,
        next: APP.PATHS.ABORT,
      },
    ]
  },
  [`${APP.PATHS.PHOTOCARD_DL_ADDRESS_CHECK}`]: {
    fields: ["ukDlAddressCheck"],
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: [
      {
        field: "ukDlAddressCheck",
        value: "Yes",
        next: APP.PATHS.FIND_POST_OFFICE
      },
      {
        field: "ukDlAddressCheck",
        value: "No",
        next: APP.PATHS.PHOTO_ID_SELECTION
      }
    ]
  },
  [`${APP.PATHS.EEA_IDENTITY_CARD_COUNTRY_SELECTOR}`]: {
    fields: ["eeaIdentityCardCountrySelector"],
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: APP.PATHS.FIND_POST_OFFICE
  },
  [`${APP.PATHS.EU_DRIVING_LICENCE_COUNTRY_SELECTOR}`]: {
    fields: ["euDrivingLicenceCountrySelector"],
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: APP.PATHS.FIND_POST_OFFICE
  },
  [`${APP.PATHS.NON_UK_PASSPORT_COUNTRY_SELECTOR}`]: {
    fields: ["nonUkPassportCountrySelector"],
    editable: true,
    editBackStep: APP.PATHS.CHECK_DETAILS,
    next: APP.PATHS.FIND_POST_OFFICE
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
    revalidateIf: [
      "postcode",
      "branches"
    ],
    next: APP.PATHS.CHECK_DETAILS
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
  }
}
