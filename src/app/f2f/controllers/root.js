const { Controller: BaseController } = require("hmpo-form-wizard");
const { API } = require("../../../lib/config");

class RootController extends BaseController {
  async saveValues(req, res, next) {
    const tokenId = req.session.tokenId
    console.log("7", tokenId)
    if (tokenId) {
      const headers = {
        "x-govuk-signin-session-id":tokenId      
      };
      const response = await req.axios.get(
        `${API.PATHS.PERSON_INFO}`, headers);
      console.log("PERSON INFO RESPONSE", response)
    }

    const sharedClaims = req.session?.shared_claims;

    if (sharedClaims) {
      if (sharedClaims?.address[0]?.postalCode?.length > 0) {
        req.sessionModel.set("postcode", sharedClaims.address[0].postalCode);
      }
    }
    super.saveValues(req, res, next);
  }
}

module.exports = RootController;
