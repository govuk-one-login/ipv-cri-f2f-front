const { Controller: BaseController } = require("hmpo-form-wizard");
const { API } = require("../../../lib/config");
const logger = require("hmpo-logger").get();

class LandingPageController extends BaseController {
  async saveValues(req, res, next) {
    req.sessionModel.set("isThinFileUser", false);
    req.sessionModel.set("pclEnabled", false);

    try {
      const configData = await this.getSessionConfig(req, res);
      if (configData && configData.evidence_requested?.strengthScore === 4) {
        // Show thin file user screen
        req.sessionModel.set("isThinFileUser", true);
      }
      if (configData) {
        // Save the printed customer letter enabled flag
        req.sessionModel.set(
          "pclEnabled",
          !!(configData.pcl_enabled == "true")
        );
      }

      super.saveValues(req, res, next);
    } catch (err) {
      return next(err);
    }
  }

  async getSessionConfig(req, res) {
    const tokenId = req.session.tokenId;

    if (tokenId) {
      const headers = {
        "x-govuk-signin-session-id": tokenId,
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
    } else {
      console.error("Missing sessionID, redirecting to /error");
      res.redirect("/error");
    }
  }
}

module.exports = LandingPageController;
