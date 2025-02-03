const { Controller: BaseController } = require("hmpo-form-wizard");

class CheckAddressController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      locals.addressLine = req.sessionModel.get(
        "fullParsedSharedClaimsAddress"
      );
      callback(err, locals);
    });
  }
}
module.exports = CheckAddressController;
