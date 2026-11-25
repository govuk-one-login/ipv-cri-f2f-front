import wizard from "hmpo-form-wizard";

export class CheckAddressController extends wizard.Controller {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      locals.addressLine = req.sessionModel.get(
        "fullParsedSharedClaimsAddress",
      );
      callback(err, locals);
    });
  }
}
