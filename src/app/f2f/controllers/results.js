const BaseController = require("hmpo-form-wizard").Controller;

const { use } = require("chai");
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

      const userPostcode = req.sessionModel.get("postcode");

      const resp = await req.axios.post(`https://92ljo9w2zf.execute-api.eu-west-2.amazonaws.com/dev/post-office-finder`, {
        "searchString": userPostcode,
        "productFilter": ["50321"]
      });
      locals.postcode = userPostcode;
      locals.branch = 
      {
        id: userPostcode,
        name: "",
        label: "hello",
        legend: "",
        hint: "",
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
          },
          {
            value: "Branch address 4",
            text: resp.data[3].name,
            hint: {
              text: resp.data[3].address.address1 + ", " + resp.data[3].address.address4 + ", " + resp.data[3].address.address5 + ", " + resp.data[3].address.postcode
            }
          },
          {
            value: "Branch address 5",
            text: resp.data[4].name,
            hint: {
              text: resp.data[4].address.address1 + ", " + resp.data[4].address.address4 + ", " + resp.data[4].address.address5 + ", " + resp.data[4].address.postcode
            }
          },
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