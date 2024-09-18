const { Controller: BaseController } = require("hmpo-form-wizard");
const accessibleAutocomplete = require("accessible-autocomplete")

class CountryController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, async (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      accessibleAutocomplete.enhanceSelectElement({
        selectElement: document.querySelector('#location-picker')
      })

    });
  }


}

module.exports = LandingPageController;
CountryController