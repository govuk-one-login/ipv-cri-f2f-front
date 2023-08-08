const { APP } = require("../../../lib/config");
const BaseController = require("hmpo-form-wizard").Controller;
const logger = require("hmpo-logger").get();

class PhotoIdSelectionThinFileController extends BaseController {

  async saveValues(req, res, next) {
    try {
      logger.info("user submitting photo Id choice for thin file", { req, res });
      req.sessionModel.set("redirect_url", undefined);
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.UK_PASSPORT, undefined);
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT, undefined);
      req.sessionModel.set(APP.PHOTO_ID_OPTIONS.NO_PHOTO_ID, undefined)

      const action = req.form.values.photoIdChoiceThinFile;
      console.log("ACTION", action)
      req.sessionModel.set("photoIdChoice", action);
      console.log("❗️", req.sessionModel)
      const answer = req.sessionModel.get("photoIdChoice")
      console.log("ANSWER", answer)

      switch (action) {
        case APP.PHOTO_ID_OPTIONS.UK_PASSPORT: {
          logger.info(
            "photo-id-selection: user has selected UK passport - redirecting to passport details page",
            { req, res }
          );
          req.sessionModel.set(APP.PHOTO_ID_OPTIONS.UK_PASSPORT, true);
          req.sessionModel.set("selectedDocument", "UK passport");
          req.sessionModel.set("changeUrl", "uk-passport-expire");
          console.log("❗️31")
          const selectedDoc = req.sessionModel.get("selectedDocument");
          const changeURL = req.sessionModel.get("changeUrl");
          console.log("✅", selectedDoc)
          console.log("💠", changeURL)
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
          console.log("54")
          return next();
        }
      }
      logger.info("photo-id-selection: Invalid action 🚀" + action);
      return next(new Error("photo-id-selection: Invalid action " + action));
    } catch (err) {
      return next(err);
    }
  }

}

module.exports = PhotoIdSelectionThinFileController;

