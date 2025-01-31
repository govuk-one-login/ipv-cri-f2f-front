const BaseController = require("hmpo-form-wizard").Controller;
const { API } = require("../../../lib/config");
const presenters = require("../../../presenters");
const { convertKeysToLowerCase } = require("../utils");

class AddressResultsController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, async (err, locals) => {
      if (err) {
        return callback(err, locals);
      }
      try {
        const letterPostcode = req.form.values.letterPostcode;
        locals.letterPostcode = letterPostcode;
        const osData = await this.getOsAddresses(req, req.axios, letterPostcode);
        const searchResults = convertKeysToLowerCase(osData);
        const formattedResults = searchResults.map((item) => item.dpa);
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

  async getOsAddresses(req, axios, postcode) {
    const sessionId = "7de421b3-f3cb-4c43-9005-5038eb59644d";
    if (sessionId) {
      const headers = {
        "x-govuk-signin-session-id": sessionId,
        postcode: postcode,
      };
      try {
        const response = await axios.post(
          `${API.PATHS.ADDRESS_LOCATIONS}`,
          {},
          {
            headers,
          }
        );
        return response.data;
      } catch (error) {
        throw new Error("Error calling /addressLocations", error);
      }
    } else {
      throw new Error("Missing sessionID, redirecting to /error");
    }
  }
}

module.exports = AddressResultsController;
