const BaseController = require("hmpo-form-wizard").Controller;
const { API } = require("../../../../src/lib/config");
const presenters = require("../../../presenters");
const convertKeysToLowerCase = require("./convertKeysToLowerCase.js")
  
  
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
    
            const { data: searchResults } = await req.axios.get(
            `https://api.os.uk/search/places/v1/postcode?postcode=${letterPostcode}&key=${osKey}`
            )
            const addressObjects = convertKeysToLowerCase(searchResults.results).map(item => item.dpa)
            locals.addressResults = presenters.addressesToSelectItems({
              addresses: addressObjects,
            });
            console.log("------------------------------------ADD RES", req.form.values.addressResults)
        } catch (err) {
            callback(err);
        }
        callback(err, locals);
      });
    }
  

    // saveValues(req, res, callback) {
    //   super.saveValues(req, res, () => {
    //     try {
    //       const selectedAddress = req.form.values.addressResults;
    //       const searchResults = req.sessionModel.get("searchResults");
  
    //       const chosenAddress = this.getAddress(selectedAddress, searchResults);
  
    //       req.sessionModel.set("address", chosenAddress);
  
    //       callback();
    //     } catch (err) {
    //       callback(err);
    //     }
    //   });
    // }
  
    // getAddress(selectedAddress, searchResults) {
    //   const chosenAddress = Object.assign(
    //     {},
    //     searchResults.find(
    //       (address) =>
    //         presenters.addressPresenter.generateSearchResultString(address) ===
    //         selectedAddress
    //     )
    //   );
  
    //   return chosenAddress;
    // }
  }
  
  module.exports = AddressResultsController;
  