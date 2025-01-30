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
        const letterPostcode = req.sessionModel.get("letterPostcode");
        locals.letterPostcode = letterPostcode;
        const { data: osData } = await getOsAddresses(req, res, letterPostcode);
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

  async getOsAddresses(req, res, postcode) {
    const sessionId = "3a38ef50-f782-4877-8618-835c1b2658c5";
    if (sessionId) {
      const headers = {
        "x-govuk-signin-session-id": sessionId,
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
      } catch(error) {
        console.error("Error calling /address-locations");
        res.redirect("/error");
      }
    } else {
      console.error("Missing sessionID, redirecting to /error");
      res.redirect("/error");
    }
  }
}

module.exports = AddressResultsController;
