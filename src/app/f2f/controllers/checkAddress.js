const { Controller: BaseController } = require("hmpo-form-wizard");

class CheckAddressController extends BaseController {
    locals(req, res, callback) {
        super.locals(req, res, (err, locals) => {
          locals.addressLine1 = req.sessionModel.get("addressLine1")
          locals.addressLine2 = req.sessionModel.get("addressLine2")
          locals.townCity = req.sessionModel.get("townCity")
          locals.postalCode = req.sessionModel.get("postalCode")
          callback(err, locals);
    })}
}
module.exports = CheckAddressController;
