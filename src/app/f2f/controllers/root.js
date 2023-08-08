const { Controller: BaseController } = require("hmpo-form-wizard");
const { API } = require("../../../lib/config");

class RootController extends BaseController {
  async saveValues(req, res, next, callback) {
	req.sessionModel.set("isThinFileUser", false);
    const sharedClaims = req.session?.shared_claims;

    if (sharedClaims) {
      if (sharedClaims?.address[0]?.postalCode?.length > 0) {
        req.sessionModel.set("postcode", sharedClaims.address[0].postalCode)
      }
    }
		try {

		  const resp = await this.getSessionConfig(req.axios);
		  if(resp && resp.evidence_requested?.strengthScore === 4){
			  //Show thin file user screen
			  req.sessionModel.set("isThinFileUser", true)
		  }

		  super.saveValues(req,res, next);
		} catch (err) {
      console.log("Error getting session config"+err);
		  callback(err);
		}
	}

	  async getSessionConfig(axios, req, res) {
		const headers = {
			"x-govuk-signin-session-id": req.session.tokenId
		  }
		try{
			const resp = await axios.get(`${API.PATHS.SESSION_CONFIG}`, {
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
