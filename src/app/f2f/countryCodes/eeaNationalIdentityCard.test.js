const { EEA_ID_CARD } = require("./eeaNationalIdentityCard");

describe("#EEA_ID_CARD", () => {
  it("Should contain nested objects with 2 values - text and code as strings", () => {
    expect(EEA_ID_CARD.AUSTRIA).to.deep.equal({ text: "Austria", code: "AUT"} )
  })
})