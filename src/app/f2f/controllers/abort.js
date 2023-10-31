const BaseController = require("hmpo-form-wizard").Controller;
const { API } = require("../../../lib/config");
const logger = require("hmpo-logger").get();

class AbortController extends BaseController {
  async saveValues(req, res, callback) {
    try {
      await this.abortJourney(req, res);
    } catch (err) {
      callback(err);
    }
  }

	async abortJourney(req, res) {
    const headers = {
      "x-govuk-signin-session-id": req.session.tokenId
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

      logger.warn("Session aborted successfully - now redirecting", { location: REDIRECT_URL });

			res.redirect(REDIRECT_URL)
    }
	}
}

module.exports = AbortController;
