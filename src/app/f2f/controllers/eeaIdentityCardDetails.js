import wizard from "hmpo-form-wizard";
import { PACKAGE_NAME } from "../../../lib/config.js";
import { get as getLogger } from "../../../lib/logger.js";
import { mixins } from "@govuk-one-login/frontend-ui";

const DateController = mixins.Date(wizard.Controller);
const logger = getLogger(PACKAGE_NAME);

export class EeaIdentityCardDetailsController extends DateController {
  _padYear(value, offset) {
    logger.info({ offset }, "offset value ignored as no padding is applied");
    return value;
  }
}
