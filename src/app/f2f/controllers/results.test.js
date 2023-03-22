const BaseController = require("hmpo-form-wizard").Controller;
const PostcodeSearchController = require("./search");

const testData = require("../../../../test/data/testData");

let req;
let res;
let next;
let sandbox;
let sessionId = "session-id-123";

beforeEach(() => {
  sandbox = sinon.createSandbox();
  const setup = setupDefaultMocks();
  req = setup.req;
  res = setup.res;
  next = setup.next;
  req.session.tokenId = sessionId;
});

afterEach(() => {
  sandbox.restore();
});

describe("Postcode Search Controller", () => {
  let postcodeSearch;
  const testPath = "postcode-lookup"

  beforeEach(() => {
    postcodeSearch = new PostcodeSearchController({ route: "/test" });
  });

  it("should be an instance of BaseController", () => {
    expect(postcodeSearch).to.be.an.instanceOf(BaseController);
  });

  describe("saveValues", () => {
    let testPostcode;

    it("should call api with a postcode", async () => {
      testPostcode = "A1 1AA";

      req.form.values["postcode"] = testPostcode;
    
      await postcodeSearch.saveValues(req, res, next);
      console.log("SEARCH VALUES FINISHED");

      expect(req.axios.get).to.have.been.calledWith(
        `${testPath}/A11AA`,
        {
          headers: {
            session_id: sessionId,
            "session-id": sessionId,
          },
        }
      );
    });

    describe("on api success", () => {
      let prototypeSpy;
      let testPostcode;

      beforeEach(() => {
        prototypeSpy = sinon.stub(BaseController.prototype, "saveValues");
        BaseController.prototype.saveValues.callThrough();
      });

      beforeEach(async () => {
        req.axios.get = sinon.fake.returns(testData.apiResponse);

        testPostcode = "SW1A2RR";
        req.form.values["postcode"] = testPostcode;

        await postcodeSearch.saveValues(req, res, next);
      });

      afterEach(() => {
        prototypeSpy.restore();
      });

      it("should set requestIsSuccessful as true", () => {
        expect(req.sessionModel.get("requestIsSuccessful")).to.be.true;
      });
    })

  })
});