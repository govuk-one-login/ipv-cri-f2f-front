module.exports = {
  "/": {
    resetJourney: true,
    reset: true,
    entryPoint: true,
    skip: true,
    // controller: root,
    next: "findBranch",
  },
  "/findBranch": {
    fields: ["postcode"],
    next: "locations",
  },
  "/locations": {
    next: "done"
  }
}