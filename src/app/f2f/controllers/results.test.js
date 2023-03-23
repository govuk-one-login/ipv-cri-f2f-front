const BaseController = require("hmpo-form-wizard").Controller;
const PostcodeSearchController = require("./results");

const { expect } = require("chai");

describe("Postcode Search Controller", () => {
  

  let postcodeSearch;
  let req;
  let res;
  let next;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    const setup = setupDefaultMocks();
    req = setup.req;
    res = setup.res;
    next = setup.next;
    postcodeSearch = new PostcodeSearchController({ route: "/test" });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should be an instance of BaseController", () => {
    expect(postcodeSearch).to.be.an.instanceOf(BaseController);
  });

  describe("locals", () => {
    let prototypeSpy;

    beforeEach(() => {
      prototypeSpy = sinon.stub(BaseController.prototype, "locals");
      BaseController.prototype.locals.callThrough();
    });

    afterEach(() => {
      prototypeSpy.restore();
    });

    context("with error on callback", () => {
      let error;
      let locals;
      let superLocals;

      beforeEach(async () => {
        error = new Error("Help please");
        superLocals = {
          superKey: "superValue",
        };

        locals = {
          key: "value",
        };
        res.locals = locals;
        BaseController.prototype.locals.yields(error, superLocals);
        await postcodeSearch.locals(req, res, next);
      });

      it("should call callback with error and existing locals", () => {

        expect(next).to.have.been.calledWith(error, superLocals);
      });
    });
  });
});