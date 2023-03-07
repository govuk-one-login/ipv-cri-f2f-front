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
  }
}