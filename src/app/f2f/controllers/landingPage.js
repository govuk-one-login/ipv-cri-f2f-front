import wizard from "hmpo-form-wizard";
import { API, PACKAGE_NAME } from "../../../lib/config.js";
import { get as getLogger } from "../../../lib/logger.js";
const logger = getLogger(PACKAGE_NAME);

export class LandingPageController extends wizard.Controller {
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
        logger.error({ err: error }, "Error calling /sessionConfiguration");
      }
    } else {
      console.error("Missing sessionID, redirecting to /error");
      res.redirect("/error");
    }
  }
}
