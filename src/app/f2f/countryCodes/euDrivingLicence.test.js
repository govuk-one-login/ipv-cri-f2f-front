const { EU_DL_COUNTRIES } = require("./euDrivingLicence");

describe("#EU_DL_COUNTRIES", () => {
  it("Should contain nested objects with 2 values - text and code as strings", () => {
    expect(EU_DL_COUNTRIES.DENMARK).to.deep.equal({ text: "Denmark", code: "DNK"} )
  })
})