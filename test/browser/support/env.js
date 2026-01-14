const { setWorldConstructor } = require("@cucumber/cucumber");

require("playwright");

const userClaims = {
  "A UK Drivers Licence User": require("./shared_claim"),
  "A UK Passport User": require("./shared_claim_uk_pp"),
  "A Non UK Passport User": require("./shared_claim_non_uk_pp"),
  "An EU Drivers Licence User": require("./shared_claim_eu_dl"),
  "An EEA Identity Card User": require("./shared_claim_eea_id"),
  "A user with evidence requested - strength score 4": require("./shared_claim_thin_file"),
};

class CustomWorld {
  constructor() {
    this.allUserClaims = userClaims;
  }
}

setWorldConstructor(CustomWorld);
