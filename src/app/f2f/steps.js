const searchController = require("./controllers/search");
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
    next: "findBranch",
  },
  "/findBranch": {
    controller: searchController,
    fields: ["postcode"],
    next: "locations",
  },
  "/locations": {
    next: "done"
  }
}