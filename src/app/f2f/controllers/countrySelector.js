const BaseController = require("hmpo-form-wizard").Controller;
const { APP } = require("../../../lib/config");
const { EU_DL_COUNTRIES } = require("../countryCodes/euDrivingLicence");

class CountrySelectorController extends BaseController {

  async saveValues(req, res, next) {
    try {
      const country = req.form.values.euDrivingLicenseCountrySelector

      switch (country) {
        case EU_DL_COUNTRIES.AUSTRIA.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.AUSTRIA.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.BELGIUM.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.BELGIUM.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.BULGARIA.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.BULGARIA.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.CROATIA.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.CROATIA.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.CYPRUS.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.CYPRUS.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.CZECH.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.CZECH.code);
          return next();
        }
        case EU_DL_COUNTRIES.DENMARK.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.DENMARK.code);
          return next();
        }
        case EU_DL_COUNTRIES.ESTONIA.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.ESTONIA.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.FINLAND.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.FINLAND.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.FRANCE.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.FRANCE.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.GERMANY.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.GERMANY.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.GREECE.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.GREECE.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.HUNGARY.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.HUNGARY.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.ITALY.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.ITALY.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.IRELAND.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.IRELAND.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.LATVIA.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.LATVIA.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.LITHUANIA.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.LITHUANIA.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.LUXEMBOURG.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.LUXEMBOURG.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.MALTA.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.MALTA.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.NETHERLANDS.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.NETHERLANDS.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.POLAND.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.POLAND.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.PORTUGAL.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.PORTUGAL.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.ROMANIA.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.ROMANIA.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.SLOVAKIA.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.SLOVAKIA.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.SLOVENIA.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.SLOVENIA.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.SPAIN.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.SPAIN.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.SWEDEN.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.SWEDEN.code);
          req.sessionModel.set("country", country)
          return next();
        }
      }
      return next(new Error("country code selection: Invalid action " + country));
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = CountrySelectorController;
