const BaseController = require("hmpo-form-wizard").Controller;
const { API } = require("../../../lib/config");

class AbortController extends BaseController {
	locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

			console.log('Abort123');
			console.log('reqSesh', req.session.tokenId);

      callback(err, locals);
    });
  }
  next() {
    return '/done'
  }
  async saveValues(req, res, callback) {
		console.log("Aborting journey");
		console.log('payth', API.PATHS.ABORT)
		console.log('session', req.session)
		const pay = (
      `${API.PATHS.SAVE_F2FDATA}`,
      {
        headers: {
					"x-govuk-signin-session-id": req.session.tokenId
				},
      }
    );

		console.log('pay', pay);
    const fraudCheck = await req.axios.post(
      `${API.PATHS.ABORT}`,
      {
        headers: {
					"x-govuk-signin-session-id": req.session.tokenId
				},
      }
    );

		console.log('fraudCheck', fraudCheck);

    // req.session.authParams.authorization_code =
    //   fraudCheck.data?.authorization_code;

    return super.saveValues(req, res, callback);
  }
}

// class AbortController extends BaseController {
//   async saveValues(req, callback) {
// 		console.log("Aborting");
// 		try {
//       await this.abortJourney(req.axios, req);
//       callback();
//     } catch (err) {
//       callback(err);
//     }
//   }
// 	next() {
//     return '/done'
//   }

//   async abortJourney(axios, req) {
// 		console.log("Aborting journey");
//     const headers = {
//       "x-govuk-signin-session-id": req.session.tokenId
//     }
//     const resp = await axios.post(`${API.PATHS.ABORT}`, {
//       headers,
//     });
//     return resp.data;
//   }
// }

module.exports = AbortController;