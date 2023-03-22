//  CONTROLLER FOR SAVING POSTCODE WHEN PRESSED ON SEARCH PAGE
const BaseController = require("hmpo-form-wizard").Controller;

const {
  API: {
    PATHS: { POSTCODE_LOOKUP },
  },
} = require("../../../lib/config");

class PostcodeSearchController extends BaseController {
  locals(req, res) {
    res.locals.postcode = req.sessionModel.get("postcode");

    return super.locals(req, res);
  }

  async saveValues(req, res, next) {
    req.sessionModel.set("postcode", req.form.values.postcode);

    try {
      const postcode = req.form.values.postcode;
      const results = await this.search(
        req.axios,
        postcode,
        req.session.tokenId
      );
      super.saveValues(req, res, () => {
        req.sessionModel.set("requestIsSuccessful", true);
        req.sessionModel.set("results", results);
        req.sessionModel.set("postcode", postcode);
        next();
      });
    } catch (err) {
      req.sessionModel.set("requestIsSuccessful", false);
      req.sessionModel.set("checkDetailsHeader", false);
      req.sessionModel.set("postcode", postcode);
      next();
    }
  }

  async search(axios, postcode, sessionId) {
    const headers = sessionId ? { session_id: sessionId, "session-id": sessionId } : undefined;
    const body = { "searchString": postcode, "productFilter": ["50321"] };

    const results = await axios.post(`${POSTCODE_LOOKUP}`, {
      body,
      headers,
    });
    
    const postOffices = results;
    console.log(postOffices);
    return postOffices;
  }
}

module.exports = PostcodeSearchController;