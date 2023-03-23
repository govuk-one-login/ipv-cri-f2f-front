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
    fields: ["postcode"],
    next: "locations",
  },
  "/locations": {
    controller: resultsController,
    next: "done"
  }
}