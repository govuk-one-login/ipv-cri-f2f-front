const BaseController = require("hmpo-form-wizard").Controller;
const { API } = require("../../../lib/config");

class AbortController extends BaseController {
  async saveValues(req, callback) {
		try {
      await this.abortJourney(req.axios, req);
      callback();
    } catch (err) {
      callback(err);
    }
  }

  async abortJourney(axios, req) {
		console.log("Aborting journey");
    const headers = {
      "x-govuk-signin-session-id": req.session.tokenId
    }
    const resp = await axios.post(`${API.PATHS.ABORT}`, {
      headers,
    });
    return resp.data;
  }
}

module.exports = AbortController;