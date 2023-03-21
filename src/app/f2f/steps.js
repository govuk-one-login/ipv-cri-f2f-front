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
    next: "findBranch",
  },
  "/findBranch": {
    // fields: ["findBranch"],
    next: "done",
  }
}