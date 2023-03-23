const resultsController = require("./controllers/results");
const postcodeController = require("./controllers/search")
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
  "/findBranch": {
    controller: postcodeController,
    // editable: true,
    // editBackStep: "locations",
    fields: ["postcode"],
    next: "locations",
  },
  "/locations": {
    controller: resultsController,
    fields: ["locations"],
    next: "done"
  }
}