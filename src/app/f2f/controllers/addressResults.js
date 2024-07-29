const BaseController = require("hmpo-form-wizard").Controller;
  
class AddressResultsController extends BaseController {
locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
    if (err) {
        callback(err, locals);
    }

    locals.addressPostcode = "BS6 5AS"
    callback(err, locals);
    });
    }
  }
  
  module.exports = AddressResultsController;
  