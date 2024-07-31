require("dotenv").config();

module.exports = {
  API: {
    BASE_URL:
      process.env.API_BASE_URL ||
      "https://api-f2f-cri-api.review-o.dev.account.gov.uk",
    PATHS: {
      SESSION: "/session",
      AUTHORIZATION: "/authorization",
      SAVE_F2FDATA: "/documentSelection",
      ABORT: "/abort",
      SESSION_CONFIG: "/sessionConfiguration",
    },
    OS_KEY: process.env.OS_KEY
  },
  PROXY_API: {
    BASE_URL: process.env.PROXYURL,
    PATHS: {
      POST_OFFICE: "/postoffice/v1/locations/search",
      ORDNANCE_SURVEY: "https://api.os.uk/search/places/v1/postcode?"
    },
  },
  APP: {
    BASE_URL: process.env.EXTERNAL_WEBSITE_HOST || "http://localhost:8000",
    PATHS: {
      F2F: "/",
      LANDING_PAGE: "/prove-identity-post-office",
      PHOTO_ID_SELECTION: "/choose-photo-id-post-office",
      PHOTO_ID_SELECTION_THIN_FILE: "/do-you-have-UK-passport",
      UK_PASSPORT_DETAILS: "/uk-passport-expire",
      NON_UK_PASSPORT_DETAILS: "/non-uk-passport-expire",
      NON_UK_PASSPORT_HAS_EXPIRY_DATE: "/non-uk-passport-expiry-date",
      EU_DRIVING_LICENCE_HAS_EXPIRY_DATE: "/eu-driving-licence-expiry-date",
      NATIONAL_IDENTITY_CARD_HAS_EXPIRY_DATE:
        "/national-identity-card-expiry-date",
      NON_UK_PASSPORT_COUNTRY_SELECTOR: "/select-country-non-uk-passport",
      UK_PHOTOCARD_DL_DETAILS: "/uk-driving-licence-expire",
      UK_PHOTOCARD_DL_ADDRESS_CHECK: "/uk-driving-licence-current-address",
      EU_DRIVING_LICENCE_ADDRESS_CHECK: "/eu-driving-licence-current-address",
      EU_DRIVING_LICENCE_COUNTRY_SELECTOR: "/select-country-eu-driving-licence",
      BRP_DETAILS: "/biometric-residence-permit-expire",
      EU_PHOTOCARD_DL_DETAILS: "/eu-driving-licence-expire",
      EEA_IDENTITY_CARD_DETAILS: "/national-identity-card-expire",
      EEA_IDENTITY_CARD_ADDRESS_CHECK:
        "/national-identity-card-current-address",
      EEA_IDENTITY_CARD_COUNTRY_SELECTOR:
        "/select-country-national-identity-card",
      NO_PHOTO_ID: "https://signin.account.gov.uk/no-photo-id",
      ABORT: "/abort",
      EXPIRED_ID: "/photo-id-expired",
      FIND_POST_OFFICE: "/find-post-office-prove-identity",
      CHOOSE_POST_OFFICE: "/choose-post-office-prove-identity",
      CHOOSE_ADDRESS: "/post-office-customer-letter-choose-address",
      FIND_ADDRESS: "/post-office-customer-letter-find-address",
      POST_OFFICE_CUSTOMER_LETTER: "/post-office-customer-letter",
      CHECK_DETAILS: "/check-details",
      DONE: "/done",
      ERROR: "/error",
      OAUTH2: "/oauth2/callback",
    },
    PHOTO_ID_OPTIONS: {
      UK_PASSPORT: "ukPassport",
      NON_UK_PASSPORT: "nonUkPassport",
      UK_PHOTOCARD_DL: "ukPhotocardDl",
      BRP: "brp",
      EU_PHOTOCARD_DL: "euPhotocardDl",
      EEA_IDENTITY_CARD: "eeaIdentityCard",
      NO_PHOTO_ID: "noPhotoId",
    },
    ADDRESS_OPTIONS: {
      CURRENT_ADDRESS: "current",
      DIFFERENT_ADDRESS: "previous",
      NO_ADDRESS: "euDlNoAddress",
      ID_NO_ADDRESS: "idNoAddress",
    },
    HAS_EXPIRY_DATE: {
      YES: "yes",
      NO: "no",
    },
    POST_OFFICE_CUSTOMER_LETTER: {
      EMAIL: "email",
      POST: "post"
    },
    PHOTO_ID_EXPIRY_OPTIONS: {
      RE_ENTER_DETAILS: "reEnterDetails",
      CHOOSE_DIFFERENT_PHOTO_ID: "chooseDifferentPhotoId",
      PROVE_IDENTITY_ANOTHER_WAY: "proveIdentityAnotherWay",
    },
    GTM: {
      GA4_ID: process.env.GOOGLE_ANALYTICS_4_GTM_CONTAINER_ID || "GTM-XXXXXXX",
      UA_ID: process.env.UNIVERSAL_ANALYTICS_GTM_CONTAINER_ID || "UA-XXXXXXX",
      ANALYTICS_COOKIE_DOMAIN: process.env.ANALYTICS_DOMAIN || "localhost",
      GA4_DISABLED: process.env.GA4_DISABLED || false,
      UA_DISABLED: process.env.UA_DISABLED || true,
    },
    LANGUAGE_TOGGLE_DISABLED: process.env.LANGUAGE_TOGGLE_DISABLED || "true",
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
