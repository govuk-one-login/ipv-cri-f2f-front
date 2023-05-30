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
      PHOTO_ID_SELECTION: "/photoIdSelection",
      UK_PASSPORT_DETAILS: "/ukPassportDetails",
      NON_UK_PASSPORT_DETAILS: "/nonUKPassportDetails",
      PHOTOCARD_DL_DETAILS: "/ukPhotocardDlDetails",
      EU_DRIVING_LICENCE_ADDRESS_CHECK: "/euDrivingLicenceAddressCheck",
      EU_DRIVING_LICENCE_COUNTRY_SELECTOR: "/euDrivingLicenceCountrySelector",
      BRP_DETAILS: "/brpDetails",
      EU_PHOTOCARD_DL_DETAILS: "/euPhotocardDlDetails",
      EEA_IDENTITY_CARD_DETAILS: "/eeaIdentityCardDetails",
      EEA_IDENTITY_CARD_COUNTRY_SELECTOR: "/eeaIdentityCardCountrySelector",
      NO_PHOTO_ID: "https://signin.account.gov.uk/no-photo-id",
      EXPIRED_ID: "/photoIdExpiry"
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
      ID_NO_ADDRESS: "My identity card does not have my address on it",
    },
    UK_PASSPORT_HINT: "If your UK passport has expired, you can still use it to prove your identity up to 18 months after the expiry date.",
    EU_PHOTOCARD_DL_HINT: "This must be a plastic photocard. You cannot use a paper or handwritten licence.",
    EEA_IDENTITY_CARD_HINT: "This must be a plastic photocard. You cannot use a paper or handwritten national identity card.",
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
