const BaseController = require("hmpo-form-wizard").Controller;
const { API } = require("../../../lib/config");
const { PROXY_API } = require("../../../../src/lib/config");
const {
  createPersonalDataHeaders,
} = require("@govuk-one-login/frontend-passthrough-headers");

const presenters = require("../../../presenters");
const { convertKeysToLowerCase } = require("../utils");

class AddressResultsController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, async (err, locals) => {
      if (err) {
        return callback(err, locals);
      }
      try {
        const osApiKey = await this.getOsApiKey(req.axios, req);
        console.log("KEY", osApiKey);
        const letterPostcode = req.sessionModel.get("letterPostcode");
        console.log("KEY2", letterPostcode);
        locals.letterPostcode = letterPostcode;
        const osData = await this.getOsApiAddresses(
          req.axios,
          req,
          letterPostcode,
          osApiKey
        );
        const searchResults = convertKeysToLowerCase(osData.results).map(
          (item) => item.dpa
        );
        req.sessionModel.set("searchResults", searchResults);
        const addressResults = presenters.addressesToSelectItems({
          addresses: searchResults,
        });
        locals.addressResults = addressResults;
        callback(err, locals);
      } catch (err) {
        callback(err);
      }
    });
  }

  saveValues(req, res, callback) {
    super.saveValues(req, res, () => {
      try {
        const selectedAddress = req.form.values.addressResults;
        const searchResults = req.sessionModel.get("searchResults");
        const chosenAddress = this.getAddress(selectedAddress, searchResults);
        req.sessionModel.set("postalAddress", chosenAddress);
        callback();
      } catch (err) {
        callback(err);
      }
    });
  }

  getAddress(selectedAddress, searchResults) {
    const chosenAddress = Object.assign(
      {},
      searchResults.find(
        (address) =>
          presenters.addressPresenter.generateSearchResultString(address) ===
          selectedAddress
      )
    );

    return chosenAddress;
  }

  async getOsAddresses(req, res, postcode) {
    const tokenId = req.session.tokenId;

    if (tokenId) {
      const headers = {
        "postcode": postcode,
        ...createPersonalDataHeaders(
          `${API.BASE_URL}${API.PATHS.ADDRESS_LOCATIONS}`,
          req
        ),
      }
      try {
        const { data } = await req.axios.get(`${API.PATHS.ADDRESS_LOCATIONS}`, {
          headers,
        });
        return data;
      } catch (error) {
        console.log("Error calling /addressLocations");
        logger.error("Error calling /addressLocations", error);
      }
    } else {
      console.error("Missing sessionID, redirecting to /error");
      res.redirect("/error");
    }
  }


}

module.exports = AddressResultsController;
