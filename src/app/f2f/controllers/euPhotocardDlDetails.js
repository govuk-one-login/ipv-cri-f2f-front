const BaseController = require("hmpo-form-wizard").Controller;
const DateControllerMixin = require("hmpo-components").mixins.Date;

const DateController = DateControllerMixin(BaseController);
const logger = require("../../../lib/logger").get();

class EuPhotocardDlController extends DateController {
  _padYear(value, offset) {
    logger.info("offset value of {} ignored as no padding is applied", offset);
    return value;
  }
}

module.exports = EuPhotocardDlController;
