const { Controller: BaseController } = require("hmpo-form-wizard");
const { API } = require("../../../lib/config");

class LandingPageController extends BaseController {

  async saveValues(req, res, next) {

	  req.sessionModel.set("isThinFileUser", false);

		try {
		  const resp = await this.getSessionConfig(req);
		  if(resp && resp.evidence_requested?.strengthScore === 4){
			  //Show thin file user screen
			  req.sessionModel.set("isThinFileUser", true)
		  }

		  super.saveValues(req,res, next);
		} catch (err) {
      return next(err);
		}
	}

	  async getSessionConfig(req) {
		const headers = {
		  "x-govuk-signin-session-id": req.session.tokenId
		}
		try{
			const resp = await req.axios.get(`${API.PATHS.SESSION_CONFIG}`, {
				headers,
			  });
			  return resp.data;
		}catch(error){
      console.log("Error calling /sessionConfiguration ");
		}
  }

}

module.exports = LandingPageController;
