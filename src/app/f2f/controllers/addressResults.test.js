const BaseController = require("hmpo-form-wizard").Controller;
const AddressResultsController = require("./addressResults");
const { API } = require("../../../../src/lib/config");
const { PROXY_API } = require("../../../../src/lib/config");
const { expect } = require("chai");

describe("Address Results Controller", () => {
  let addressResults;
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
    addressResults = new AddressResultsController({ route: "/test" });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should be an instance of BaseController", () => {
    expect(addressResults).to.be.an.instanceOf(BaseController);
  });

  describe("#locals", () => {
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
        await addressResults.locals(req, res, next);
      });

      it("should call callback with error and existing locals", () => {
        expect(next).to.have.been.calledWith(error, superLocals);
      });
    });

    context("Ordnance Survey address data successfully fetched", () => {
      const osData = {
        results: [
          {
            dpa: {
              uprn: "11111",
              udprn: "1111111",
              address: "34, MOCK ROAD, PLACEHOLDER PARK, FAKESVILLE, FS6 5AQ",
              building_number: "34",
              thoroughfare_name: "MOCK ROAD",
              dependent_locality: "PLACEHOLDER PARK",
              post_town: "FAKESVILLE",
              postcode: "FS6 5AQ",
            },
          },
          {
            dpa: {
              uprn: "22222",
              udprn: "222222",
              address:
                "BASEMENT FLAT, 36, MOCK ROAD, PLACEHOLDER PARK, FAKESVILLE, FS6 5AQ",
              sub_building_name: "BASEMENT FLAT",
              building_number: "36",
              thoroughfare_name: "MOCK ROAD",
              dependent_locality: "PLACEHOLDER PARK",
              post_town: "FAKESVILLE",
              postcode: "FS6 5AQ",
            },
          },
        ],
      };

      beforeEach(() => {
        
        // req.axios.get.onSecondCall().resolves({ data: osData });
      });

      it("calls OS endpoint with correct data", async () => {
        const letterPostcode = "test";
        req.sessionModel.set("letterPostcode", letterPostcode);

        
        const callbackPromise = new Promise((resolve, reject) => {
          addressResults.locals(req, res, (err, locals) => {
            if (err) {
              reject(err);
            } else {
              resolve(locals);
            }
          });
        });

        await callbackPromise;
        expect(req.axios.get.getCall(1).args[0]).to.equal(
          `${PROXY_API.PATHS.ORDNANCE_SURVEY}postcode=${letterPostcode}&key=1234`
        );
      });
    });

    it("sets sessionModel values", async () => {
      req.axios.get.onFirstCall().resolves({ data: { key: 1234 } });
      req.axios.get.onSecondCall().resolves({ data: osData });
      const callbackPromise = new Promise((resolve, reject) => {
        addressResults.locals(req, res, (err, locals) => {
          if (err) {
            reject(err);
          } else {
            resolve(locals);
          }
        });
      });

      describe("#getOsApiKey", () => {
        it("should make a request to get the OS API key", async () => {
          const apiKey = "DUMMY_OS_API_KEY";
          axiosGetStub.resolves({ data: { key: apiKey } });
      
          const result = await addressResultsController.getOsApiKey(req.axios, req);
      
          expect(result).to.equal(apiKey);
          expect(axiosGetStub).to.have.been.calledWith(
            API.PATHS.OS_KEY,
            sinon.match({
              headers: createPersonalDataHeaders(
                `${API.BASE_URL}${API.PATHS.OS_KEY}`,
                req
              ),
            })
          );
        });
      });

      await callbackPromise;
      expect(req.sessionModel.get("searchResults")).to.eql([
        {
          uprn: "11111",
          udprn: "1111111",
          address: "34, MOCK ROAD, PLACEHOLDER PARK, FAKESVILLE, FS6 5AQ",
          building_number: "34",
          thoroughfare_name: "MOCK ROAD",
          dependent_locality: "PLACEHOLDER PARK",
          post_town: "FAKESVILLE",
          postcode: "FS6 5AQ",
        },
        {
          uprn: "22222",
          udprn: "222222",
          address:
            "BASEMENT FLAT, 36, MOCK ROAD, PLACEHOLDER PARK, FAKESVILLE, FS6 5AQ",
          sub_building_name: "BASEMENT FLAT",
          building_number: "36",
          thoroughfare_name: "MOCK ROAD",
          dependent_locality: "PLACEHOLDER PARK",
          post_town: "FAKESVILLE",
          postcode: "FS6 5AQ",
        },
      ]);
    });
  });
});
