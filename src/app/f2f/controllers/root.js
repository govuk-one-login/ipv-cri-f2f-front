const { Controller: BaseController } = require("hmpo-form-wizard");

class RootController extends BaseController {
  async saveValues(req, res, next) {
    const sharedClaims = req.session?.shared_claims;

    if (sharedClaims) {
      if (sharedClaims?.address[0]?.postalCode?.length > 0) {
        req.sessionModel.set("postcode", sharedClaims.address[0].postalCode)
      }
    }
		try {

		  const resp = await this.getSessionConfig(req.axios, req);
		  if(resp && resp.evidence_requested?.strength_score === 4){
			  //Show thin file user screen
		  }else{
			  //Show usual screen
		  }
		  callback();
		} catch (err) {
		  callback(err);
		}
	}
	  
	  async getSessionConfig(axios, req) {
		const headers = {
		  "x-govuk-signin-session-id": req.session.tokenId
		}
		const resp = await axios.get(`${API.PATHS.SESSION_CONFIG}`,null , {
		  headers,
		});
		return resp.data;
	  }
	
  
}

module.exports = RootController;
