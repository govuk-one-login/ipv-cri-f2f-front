const { Controller: BaseController } = require("hmpo-form-wizard");
const { APP } = require("../../../lib/config");

class PostOfficeCustomerLetterController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      locals.letterLanguageChoiceEnabled = APP.LETTER_LANGUAGE_CHOICE_ENABLED
      callback(err, locals);
    });
  }
}
module.exports = PostOfficeCustomerLetterController;
