const resultsController = require("./controllers/results");
const root = require("./controllers/root");

module.exports = {
  "/": {
    resetJourney: true,
    reset: true,
    entryPoint: true,
    skip: true,
    controller: root,
    next: "findBranch",
  },
  "/ukPassportDetails": {
    fields: ["ukPassportExpiryDate"],
    controller: passportDetails,
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