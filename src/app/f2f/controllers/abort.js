const BaseController = require("hmpo-form-wizard").Controller;
const { API } = require("../../../lib/config");

class AbortController extends BaseController {
  next() {
    return '/done'
  }
  async saveValues(req, res, callback) {
    try {
      await this.abortJourney(req);
      callback();
    } catch (err) {
      callback(err);
    }
  }
  async abortJourney(req) {
    const headers = {
      "x-govuk-signin-session-id": req.session.tokenId
    };

		const resp = await req.axios.post(`${API.PATHS.ABORT}`, {}, {
      headers,
    });
    return resp.data;
  }
}
module.exports = AbortController;
