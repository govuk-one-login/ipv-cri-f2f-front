require("dotenv").config();

module.exports = {
  API: {
    BASE_URL: process.env.API_BASE_URL || "http://localhost:8090",
    PATHS: {
      SESSION: "/session",
      AUTHORIZATION: "/authorization",
      SAVE_F2FDATA: "/documentSelection",
    },
  },
  PROXY_API: {
    BASE_URL: process.env.PROXYURL,
    PATHS: {
      POST_OFFICE: "/postoffice/v1/locations/search"
    },
  },
  APP: {
    BASE_URL: process.env.EXTERNAL_WEBSITE_HOST || "http://localhost:8000",
    PATHS: {
      F2F: "/",
      LANDING_PAGE: "/prove-identity-post-office",
      PHOTO_ID_SELECTION: "/choose-photo-id-post-office",
      UK_PASSPORT_DETAILS: "/uk-passport-expire",
      NON_UK_PASSPORT_DETAILS: "/non-uk-passport-expire",
      NON_UK_PASSPORT_COUNTRY_SELECTOR: "/select-country-non-uk-passport",
      PHOTOCARD_DL_DETAILS: "/uk-driving-licence-expire",
      PHOTOCARD_DL_ADDRESS_CHECK: "/uk-driving-licence-current-address",
      EU_DRIVING_LICENCE_ADDRESS_CHECK: "/eu-driving-licence-current-address",
      EU_DRIVING_LICENCE_COUNTRY_SELECTOR: "/select-country-eu-driving-licence",
      BRP_DETAILS: "/biometric-residence-permit-expire",
      EU_PHOTOCARD_DL_DETAILS: "/eu-driving-licence-expire",
      EEA_IDENTITY_CARD_DETAILS: "/national-identity-card-expire",
      EEA_IDENTITY_CARD_CURRENT_ADDRESS: "/national-identity-card-current-address",
      EEA_IDENTITY_CARD_COUNTRY_SELECTOR: "/select-country-national-identity-card",
      NO_PHOTO_ID: "https://signin.account.gov.uk/no-photo-id",
      EXPIRED_ID: "/photo-id-expired",
      FIND_POST_OFFICE: "/find-post-office-prove-identity",
      CHOOSE_POST_OFFICE: "/choose-post-office-prove-identity",
      CHECK_DETAILS: "/check-details",
      DONE: "/done",
      OAUTH2: "/oauth2/callback"
    },
    PHOTO_ID_OPTIONS: {
      UK_PASSPORT: "ukPassport",
      NON_UK_PASSPORT: "nonUkPassport",
      UK_PHOTOCARD_DL: "ukPhotocardDl",
      BRP: "brp",
      EU_PHOTOCARD_DL: "euPhotocardDl",
      EEA_IDENTITY_CARD: "eeaIdentityCard",
      NO_PHOTO_ID: "noPhotoId"
    },
    ADDRESS_OPTIONS: {
      CURRENT_ADDRESS: "Yes, it has my current address on it",
      DIFFERENT_ADDRESS: "No, it has my previous address on it",
      NO_ADDRESS: "My driving licence does not have my address on it",
      ID_NO_ADDRESS: "My national identity card does not have my address on it",
    },
    UK_PASSPORT_HINT: "If your UK passport has expired, you can still use it to prove your identity up to 18 months after its expiry date.",
    UK_DL_HINT: "The address on your driving licence must be the same as your current address.",
    EU_PHOTOCARD_DL_HINT: "This must be a plastic photocard, not a paper or handwritten licence. If it has your address on it, it must be your current address.",
    EEA_IDENTITY_CARD_HINT: "This must be a plastic photocard, not a paper or handwritten card. If it has your address on it, it must be your current address.",
    PHOTO_ID_EXPIRY_OPTIONS: {
      RE_ENTER_DETAILS: "reEnterDetails",
      CHOOSE_DIFFERENT_PHOTO_ID: "chooseDifferentPhotoId",
      PROVE_IDENTITY_ANOTHER_WAY: "proveIdentityAnotherWay"
    },
    ANALYTICS: {
      ID: process.env.GTM_ID,
      DOMAIN: process.env.ANALYTICS_DOMAIN || "localhost",
    },
  },
  PORT: process.env.PORT || 5030,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_TABLE_NAME: process.env.SESSION_TABLE_NAME,
  SESSION_TTL: process.env.SESSION_TTL || 7200000, // two hours in ms
  REDIS: {
    SESSION_URL: process.env.REDIS_SESSION_URL,
    PORT: process.env.REDIS_PORT || 6379,
  },
};
