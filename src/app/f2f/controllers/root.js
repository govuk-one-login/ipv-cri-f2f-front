const { Controller: BaseController } = require("hmpo-form-wizard");

class RootController extends BaseController {
  async saveValues(req, res, next) {
    const sharedClaims = req.session?.shared_claims;

    if (sharedClaims) {
      if (sharedClaims?.postcode?.length > 0) {
        req.sessionModel.set("postcode", sharedClaims.postcode)
      }
    }
    super.saveValues(req, res, next);
  }
}

module.exports = RootController;