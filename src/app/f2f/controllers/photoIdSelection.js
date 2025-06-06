const { APP } = require("../../../lib/config");
const BaseController = require("hmpo-form-wizard").Controller;
const logger = require("hmpo-logger").get();

class PhotoIdSelectionController extends BaseController {
  async saveValues(req, res, next) {
    try {
      logger.info("user submitting photo Id choice", { req, res });
      req.sessionModel.set("redirect_url", undefined);
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.UK_PASSPORT, undefined);
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL, undefined);
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT, undefined);
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL, undefined);
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.EEA_IDENTITY_CARD, undefined);
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.NO_PHOTO_ID, undefined);

      const action = req.form.values.photoIdChoice;
      req.sessionModel.set("photoIdChoice", action);

      switch (action) {
        case APP.PHOTO_ID_OPTIONS.UK_PASSPORT: {
          logger.info(
            "photo-id-selection: user has selected UK passport - redirecting to passport details page",
            { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.UK_PASSPORT, true);
          req.sessionModel.set("changeUrl", "uk-passport-expire");
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL: {
          logger.info(
            "photo-id-selection: user has selected UK DL - redirecting to driving license details page",
            { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL, true);
          req.sessionModel.set("changeUrl", "uk-driving-licence-expire");
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT: {
          logger.info(
            "photo-id-selection: user has selected other passport - redirecting to other passport details page",
            { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT, true);
          req.sessionModel.set("changeUrl", "non-uk-passport-expire");
          return next();
        }

        case APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL: {
          logger.info(
            "photo-id-selection: user has selected EU photocard driving licence - redirecting to driving license details page",
            { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL, true);
          req.sessionModel.set("changeUrl", "eu-driving-licence-expire");
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.EEA_IDENTITY_CARD: {
          logger.info(
            "photo-id-selection: user has selected EU ID Card - redirecting to EU ID Card details page",
            { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.EEA_IDENTITY_CARD, true);
          req.sessionModel.set("changeUrl", "national-identity-card-expire");
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.NO_PHOTO_ID: {
          logger.info(
            "photo-id-selection: user has selected No ID - aborting journey",
            { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.NO_PHOTO_ID, true);
          return next();
        }
      }
      logger.info("photo-id-selection: Invalid action " + action);
      return next(new Error("photo-id-selection: Invalid action " + action));
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = PhotoIdSelectionController;
