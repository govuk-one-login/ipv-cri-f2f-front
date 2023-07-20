const BaseController = require("hmpo-form-wizard").Controller;
const AbortController = require('./abort');

describe("AbortController", () => {
  const abortController = new AbortController({ route: '/abort' });

  it("should be an instance of BaseController", () => {
    expect(abortController).to.be.an.instanceOf(BaseController);
  });

})