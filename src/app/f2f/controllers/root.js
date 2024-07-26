const { Controller: BaseController } = require("hmpo-form-wizard");
const { API } = require("../../../lib/config");
const logger = require("hmpo-logger").get();
const NodeRSA = require("node-rsa");

class RootController extends BaseController {
  async saveValues(req, res, next) {

    const tokenId = req.session.tokenId
    
    if (tokenId) {
      const headers = {
        "x-govuk-signin-session-id": tokenId      
      };
      try { 
        const infoResponse = await req.axios.get(`${API.PATHS.PERSON_INFO}`, {headers});
        const keyResponse = await req.axios.get(`${API.PATHS.PERSON_INFO_KEY}`);
        const personInfo = infoResponse.data
        const key = keyResponse.data.key
        const addressDecrypter = new NodeRSA(key)
        const userAddress = addressDecrypter.decrypt(personInfo, "utf8")
        const parsedAddress = JSON.parse(userAddress)

        req.sessionModel.set("addressLine1", parsedAddress["address_line1"])
        req.sessionModel.set("addressLine2", parsedAddress["address_line2"])
        req.sessionModel.set("townCity", parsedAddress["town_city"])
        req.sessionModel.set("postalCode", parsedAddress["postal_code"])

      } catch(error) {
        console.log("Error calling /person-info")
        logger.error("Error calling /person-info", error);
      }
    }

    const sharedClaims = req.session?.shared_claims;

    if (sharedClaims) {
      if (sharedClaims?.address[0]?.postalCode?.length > 0) {
        req.sessionModel.set("postcode", sharedClaims.address[0].postalCode);
      }
    }
    super.saveValues(req, res, next);
  }
}

module.exports = RootController;
