const { Controller: BaseController } = require("hmpo-form-wizard");
const { API } = require("../../../lib/config");
const logger = require("hmpo-logger").get();

class LandingPageController extends BaseController {
  async saveValues(req, res, next) {
    req.sessionModel.set("isThinFileUser", false);

    try {
      const configData = await this.getSessionConfig(req);
      if (configData && configData.evidence_requested?.strengthScore === 4) {
        // Show thin file user screen
        req.sessionModel.set("isThinFileUser", true);
      }

      super.saveValues(req, res, next);
    } catch (err) {
      return next(err);
    }
  }

  async getSessionConfig(req) {
    const headers = {
      "x-govuk-signin-session-id": req.session.tokenId,
    };
    try {
      const { data } = await req.axios.get(`${API.PATHS.SESSION_CONFIG}`, {
        headers,
      });
      return data;
    } catch (error) {
      console.log("Error calling /sessionConfiguration");
      logger.error("Error calling /sessionConfiguration", error);
    }
  }
}

module.exports = LandingPageController;
