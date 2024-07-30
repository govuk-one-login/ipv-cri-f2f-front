const BaseController = require("hmpo-form-wizard").Controller;
const { API } = require("../../../lib/config");
const presenters = require("../../../presenters");
const convertKeysToLowerCase = require("../utils")
  
  class AddressResultsController extends BaseController {
    locals(req, res, callback) {
      super.locals(req, res, async (err, locals) => {
        if (err) {
          callback(err, locals);
        }
        try {
            req.sessionModel.set("letterPostcode", "BS65AS");
            locals.letterPostcode = req.sessionModel.get("letterPostcode");
            const letterPostcode = req.sessionModel.get("letterPostcode");
            const osKey = API.OS_KEY
    
            const { data: osData } = await req.axios.get(
            `https://api.os.uk/search/places/v1/postcode?postcode=${letterPostcode}&key=${osKey}`
            )
            const searchResults = convertKeysToLowerCase(osData.results).map(item => item.dpa)
            req.sessionModel.set("searchResults", searchResults)
            const addressResults = presenters.addressesToSelectItems({
              addresses: searchResults,
            });
            locals.addressResults = addressResults
        } catch (err) {
            callback(err);
        }
        callback(err, locals);
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
  }
  
  module.exports = AddressResultsController;
  