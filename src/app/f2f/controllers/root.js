const { Controller: BaseController } = require("hmpo-form-wizard");
const { API } = require("../../../lib/config");
// const NodeRSA = require("node-rsa");
const {
  createPersonalDataHeaders,
} = require("@govuk-one-login/frontend-passthrough-headers");

class RootController extends BaseController {
  async saveValues(req, res, next) {
    const sharedClaims = req.session?.shared_claims;

    try {
      const encryptedJSON = await this.getAddressInfo(req.axios, req);
      console.log("!!!!!!", encryptedJSON);
      const key = await this.getDecryptKey(req.axios, req);
      console.log("11111", key);
      const decryptKey = new NodeRSA(key)
      console.log("33333", decryptKey);
      const userAddress = decryptKey.decrypt(encryptedJSON, "utf8")
      console.log("11111", userAddress);
      const parsedAddress = JSON.parse(userAddress)
      console.log("222222", parsedAddress);

      req.sessionModel.set("addressLine1", parsedAddress["address_line1"])
      req.sessionModel.set("addressLine2", parsedAddress["address_line2"])
      req.sessionModel.set("townCity", parsedAddress["town_city"])
      req.sessionModel.set("postalCode", parsedAddress["postal_code"])

    } catch(error) {
      console.error("Error calling /person-info");
      res.redirect("/error");
    } 

    if (sharedClaims) {
      if (sharedClaims?.address[0]?.postalCode?.length > 0) {
        req.sessionModel.set("postcode", sharedClaims.address[0].postalCode);
      }
    }

    super.saveValues(req, res, next);
  }

  async getAddressInfo(axios, req) {
    const headers = {
      "x-govuk-signin-session-id": "3a38ef50-f782-4877-8618-835c1b2658c5",
    //   ...createPersonalDataHeaders(
    //     `${API.BASE_URL}${API.PATHS.PERSON_INFO}`,
    //     req
    //   ),
    };
    const res = await axios.get(`${API.PATHS.PERSON_INFO}`, {
      headers,
    });
    return res.data;
  }

  async getDecryptKey(axios, req) {
    // const headers = {
    //   ...createPersonalDataHeaders(
    //     `${API.BASE_URL}${API.PATHS.PERSON_INFO_KEY}`,
    //     req
    //   ),
    // };
    const res = await axios.get(`${API.PATHS.PERSON_INFO_KEY}`)
    // , {
    //   headers,
    // });
    return res.data.key;
  }
}

module.exports = RootController;
