const photoIdSelect = require("./controllers/photoIdSelection");
const resultsController = require("./controllers/results");
const ukPassportDetails = require("./controllers/ukPassportDetails");
const checkDetails = require("./controllers/checkDetails");
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
    editable: true,
    editBackStep: "checkDetails",
    fields: ["photoIdChoice"],
    invalidates: [
      "passportExpiryDate",
      "nonUKPassportExpiryDate",
      "photocardDlExpiryDate",
      "brpExpiryDate",
      "eeaIdCardExpiryDate",
      "euPhotocardDlExpiryDate",
    ],
    next: [
      {
        field: "photoIdChoice",
        value: APP.PHOTO_ID_OPTIONS.UK_PASSPORT,
        next: APP.PATHS.UK_PASSPORT_DETAILS,
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
    controller: checkDetails,
    next: "done",
  },
  "/done": {
    skip: true,
    noPost: true,
    next: "/oauth2/callback",
  },
}