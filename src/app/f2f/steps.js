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
  "/findBranch": {
    fields: ["postcode"],
    next: "locations",
  },
  "/locations": {
    controller: resultsController,
    next: "done"
  }
}