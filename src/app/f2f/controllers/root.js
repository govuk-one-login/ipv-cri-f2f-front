const { Controller: BaseController } = require("hmpo-form-wizard");
const { API } = require("../../../lib/config");

class RootController extends BaseController {
  async saveValues(req, res, next) {
	req.sessionModel.set("isThinFileUser", false);
    const sharedClaims = req.session?.shared_claims;

    if (sharedClaims) {
      if (sharedClaims?.address[0]?.postalCode?.length > 0) {
        req.sessionModel.set("postcode", sharedClaims.address[0].postalCode)
      }
    }
		try {

		  const resp = await this.getSessionConfig(req);
		  if(resp && resp.evidence_requested?.strengthScore === 4){
			  //Show thin file user screen
        console.log("Setting isThinFileUser to true")
			  req.sessionModel.set("isThinFileUser", true)
		  }

		  super.saveValues(req,res, next);
		} catch (err) {
      return next(new Error("root: Error getting session config"));
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
			  console.log("Returning response from /sessionConfiguration "+JSON.stringify(resp.data));
			  return resp.data;
		}catch(error){
      console.log("Error calling /sessionConfiguration "+error);
		}
  }

}

module.exports = RootController;
