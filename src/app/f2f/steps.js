const resultsController = require("./controllers/results");
const ukPassportDetails = require("./controllers/ukPassportDetails");
const ukPhotocardDlDetails = require("./controllers/ukPhotocardDl");
const brpDetails = require("./controllers/brpDetails")
const nonUKPassportDetails = require("./controllers/nonUKPassportDetails")
const root = require("./controllers/root");

module.exports = {
  "/": {
    resetJourney: true,
    reset: true,
    entryPoint: true,
    skip: true,
    controller: root,
    next: "nonUKPassportDetails",
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
      "nameEntry",
    ],
  },
  "/nonUKPassportDetails": {
    fields: ["nonUKPassportExpiryDate"],
    controller: nonUKPassportDetails,
    editable: true,
    editBackStep: "checkDetails",
    next: [
      {
        field: "nonUKPassportExpiryDate",
        op: "before",
        value: "today",
        next: "photoIdExpiry",
      },
      "nameEntry",
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
      "nameEntry",
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
      "nameEntry",
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