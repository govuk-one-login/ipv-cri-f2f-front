const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const sinon = require("sinon");
const AbortController = require('./abort');
const {
  API: {
    PATHS: { ABORT },
  }
} = require("../../../lib/config");

describe("AbortController", () => {
  let abortController;
  let req;
  let res;
  let next;

  beforeEach(() => {
    const setup = setupDefaultMocks();
    req = setup.req;
    res = setup.res;
    next = setup.next;

    abortController = new AbortController({ route: '/abort' });
  });

  it("should be an instance of BaseController", () => {
    expect(abortController).to.be.an.instanceOf(BaseController);
  });

  describe("#abortJourney", () => {
    context("when journey is aborted", () => {
      it("should call abort endpoint successfully", async () => {
        req.axios.post = sinon.fake.resolves();

        await abortController.saveValues(req, res, next);
        expect(next).to.have.been.calledOnce;
        expect(req.axios.post).to.have.been.calledWithExactly(
          ABORT,
          {},
          {
            headers: {
              "x-govuk-signin-session-id": req.session.tokenId
            },
          }
        );
      });

      it("should handle Axios failure and call 'next' with the error", async () => {
        const error = new Error("Axios request failed");
        req.axios.post = sinon.fake.rejects(error);

        await abortController.saveValues(req, res, next);
        expect(next).to.have.been.calledOnceWith(error);
      });
    });
  });
});
