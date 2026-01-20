const { Controller: BaseController } = require("hmpo-form-wizard");
const { API, PACKAGE_NAME } = require("../../../lib/config");
const logger =
  require("@govuk-one-login/di-ipv-cri-common-express/src/bootstrap/lib/logger").get(
    PACKAGE_NAME,
  );

class LandingPageController extends BaseController {
  async saveValues(req, res, next) {
    req.sessionModel.set("isThinFileUser", false);

    try {
      const configData = await this.getSessionConfig(req, res);
      if (configData && configData.evidence_requested?.strengthScore === 4) {
        // Show thin file user screen
        req.sessionModel.set("isThinFileUser", true);
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
