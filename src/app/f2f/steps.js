const resultsController = require("./controllers/results");
const checkDetails = require("./controllers/checkDetails");
const root = require("./controllers/root");

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
    next: "findBranch"
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