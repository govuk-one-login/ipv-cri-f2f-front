const { Controller: BaseController } = require("hmpo-form-wizard");
const { API } = require("../../../lib/config");
const NodeRSA = require("node-rsa");
const logger = require("hmpo-logger").get();
// const {
//   createPersonalDataHeaders,
// } = require("@govuk-one-login/frontend-passthrough-headers");

class RootController extends BaseController {
  async saveValues(req, res, next) {
    const sharedClaims = req.session?.shared_claims;

    if (!req.sessionModel.get("addressProcessed")) {
      try {
        const encryptedJSON = await this.getAddressInfo(req.axios, req);
        const key = await this.getDecryptKey(req.axios, req);
        const decryptKey = new NodeRSA(key);
        const userAddress = decryptKey.decrypt(encryptedJSON, "utf8");
        const parsedAddress = JSON.parse(userAddress);

        let addressParts = [];
        if (parsedAddress["address_line1"]) {
          addressParts.push(parsedAddress["address_line1"]);
        }
        if (parsedAddress["address_line2"]) {
          addressParts.push(parsedAddress["address_line2"]);
        }
        if (parsedAddress["town_city"]) {
          addressParts.push(parsedAddress["town_city"]);
        }
        if (parsedAddress["postal_code"]) {
          addressParts.push(parsedAddress["postal_code"]);
        }
        const fullParsedSharedClaimsAddress = addressParts.join("<br>");
        req.sessionModel.set(
          "fullParsedSharedClaimsAddress",
          fullParsedSharedClaimsAddress
        );

        // req.sessionModel.set("addressLine1", parsedAddress["address_line1"]);
        // req.sessionModel.set("addressLine2", parsedAddress["address_line2"]);
        // req.sessionModel.set("townCity", parsedAddress["town_city"]);
        // req.sessionModel.set("postalCode", parsedAddress["postal_code"]);
        req.sessionModel.set("addressProcessed", true);
      } catch (error) {
        logger.error("Error calling /person-info", error);
        res.redirect("/error");
      }
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
      "x-govuk-signin-session-id": req.session.tokenId,
    };
    const res = await axios.get(`${API.PATHS.PERSON_INFO}`, {
      headers,
    });
    return res.data;
  }

  async getDecryptKey(axios) {
    const res = await axios.get(`${API.PATHS.PERSON_INFO_KEY}`);
    return res.data.key;
  }
}

module.exports = RootController;
