const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;

const DateController = DateControllerMixin(BaseController);
const { PACKAGE_NAME } = require("../../../lib/config");
const logger = require("../../../lib/logger").get(PACKAGE_NAME);

class EuPhotocardDlController extends DateController {
  _padYear(value, offset) {
    logger.info({ offset }, "offset value ignored as no padding is applied");
    return value;
  }
}

module.exports = EuPhotocardDlController;
