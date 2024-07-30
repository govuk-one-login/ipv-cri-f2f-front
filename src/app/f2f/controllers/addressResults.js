const BaseController = require("hmpo-form-wizard").Controller;
const { API } = require("../../../../src/lib/config");

class AddressResultsController extends BaseController {
locals(req, res, callback) {
    super.locals(req, res, async (err, locals) => {
    if (err) {
        callback(err, locals);
    }
    try {
        req.sessionModel.set("letterPostcode", "SE999JZ");
        locals.letterPostcode = req.sessionModel.get("letterPostcode");
        const letterPostcode = req.sessionModel.get("letterPostcode");
        const osKey = API.OS_KEY

        const { data: osData } = await req.axios.get(
        `https://api.os.uk/search/places/v1/postcode?postcode=${letterPostcode}&key=${osKey}`
        )
        console.log("OS RESULTS", osData.results[0].DPA.ADDRESS)
        const addressResults = osData.results[0].DPA.ADDRESS
        const resultsArray = []
        resultsArray.push(addressResults)
        locals.addressResults = resultsArray
    } catch {
        return undefined
    }
    callback(err, locals);
    });
    }
  }
  
  module.exports = AddressResultsController;
  