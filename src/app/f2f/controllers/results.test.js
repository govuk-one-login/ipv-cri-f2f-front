const BaseController = require("hmpo-form-wizard").Controller;
const PostcodeSearchController = require("./results");
const { PROXY_API } = require("../../../../src/lib/config");
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
        await postcodeSearch.locals(req, res, next);
      });

      it("should call callback with error and existing locals", () => {
        expect(next).to.have.been.calledWith(error, superLocals);
      });
    });

    context("postOfficeData successfully fetched", () => {
      const postOfficeData = [
        {
          name: 'Broadway',
          address: {
            address1: '1 Broadway',
            address4: 'London',
            address5: 'Greater London',
            postcode: 'SW1H 0AX',
            latitude: 51.49865,
            longitude: -0.13392
          },
        },
        {
          name: "Regent Street St. James's",
          address: {
            address1: "11 Regent Street St. James's",
            address4: 'London',
            address5: 'Greater London',
            postcode: 'SW1Y 4LR',
            latitude: 51.50841,
            longitude: -0.1341
          },
        },
        {
          name: 'Strand',
          address: {
            address1: 'Queensland House',
            address2: '393 Strand',
            address4: 'London',
            address5: 'Greater London',
            postcode: 'WC2R 0LT',
            latitude: 51.5105,
            longitude: -0.1221
          },
        },
        {
          name: 'Westminster Bridge Road',
          address: {
            address1: '125-131 Westminster Bridge Road',
            address4: 'London',
            address5: 'Greater London',
            postcode: 'SE1 7HJ',
            latitude: 51.49947,
            longitude: -0.11381
          },
        },
        {
          name: 'Aldwych',
          address: {
            address1: '95 Aldwych',
            address4: 'London',
            address5: 'Greater London',
            postcode: 'WC2B 4JN',
            latitude: 51.51341,
            longitude: -0.11534
          },
        },
      ];

      beforeEach(() => {
        req.axios.post = sinon.fake.resolves({ data: postOfficeData });
      });

      it("calls port office endpoint with correct data", async () => {
        const postCode = "SW1A 2AA";
        req.sessionModel.set("postcode", postCode);

        await postcodeSearch.locals(req, res, next);

        expect(req.axios.post).to.have.been.calledWith(`https://${PROXY_API.BASE_URL}${PROXY_API.PATHS.POST_OFFICE}`,  {
          "searchString": postCode,
          "productFilter": ["50321"]
        });
      });

      it("post office details are set correctly", async () => {
        await postcodeSearch.locals(req, res, next);

        expect(req.sessionModel.get("postOfficeDetails")).to.eql([
          {
            value: "1",
            conditional: {
              html: ""
            },
            text: postOfficeData[0].name,
            hint: {
              text: postOfficeData[0].address.address1 + ", " + postOfficeData[0].address.address4 + ", " + postOfficeData[0].address.address5 + ", " + postOfficeData[0].address.postcode
            },
          },
          {
            value: "2",
            conditional: {
              html: ""
            },
            text: postOfficeData[1].name,
            hint: {
              text: postOfficeData[1].address.address1 + ", " + postOfficeData[1].address.address4 + ", " + postOfficeData[1].address.address5 + ", " + postOfficeData[1].address.postcode
            }
          },
          {
            value: "3",
            conditional: {
              html: ""
            },
            text: postOfficeData[2].name,
            hint: {
              text: postOfficeData[2].address.address1 + ", " + postOfficeData[2].address.address4 + ", " + postOfficeData[2].address.address5 + ", " + postOfficeData[2].address.postcode
            }
          },
          {
            value: "4",
            conditional: {
              html: ""
            },
            text: postOfficeData[3].name,
            hint: {
              text: postOfficeData[3].address.address1 + ", " + postOfficeData[3].address.address4 + ", " + postOfficeData[3].address.address5 + ", " + postOfficeData[3].address.postcode
            }
          },
          {
            value: "5",
            conditional: {
              html: ""
            },
            text: postOfficeData[4].name,
            hint: {
              text: postOfficeData[4].address.address1 + ", " + postOfficeData[4].address.address4 + ", " + postOfficeData[4].address.address5 + ", " + postOfficeData[4].address.postcode
            }
          },
        ]);
        expect(req.sessionModel.get("payLoadValues")).to.eql({
          location0: {
            addressWithoutPostCode: postOfficeData[0].address.address1 + ", " + postOfficeData[0].address.address4 + ", " + postOfficeData[0].address.address5,
            postcode: postOfficeData[0].address.postcode,
            latitude: postOfficeData[0].address.latitude,
            longitude: postOfficeData[0].address.longitude
          },
          location1: {
            addressWithoutPostCode: postOfficeData[1].address.address1 + ", " + postOfficeData[1].address.address4 + ", " + postOfficeData[1].address.address5,
            postcode: postOfficeData[1].address.postcode,
            latitude: postOfficeData[1].address.latitude,
            longitude: postOfficeData[1].address.longitude
          },
          location2: {
            addressWithoutPostCode: postOfficeData[2].address.address1 + ", " + postOfficeData[2].address.address4 + ", " + postOfficeData[2].address.address5,
            postcode: postOfficeData[2].address.postcode,
            latitude: postOfficeData[2].address.latitude,
            longitude: postOfficeData[2].address.longitude
          },
          location3: {
            addressWithoutPostCode: postOfficeData[3].address.address1 + ", " + postOfficeData[3].address.address4 + ", " + postOfficeData[3].address.address5,
            postcode: postOfficeData[3].address.postcode,
            latitude: postOfficeData[3].address.latitude,
            longitude: postOfficeData[3].address.longitude
          },
          location4: {
            addressWithoutPostCode: postOfficeData[4].address.address1 + ", " + postOfficeData[4].address.address4 + ", " + postOfficeData[4].address.address5,
            postcode: postOfficeData[4].address.postcode,
            latitude: postOfficeData[4].address.latitude,
            longitude: postOfficeData[4].address.longitude
          }
        });
      });
    });
  });
});