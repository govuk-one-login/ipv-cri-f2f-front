const photoIdSelect = require("./controllers/photoIdSelection");
const resultsController = require("./controllers/results");
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
    next: "photoIdSelection",
  },
  "/photoIdSelection": {
    controller: photoIdSelect,
    editable: true,
    editBackStep: "checkDetails",
    fields: ["photoIdChoice"],
    invalidates: [
      "passportExpiryDate",
      "nonUKPassportExpiryDate",
      "photocardDlExpiryDate",
      "brpExpiryDate",
      "euIdCardExpiryDate",
      "youngScotNationalEntitlementCardExpiryDate",
    ],
    next: [
      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.UK_PASSPORT,
        next: APP.PATHS.PASSPORT_DETAILS,
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
        value: APP.PHOTO_ID_OPTIONS.OTHER_PASSPORT,
        next: APP.PATHS.NON_UK_PASSPORT_DETAILS,
      },
      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL,
        next: APP.PATHS.EU_PHOTOCARD_DL_DETAILS,
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
        value: APP.PHOTO_ID_OPTIONS.EU_IDENTITY_CARD,
        next: APP.PATHS.EU_IDENTITY_CARD_DETAILS,
      },
      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.NO_PHOTO_ID,
        next: APP.PATHS.NO_PHOTO_ID,
      },
    ],
  },
  "/findBranch": {
    // editable: true,
    // editBackStep: "locations",
    fields: ["postcode"],
    next: "locations",
  },
  "/locations": {
    controller: resultsController,
    fields: ["branches"],
    next: "checkDetails"
  },
  "/checkDetails": {
    next: "done",
  }
}