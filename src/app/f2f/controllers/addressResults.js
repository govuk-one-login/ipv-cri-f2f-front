const BaseController = require("hmpo-form-wizard").Controller;
const { API } = require("../../../lib/config");
const presenters = require("../../../presenters");
const { convertKeysToLowerCase } = require("../utils");
const {
  createPersonalDataHeaders,
} = require("@govuk-one-login/frontend-passthrough-headers");

class AddressResultsController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, async (err, locals) => {
      if (err) {
        return callback(err, locals);
      }
      try {
        const letterPostcode = req.form.values.letterPostcode;
        locals.letterPostcode = letterPostcode;
        const osData = await this.getOsAddresses(req.axios, letterPostcode);
        const searchResults = convertKeysToLowerCase(osData)
        const formattedResults = searchResults.map(
          (item) => item.dpa
        );
        req.sessionModel.set("searchResults", formattedResults);
        const addressResults = presenters.addressesToSelectItems({
          addresses: formattedResults,
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
        console.log("selectedAddress", selectedAddress);
        const searchResults = req.sessionModel.get("searchResults");
        const chosenAddress = this.getAddress(selectedAddress, searchResults);
        req.sessionModel.set("postalAddress", chosenAddress);
        console.log("chosenAddress", chosenAddress);
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

  async getOsAddresses(axios, postcode) {
    const sessionId = "3a38ef50-f782-4877-8618-835c1b2658c5";
    if (sessionId) {
      const headers = { 
        "x-govuk-signin-session-id": sessionId,
        "postcode": postcode
      };
      try {
        console.log("HEADERS address:", headers)
        const response = await axios.post(`${API.PATHS.ADDRESS_LOCATIONS}`, {}, {
          headers,
        });
        return response.data;
      } catch(error) {
        throw new Error("Error calling /addressLocations", error);
      }
    } else {
      throw new Error("Missing sessionID, redirecting to /error");
    }
  }
}

module.exports = AddressResultsController;
