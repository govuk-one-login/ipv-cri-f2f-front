const { Controller: BaseController } = require("hmpo-form-wizard");

class EUPhotocardDlCountrySelector extends BaseController {
    
    async saveValues(req, res, next) {
        const language = req.lng
        req.sessionModel.set("language", language)
        console.log("✅", req.sessionModel.get("language"))

        try {
        super.saveValues(req, res, next);
          } catch (err) {
        return next(err);
          }
      }

}

module.exports = EUPhotocardDlCountrySelector