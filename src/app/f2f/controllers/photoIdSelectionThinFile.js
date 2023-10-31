const { APP } = require("../../../lib/config");
const BaseController = require("hmpo-form-wizard").Controller;
const logger = require("hmpo-logger").get();

class PhotoIdSelectionThinFileController extends BaseController {

  async saveValues(req, res, next) {
    try {
      req.sessionModel.set("redirect_url", undefined);
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.UK_PASSPORT, undefined);
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT, undefined);
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.NO_PHOTO_ID, undefined);

      const action = req.form.values.photoIdChoiceThinFile;

      // Same field as PhotoIdSelection to ensure same value gets passed in checkDetails /documentSelection
      req.sessionModel.set("photoIdChoice", action);

      switch (action) {
        case APP.PHOTO_ID_OPTIONS.UK_PASSPORT: {
          logger.info(
            "photo-id-selection: user has selected UK passport - redirecting to passport details page",
            { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.UK_PASSPORT, true);
          req.sessionModel.set("selectedDocument", "UK passport");
          req.sessionModel.set("changeUrl", "uk-passport-expire");
          return next();
        }
        case APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT: {
          logger.info(
            "photo-id-selection: user has selected other passport - redirecting to other passport details page",
            { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT, true);
          req.sessionModel.set("selectedDocument", "Non-UK passport");
          req.sessionModel.set("changeUrl", "non-uk-passport-expire");
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

      logger.warn("photo-id-selection: Invalid action 🚀" + action);
      return next(new Error("photo-id-selection: Invalid action " + action));
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = PhotoIdSelectionThinFileController;
