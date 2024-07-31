const BaseController = require("hmpo-form-wizard").Controller;
const { API } = require("../../../lib/config");
const logger = require("hmpo-logger").get();
const {
  createPersonalDataHeaders,
} = require("@govuk-one-login/frontend-passthrough-headers");

class AbortController extends BaseController {
  async saveValues(req, res, callback) {
    try {
      await this.abortJourney(req, res);
    } catch (err) {
      callback(err);
    }
  }

  async abortJourney(req, res) {
    const tokenId = req.session.tokenId;

    if (tokenId) {
      const headers = {
        "x-govuk-signin-session-id": "6a9645ea-b4f8-4bd1-ba49-9ee0e8333e1e",
        ...createPersonalDataHeaders(`${API.BASE_URL}${API.PATHS.ABORT}`, req),
      };

      const response = await req.axios.post(
        `${API.PATHS.ABORT}`,
        { reason: "session_expired" },
        {
          headers,
        }
      );

      if (response.status === 200 && response.headers.location) {
        const REDIRECT_URL = decodeURIComponent(response.headers.location);

        logger.warn("Session aborted successfully - now redirecting", {
          location: REDIRECT_URL,
        });

        res.redirect(REDIRECT_URL);
      }
    } else {
      console.error("Missing sessionID, redirecting to /error");
      res.redirect("/error");
    }
  }
}

module.exports = AbortController;
