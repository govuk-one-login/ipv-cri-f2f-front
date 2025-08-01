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
        const { data:postOfficeDataFull } = await req.axios.post(
          `https://${PROXY_API.BASE_URL}${PROXY_API.PATHS.POST_OFFICE}`,
          {
            searchString: userPostcode,
            productFilter: ["50321"],
          }
        );
        if (!Array.isArray(postOfficeDataFull) || postOfficeDataFull.length === 0){
          console.error("No post office branches found, redirecting to /error");
          res.redirect("/error");
        }
      
        // Selects 5 branches if more branches are found
        const postOfficeData = postOfficeDataFull.slice(0, 5);

        // Values used for radio display
        locals.branch = {
          id: "branches",
          name: "",
          label: "",
          legend: "",
          hint: "",
          items: postOfficeData.map((branch, index) => ({
            value: String(index + 1),
            conditional: {
              html: "",
            },
            text: branch.name,
            hint: {
              text:
                branch.address.address1 +
                ", " +
                branch.address.address4 +
                ", " +
                branch.address.address5 +
                ", " +
                branch.address.postcode,
            },
          })),
        };

        //Additional values for /documentSelection payload
        locals.payLoadValues = {};
        postOfficeData.forEach((branch, index) => {
          locals.payLoadValues[`location${index}`] = {
            addressWithoutPostCode:
              branch.address.address1 +
              ", " +
              branch.address.address4 +
              ", " +
              branch.address.address5,
            postcode: branch.address.postcode,
            latitude: branch.address.latitude,
            longitude: branch.address.longitude,
            fadCode: branch.locationBusinessId,
          };
        });

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
