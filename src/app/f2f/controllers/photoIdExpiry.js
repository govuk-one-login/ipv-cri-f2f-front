const { APP } = require("../../../lib/config");
const BaseController = require("hmpo-form-wizard").Controller;
const logger = require("../../../lib/logger").get();

class PhotoIdExpiryController extends BaseController {
  async saveValues(req, res, next) {
    try {
      logger.info("user selecting new option after photo Id expiry", {
        req,
        res,
      });
      req.sessionModel.set("redirect_url", undefined);
      req.sessionModel.set(
        APP.PHOTO_ID_EXPIRY_OPTIONS.RE_ENTER_DETAILS,
        undefined
      );
      req.sessionModel.set(
        APP.PHOTO_ID_EXPIRY_OPTIONS.CHOOSE_DIFFERENT_PHOTO_ID,
        undefined
      );
      req.sessionModel.set(
        APP.PHOTO_ID_EXPIRY_OPTIONS.PROVE_IDENTITY_ANOTHER_WAY,
        undefined
      );

      const action = req.form.values.photoIdExpiryChoice;
      req.sessionModel.set("photoIdExpiryChoice", action);

      switch (action) {
        case APP.PHOTO_ID_EXPIRY_OPTIONS.RE_ENTER_DETAILS: {
          logger.info(
            "photo-id-expiry: user has chosen to re-enter details - redirecting to previous data entry page",
            { req, res }
          );
          req.sessionModel.set(
            APP.PHOTO_ID_EXPIRY_OPTIONS.RE_ENTER_DETAILS,
            true
          );
          return next();
        }
        case APP.PHOTO_ID_EXPIRY_OPTIONS.CHOOSE_DIFFERENT_PHOTO_ID: {
          logger.info(
            "photo-id-expiry: user has to choose different photo ID - redirecting to photo ID selection",
            { req, res }
          );
          req.sessionModel.set(
            APP.PHOTO_ID_EXPIRY_OPTIONS.CHOOSE_DIFFERENT_PHOTO_ID,
            true
          );
          return next();
        }
        case APP.PHOTO_ID_EXPIRY_OPTIONS.PROVE_IDENTITY_ANOTHER_WAY: {
          logger.info(
            "photo-id-expiry: user has selected prove identity another way - redirecting to prove identity another way",
            { req, res }
          );
          req.sessionModel.set(
            APP.PHOTO_ID_EXPIRY_OPTIONS.PROVE_IDENTITY_ANOTHER_WAY,
            true
          );
          return next();
        }
      }
      logger.info("photo-id-expiry: Invalid action " + action);
      return next(new Error("photo-id-expiry: Invalid action " + action));
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = PhotoIdExpiryController;
