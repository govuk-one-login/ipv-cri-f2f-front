const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const { afterEach } = require("mocha");
const RootController = require("./root.js");

describe("RootController", () => {
  const rootController = new RootController({ route: "/test" });
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
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should be an instance of BaseController", () => {
    expect(rootController).to.be.an.instanceOf(BaseController);
  });

  describe("saveValues", () => {
    it("should save the values to the sessionModel", async () => {
      req.session.shared_claims = {
        address: [
          {
            postalCode: "SW1A 2RR",
          },
        ],
      };

      await rootController.saveValues(req, res, next);
      const postcode = req.sessionModel.get("postcode");

      expect(postcode).to.equal("SW1A 2RR");
    });

    it("should not update sessionModel when shared_claims is empty", async () => {
      req.session.shared_claims = {
        address: [
          {
            postalCode: "",
          },
        ],
      };

      await rootController.saveValues(req, res, next);
      const postcode = req.sessionModel.get("postcode");

      expect(postcode).to.equal(undefined);
    });

    it("should call getAddressInfo info correctly", async () => {});

    it("should call getDecryptKey info correctly", async () => {});

    it("should call parseAndDecryptAddress info correctly", async () => {}); ///?
  });
});
