require("dotenv").config();

module.exports = {
  API: {
    BASE_URL: process.env.API_BASE_URL || "http://localhost:8090",
    PATHS: {
      SESSION: "/session",
      AUTHORIZATION: "/authorization",
      SAVE_F2FDATA: "/documentSelection",
      ABORT: "/abort",
      SESSION_CONFIG: "/sessionConfiguration",
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
      PHOTO_ID_SELECTION_CY: "/choose-photo-id-post-office-cy",
      PHOTO_ID_SELECTION_THIN_FILE: "/choose-photo-id-post-office-biometric",
      UK_PASSPORT_DETAILS: "/uk-passport-expire",
      NON_UK_PASSPORT_DETAILS: "/non-uk-passport-expire",
      NON_UK_PASSPORT_HAS_EXPIRY_DATE: "/non-uk-passport-has-expiry-date",
      EU_DRIVING_LICENCE_HAS_EXPIRY_DATE: "/eu-driving-licence-has-expiry-date",
      NATIONAL_IDENTITY_CARD_HAS_EXPIRY_DATE: "/national-identity-card-has-expiry-date",
      NON_UK_PASSPORT_COUNTRY_SELECTOR: "/select-country-non-uk-passport",
      PHOTOCARD_DL_DETAILS: "/uk-driving-licence-expire",
      PHOTOCARD_DL_ADDRESS_CHECK: "/uk-driving-licence-current-address",
      EU_DRIVING_LICENCE_ADDRESS_CHECK: "/eu-driving-licence-current-address",
      EU_DRIVING_LICENCE_COUNTRY_SELECTOR: "/select-country-eu-driving-licence",
      BRP_DETAILS: "/biometric-residence-permit-expire",
      EU_PHOTOCARD_DL_DETAILS: "/eu-driving-licence-expire",
      EEA_IDENTITY_CARD_DETAILS: "/national-identity-card-expire",
      EEA_IDENTITY_CARD_ADDRESS_CHECK: "/national-identity-card-current-address",
      EEA_IDENTITY_CARD_COUNTRY_SELECTOR: "/select-country-national-identity-card",
      NO_PHOTO_ID: "https://signin.account.gov.uk/no-photo-id",
      ABORT: "/abort",
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
      CURRENT_ADDRESS: "Current",
      DIFFERENT_ADDRESS: "Different",
      NO_ADDRESS: "DLNoAddress",
      ID_NO_ADDRESS: "IDNoAddress",
    },
    HAS_EXPIRY_DATE: {
      YES: "Yes",
      NO: "No"
    },
    ID_HINTS_EN: {
      UK_PASSPORT_HINT: "If your UK passport has expired, you can still use it to prove your identity up to 18 months after its expiry date.",
      NON_UK_PASSPORT_HINT: "Your passport must not have expired.",
      UK_DL_HINT: "The address on your driving licence must be the same as your current address.",
      EU_PHOTOCARD_DL_HINT: "This must be a plastic photocard, not a paper or handwritten licence. If it has your address on it, it must be your current address.",
      EEA_IDENTITY_CARD_HINT: "This must be a plastic photocard, not a paper or handwritten card. If it has your address on it, it must be your current address.",
    },
    ID_HINTS_CY: {
      UK_PASSPORT_HINT: "Os yw'ch pasbort y DU wedi dod i ben, gallwch barhau i’w ddefnyddio i brofi pwy ydych chi hyd at 18 mis ar ôl ei ddyddiad dod i ben.",
      NON_UK_PASSPORT_HINT: "Ni ddylai'ch pasbort fod wedi dod i ben.",
      UK_DL_HINT: "Rhaid i'r cyfeiriad ar eich trwydded yrru fod yr un fath â'ch cyfeiriad presennol.",
      EU_PHOTOCARD_DL_HINT: "Rhaid i hwn fod yn gerdyn-llun plastig, nid trwydded bapur neu lawysgrifen. Os oes ganddo eich cyfeiriad arno, rhaid iddo fod eich cyfeiriad presennol.",
      EEA_IDENTITY_CARD_HINT: " Rhaid i hwn fod yn gerdyn-llun plastig, nid trwydded bapur neu lawysgrifen. Os oes ganddo eich cyfeiriad arno, rhaid iddo fod eich cyfeiriad presennol."
    },
    PHOTO_ID_EXPIRY_OPTIONS: {
    RE_ENTER_DETAILS: "reEnterDetails",
    CHOOSE_DIFFERENT_PHOTO_ID: "chooseDifferentPhotoId",
    PROVE_IDENTITY_ANOTHER_WAY: "proveIdentityAnotherWay",
    },
    ANALYTICS: {
      GTM_ID_UA: process.env.UNIVERSAL_ANALYTICS_GTM_CONTAINER_ID,
      DOMAIN: process.env.ANALYTICS_DOMAIN || "localhost",
      GA4_ENABLED: process.env.GA4_ENABLED,
      GTM_ID_GA4: process.env.GOOGLE_ANALYTICS_4_GTM_CONTAINER_ID
    },
    LANGUAGE: process.env.LANGUAGE
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
