import { PACKAGE_NAME } from "../../lib/config.js";
import { get as getLogger } from "../../lib/logger.js";
const logger = getLogger(PACKAGE_NAME);

export function featureSets(req, res, next) {
  try {
    const featureSet = req.query.featureSet;
    const isValidFeatureSet = /^\w{1,32}$/.test(featureSet);
    if (!isValidFeatureSet) {
      throw new Error("Invalid feature set ID");
    }

    if (featureSet !== undefined) {
      logger.info("feature set is " + featureSet);
      req.session.featureSet = featureSet;
    }
    next();
  } catch (error) {
    return next(error);
  }
};
