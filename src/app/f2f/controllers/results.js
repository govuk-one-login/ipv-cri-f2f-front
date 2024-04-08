const BaseController = require("hmpo-form-wizard").Controller;
const { PROXY_API } = require("../../../../src/lib/config");

class PostcodeSearchController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, async (err, locals) => {
      if (err) {
        return callback(err, locals);
      }
      try {
      const userPostcode = req.sessionModel.get("postcode");
      const { data: postOfficeData } = await req.axios.post(
        `https://${PROXY_API.BASE_URL}${PROXY_API.PATHS.POST_OFFICE}`,
        {
          searchString: userPostcode,
          productFilter: ["50321"],
        }
      );

      // Values used for radio display
      locals.branch = {
        id: "branches",
        name: "",
        label: "",
        legend: "",
        hint: "",
        items: [
          {
            value: "1",
            conditional: {
              html: "",
            },
            text: postOfficeData[0].name,
            hint: {
              text:
                postOfficeData[0].address.address1 +
                ", " +
                postOfficeData[0].address.address4 +
                ", " +
                postOfficeData[0].address.address5 +
                ", " +
                postOfficeData[0].address.postcode,
            },
          },
          {
            value: "2",
            conditional: {
              html: "",
            },
            text: postOfficeData[1].name,
            hint: {
              text:
                postOfficeData[1].address.address1 +
                ", " +
                postOfficeData[1].address.address4 +
                ", " +
                postOfficeData[1].address.address5 +
                ", " +
                postOfficeData[1].address.postcode,
            },
          },
          {
            value: "3",
            conditional: {
              html: "",
            },
            text: postOfficeData[2].name,
            hint: {
              text:
                postOfficeData[2].address.address1 +
                ", " +
                postOfficeData[2].address.address4 +
                ", " +
                postOfficeData[2].address.address5 +
                ", " +
                postOfficeData[2].address.postcode,
            },
          },
          {
            value: "4",
            conditional: {
              html: "",
            },
            text: postOfficeData[3].name,
            hint: {
              text:
                postOfficeData[3].address.address1 +
                ", " +
                postOfficeData[3].address.address4 +
                ", " +
                postOfficeData[3].address.address5 +
                ", " +
                postOfficeData[3].address.postcode,
            },
          },
          {
            value: "5",
            conditional: {
              html: "",
            },
            text: postOfficeData[4].name,
            hint: {
              text:
                postOfficeData[4].address.address1 +
                ", " +
                postOfficeData[4].address.address4 +
                ", " +
                postOfficeData[4].address.address5 +
                ", " +
                postOfficeData[4].address.postcode,
            },
          },
        ],
      };

      //Additional values for /documentSelection payload
      locals.payLoadValues = {
        location0: {
          addressWithoutPostCode:
            postOfficeData[0].address.address1 +
            ", " +
            postOfficeData[0].address.address4 +
            ", " +
            postOfficeData[0].address.address5,
          postcode: postOfficeData[0].address.postcode,
          latitude: postOfficeData[0].address.latitude,
          longitude: postOfficeData[0].address.longitude,
          fadCode: postOfficeData[0].locationBusinessId,
        },
        location1: {
          addressWithoutPostCode:
            postOfficeData[1].address.address1 +
            ", " +
            postOfficeData[1].address.address4 +
            ", " +
            postOfficeData[1].address.address5,
          postcode: postOfficeData[1].address.postcode,
          latitude: postOfficeData[1].address.latitude,
          longitude: postOfficeData[1].address.longitude,
          fadCode: postOfficeData[1].locationBusinessId,
        },
        location2: {
          addressWithoutPostCode:
            postOfficeData[2].address.address1 +
            ", " +
            postOfficeData[2].address.address4 +
            ", " +
            postOfficeData[2].address.address5,
          postcode: postOfficeData[2].address.postcode,
          latitude: postOfficeData[2].address.latitude,
          longitude: postOfficeData[2].address.longitude,
          fadCode: postOfficeData[2].locationBusinessId,
        },
        location3: {
          addressWithoutPostCode:
            postOfficeData[3].address.address1 +
            ", " +
            postOfficeData[3].address.address4 +
            ", " +
            postOfficeData[3].address.address5,
          postcode: postOfficeData[3].address.postcode,
          latitude: postOfficeData[3].address.latitude,
          longitude: postOfficeData[3].address.longitude,
          fadCode: postOfficeData[3].locationBusinessId,
        },
        location4: {
          addressWithoutPostCode:
            postOfficeData[4].address.address1 +
            ", " +
            postOfficeData[4].address.address4 +
            ", " +
            postOfficeData[4].address.address5,
          postcode: postOfficeData[4].address.postcode,
          latitude: postOfficeData[4].address.latitude,
          longitude: postOfficeData[4].address.longitude,
          fadCode: postOfficeData[4].locationBusinessId,
        },
      };

      req.sessionModel.set("postOfficeDetails", locals.branch.items);
      req.sessionModel.set("payLoadValues", locals.payLoadValues);

      callback(err, locals);
    } catch (error) {
      callback(error); 
    }
    });
  }
}

module.exports = PostcodeSearchController;
