module.exports = {
  "/": {
    resetJourney: true,
    reset: true,
    entryPoint: true,
    skip: true,
    // controller: root,
    next: "landingPage",
  },
  "/landingPage": {
    next: "done",
  },
  "/findBranch": {
    fields: ["postcode"],
    next: "locations",
  },
  "/locations": {
    next: "done"
  }
}