import wizard from "hmpo-form-wizard";
import { mixins } from "@govuk-one-login/frontend-ui";
import { PACKAGE_NAME } from "../../../lib/config.js";
import { get as getLogger } from "../../../lib/logger.js";

const logger = getLogger(PACKAGE_NAME);
const DateController = mixins.Date(wizard.Controller);

export class NonUKPassportDetailsController extends DateController {
  _padYear(value, offset) {
    logger.info({ offset }, "offset value ignored as no padding is applied");
    return value;
  }
}
