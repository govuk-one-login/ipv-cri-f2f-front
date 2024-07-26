const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const CheckAddressController = require("./checkAddress");

describe("CheckDetails controller", () => {
    let checkAddressController;
    let req;
    let res;
    let next;
  
    beforeEach(() => {
      const setup = setupDefaultMocks();
      req = setup.req;
      res = setup.res;
      next = setup.next;
  
      checkAddressController = new CheckAddressController({ route: "/test" });
    });
  
    it("should be an instance of BaseController", () => {
      expect(checkAddressController).to.be.an.instanceOf(BaseController);
    });

    it("should set locals to shared claims address values", () => {
        const testAddressLine1 = "testAddressLine1"
        const testAddressLine2 = "testAddressLine2"
        const testTownCity = "testTownCity"
        const testPostalCode = "testPostalCode"
        req.sessionModel.set("addressLine1", testAddressLine1)
        req.sessionModel.set("addressLine2", testAddressLine2)
        req.sessionModel.set("townCity", testTownCity)
        req.sessionModel.set("postalCode", testPostalCode)

        checkAddressController.locals(req, res, next)

    setImmediate(() => {
      const locals = next.args[0][1]; // Extract locals from callback arguments
      expect(locals.addressLine1).to.equal(testAddressLine1);
      expect(locals.addressLine2).to.equal(testAddressLine2);
      expect(locals.townCity).to.equal(testTownCity);
      expect(locals.postalCode).to.equal(testPostalCode);
    });
      });
})