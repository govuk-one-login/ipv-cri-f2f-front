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

      // Values used for radio display
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
            conditional: {
              html: ""
            },
            text: resp.data[0].name,
            hint: {
              text: resp.data[0].address.address1 + ", " + resp.data[0].address.address4 + ", " + resp.data[0].address.address5 + ", " + resp.data[0].address.postcode
            },
          },
          {
            value: "2",
            conditional: {
              html: ""
            },
            text: resp.data[1].name,
            hint: {
              text: resp.data[1].address.address1 + ", " + resp.data[1].address.address4 + ", " + resp.data[1].address.address5 + ", " + resp.data[1].address.postcode
            }
          },
          {
            value: "3",
            conditional: {
              html: ""
            },
            text: resp.data[2].name,
            hint: {
              text: resp.data[2].address.address1 + ", " + resp.data[2].address.address4 + ", " + resp.data[2].address.address5 + ", " + resp.data[2].address.postcode
            }
          },
          {
            value: "4",
            conditional: {
              html: ""
            },
            text: resp.data[3].name,
            hint: {
              text: resp.data[3].address.address1 + ", " + resp.data[3].address.address4 + ", " + resp.data[3].address.address5 + ", " + resp.data[3].address.postcode
            }
          },
          {
            value: "5",
            conditional: {
              html: ""
            },
            text: resp.data[4].name,
            hint: {
              text: resp.data[4].address.address1 + ", " + resp.data[4].address.address4 + ", " + resp.data[4].address.address5 + ", " + resp.data[4].address.postcode
            }
          },
        ]
      };

      //Additional values for /documentSelection payload
      locals.payLoadValues = {
        location0: {
          postcode: resp.data[0].address.postcode,
          latitude: resp.data[0].address.latitude,
          longitude: resp.data[0].address.longitude
        },
        location1: {
          postcode: resp.data[1].address.postcode,
          latitude: resp.data[1].address.latitude,
          longitude: resp.data[1].address.longitude
        },
        location2: {
          postcode: resp.data[2].address.postcode,
          latitude: resp.data[2].address.latitude,
          longitude: resp.data[2].address.longitude
        },
        location3: {
          postcode: resp.data[3].address.postcode,
          latitude: resp.data[3].address.latitude,
          longitude: resp.data[3].address.longitude
        },
        location4: {
          postcode: resp.data[4].address.postcode,
          latitude: resp.data[4].address.latitude,
          longitude: resp.data[4].address.longitude
        }
      }

      req.sessionModel.set("postOfficeDetails", locals.branch.items);
      req.sessionModel.set("payLoadValues", locals.payLoadValues);

      callback(err, locals);
    });
  }
}

module.exports = PostcodeSearchController;
