const BaseController = require("hmpo-form-wizard").Controller;
const { APP } = require("../../../lib/config");
const { EU_DL_COUNTRIES } = require("../countryCodes/euDrivingLicence");
const { NON_UK_PASSPORT } = require("../countryCodes/nonUkPassport");

class CountrySelectorController extends BaseController {

  async saveValues(req, res, next) {
    try {
      const country = req.form.values.euDrivingLicenseCountrySelector

      switch (country) {
        case NON_UK_PASSPORT.AFGHANISTAN.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.AFGHANISTAN.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.ALBANIA.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.ALBANIA.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.ALGERIA.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.ALGERIA.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.ANDORRA.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.ANDORRA.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.ANGOLA.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.ANGOLA.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.ANTIGUA.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.ANTIGUA.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.ARGENTINA.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.ARGENTINA.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.ARMENIA.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.ARMENIA.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.AUSTRALIA.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.AUSTRALIA.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.AUSTRIA.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.AUSTRIA.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.AZERBAIJAN.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.AZERBAIJAN.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.BAHAMAS.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.BAHAMAS.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.BAHRAIN.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.BAHRAIN.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.BANGLADESH.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.BANGLADESH.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.BARBADOS.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.BARBADOS.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.BELARUS.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.BELARUS.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.BELGIUM.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.BELGIUM.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.BELIZE.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.BELIZE.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.BENIN.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.BENIN.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.BHUTAN.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.BHUTAN.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.BOLIVIA.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.BOLIVIA.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.BOSNIA.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.BOSNIA.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.BOTSWANA.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.BOTSWANA.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.BRAZIL.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.BRAZIL.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.BRUNEI.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.BRUNEI.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.BULGARIA.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.BULGARIA.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.BURKINA_FASO.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.BURKINA_FASO.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.BURUNDI.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.BURUNDI.code);
          req.sessionModel.set("country", country)
          return next();
        }
        case NON_UK_PASSPORT.CAMBODIA.text: {
          req.sessionModel.set("countryCode", NON_UK_PASSPORT.CAMBODIA.code);
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
          req.sessionModel.set("country", country)
          return next();
        }
        case EU_DL_COUNTRIES.DENMARK.text: {
          req.sessionModel.set("countryCode", EU_DL_COUNTRIES.DENMARK.code);
          req.sessionModel.set("country", country)
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
