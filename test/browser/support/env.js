import { setWorldConstructor } from "@cucumber/cucumber";
import "playwright";
import sharedClaimUkDl from "./shared_claim.json" with { type: "json" };
import sharedClaimUkPassport from "./shared_claim_uk_pp.json" with { type: "json" };
import sharedClaimNonUkPassport from "./shared_claim_non_uk_pp.json" with { type: "json" };
import sharedClaimEuDl from "./shared_claim_eu_dl.json" with { type: "json" };
import sharedClaimEeaId from "./shared_claim_eea_id.json" with { type: "json" };
import sharedClaimThinFile from "./shared_claim_thin_file.json" with { type: "json" };

const userClaims = {
  "A UK Drivers Licence User": sharedClaimUkDl,
  "A UK Passport User": sharedClaimUkPassport,
  "A Non UK Passport User": sharedClaimNonUkPassport,
  "An EU Drivers Licence User": sharedClaimEuDl,
  "An EEA Identity Card User": sharedClaimEeaId,
  "A user with evidence requested - strength score 4": sharedClaimThinFile,
};

class CustomWorld {
  constructor() {
    this.allUserClaims = userClaims;
  }
}

setWorldConstructor(CustomWorld);
