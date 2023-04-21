const BaseController = require("hmpo-form-wizard").Controller;
const { PROXY_API } = require("../../../../src/lib/config");

class PostcodeSearchController extends BaseController {

  locals(req, res, callback) {
    super.locals(req, res, async (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      const userPostcode = req.sessionModel.get("postcode");
      const resp = await req.axios.post(`https://${PROXY_API.BASE_URL}${PROXY_API.PATHS.POST_OFFICE}`, {
        "searchString": userPostcode,
        "productFilter": ["50321"]
      });

      locals.postcode = userPostcode;
      locals.branch =
      {
        id: "branches",
        name: "",
        label: "",
        legend: "",
        hint: "",
        items: [
          {
            value: "1",
            text: resp.data[0].name,
            hint: {
              text: resp.data[0].address.address1 + ", " + resp.data[0].address.address4 + ", " + resp.data[0].address.address5 + ", " + resp.data[0].address.postcode
            }
          },
          {
            value: "2",
            text: resp.data[1].name,
            hint: {
              text: resp.data[1].address.address1 + ", " + resp.data[1].address.address4 + ", " + resp.data[1].address.address5 + ", " + resp.data[1].address.postcode
            }
          },
          {
            value: "3",
            text: resp.data[2].name,
            hint: {
              text: resp.data[2].address.address1 + ", " + resp.data[2].address.address4 + ", " + resp.data[2].address.address5 + ", " + resp.data[2].address.postcode
            }
          },
          {
            value: "4",
            text: resp.data[3].name,
            hint: {
              text: resp.data[3].address.address1 + ", " + resp.data[3].address.address4 + ", " + resp.data[3].address.address5 + ", " + resp.data[3].address.postcode
            }
          },
          {
            value: "5",
            text: resp.data[4].name,
            hint: {
              text: resp.data[4].address.address1 + ", " + resp.data[4].address.address4 + ", " + resp.data[4].address.address5 + ", " + resp.data[4].address.postcode
            }
          },
        ]
      };

      req.sessionModel.set("postOfficeDetails", locals.branch.items);

      callback(err, locals);
    });
  }
}

module.exports = PostcodeSearchController;