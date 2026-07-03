const BaseController = require("hmpo-form-wizard").Controller;
const { expect } = require("chai");
const { APP } = require("../../../lib/config");
const PostOfficeCustomerLetterController = require("./postOfficeCustomerLetter");

describe("CheckAddress controller", () => {
  const postOfficeCustomerLetterController = new PostOfficeCustomerLetterController({ route: "/test" });

  it("should be an instance of BaseController", () => {
    expect(postOfficeCustomerLetterController).to.be.an.instanceOf(BaseController);
  });

  it("saves the APP.LETTER_LANGUAGE_CHOICE_ENABLED value to locals", () => {
    const req = {};
    const res = {};
    postOfficeCustomerLetterController.locals(req, res, (err, locals) => {
      expect(locals.letterLanguageChoiceEnabled).to.equal(APP.LETTER_LANGUAGE_CHOICE_ENABLED);
    });
  });
});
