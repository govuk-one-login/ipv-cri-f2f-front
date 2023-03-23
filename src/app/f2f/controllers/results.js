const BaseController = require("hmpo-form-wizard").Controller;

const {
  API: {
    PATHS: { POSTCODE_LOOKUP },
  },
} = require("../../../lib/config");

class PostcodeSearchController extends BaseController {

  locals(req, res, callback) {
    super.locals(req, res, async(err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      const resp = await req.axios.post(`https://locations.pol-platform.co.uk/v1/locations/search`, {
        "searchString": "SW1 1AA",
        "productFilter": ["50321"]
      });
      console.log(resp.data);

      locals.branch = 
      {
        id: "SW1 1AA",
        name: "SW1 1AA",
        label: "hello",
        legend: "",
        hint: "SW1 1AA",
        items: [
          {
            value: "Branch address 1",
            text: resp.data[0].name,
            hint: {
              text: resp.data[0].address.address1 + ", " + resp.data[0].address.address4 + ", " + resp.data[0].address.address5 + ", " + resp.data[0].address.postcode
            }
          },
          {
            value: "Branch address 2",
            text: resp.data[1].name,
            hint: {
              text: resp.data[1].address.address1 + ", " + resp.data[1].address.address4 + ", " + resp.data[1].address.address5 + ", " + resp.data[1].address.postcode
            }
          },
          {
            value: "Branch address 3",
            text: resp.data[2].name,
            hint: {
              text: resp.data[2].address.address1 + ", " + resp.data[2].address.address4 + ", " + resp.data[2].address.address5 + ", " + resp.data[2].address.postcode
            }
          }
        ]
      };
      console.log("HERE " + JSON.stringify(locals.branch));

      callback(err, locals);
    });
  }
  // locals(req, res) {
  //   res.locals.postcode = req.sessionModel.get("postcode");

  //   return super.locals(req, res);
  // }

  // async saveValues(req, res, next) {
  //   req.sessionModel.set("postcode", req.form.values.postcode);

  //   try {
  //     const postcode = req.form.values.postcode;
  //     const results = await this.search(
  //       req.axios,
  //       postcode,
  //       req.session.tokenId
  //     );
  //     super.saveValues(req, res, () => {
  //       req.sessionModel.set("requestIsSuccessful", true);
  //       req.sessionModel.set("results", results);
  //       req.sessionModel.set("postcode", postcode);
  //       next();
  //     });
  //   } catch (err) {
  //     req.sessionModel.set("requestIsSuccessful", false);
  //     req.sessionModel.set("checkDetailsHeader", false);
  //     req.sessionModel.set("postcode", postcode);
  //     next();
  //   }
  // }

  // async search(axios, postcode, sessionId) {
  //   const headers = sessionId ? { session_id: sessionId, "session-id": sessionId } : undefined;
  //   const body = { "searchString": postcode, "productFilter": ["50321"] };

  //   const results = await axios.post(`${POSTCODE_LOOKUP}`, {
  //     body,
  //     headers,
  //   });
    
  //   const postOffices = results;
  //   console.log(postOffices);
  //   return postOffices;
  // }
}

module.exports = PostcodeSearchController;