const BaseController = require("hmpo-form-wizard").Controller;
const { API } = require("../../../lib/config");

class AbortController extends BaseController {
  async saveValues(req, res, callback) {
    try {
      await this.abortJourney(req, res);
			callback();
    } catch (err) {
      callback(err);
    }
  }

	async  abortJourney(req, res) {
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
      const REDIRECT_URL = response.headers.location;
			res.redirect(REDIRECT_URL)
    }
	}
}

module.exports = AbortController;
