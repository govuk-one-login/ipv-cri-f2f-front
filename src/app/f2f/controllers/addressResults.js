const BaseController = require("hmpo-form-wizard").Controller;
const { API } = require("../../../lib/config")
const { PROXY_API } = require("../../../../src/lib/config");

const presenters = require("../../../presenters");
const { convertKeysToLowerCase } = require("../utils")
  
  class AddressResultsController extends BaseController {
    locals(req, res, callback) {
      super.locals(req, res, async (err, locals) => {
        if (err) {
          return callback(err, locals);
        }
        try {
            const letterPostcode = req.sessionModel.get("letterPostcode");
            locals.letterPostcode = letterPostcode;
    
            const { data: osData } = await req.axios.get(
            `${PROXY_API.PATHS.ORDNANCE_SURVEY}postcode=${letterPostcode}&key=${API.OS_KEY}`
            )
            const searchResults = convertKeysToLowerCase(osData.results).map(item => item.dpa)
            req.sessionModel.set("searchResults", searchResults)
            const addressResults = presenters.addressesToSelectItems({
              addresses: searchResults,
            });
            locals.addressResults = addressResults
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
          console.log("SELECTED ADDRESS!!!", selectedAddress)
          const searchResults = req.sessionModel.get("searchResults");
          console.log("SEARCH RESULTS!!!", searchResults)
          const chosenAddress = this.getAddress(selectedAddress, searchResults);
          console.log("CHOSEN ADDRESS!!!", chosenAddress)
          req.sessionModel.set("postalAddress", chosenAddress);
          callback();
        } catch (err) {
          console.log("SAVE VALS ERR!!!", err)
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
  