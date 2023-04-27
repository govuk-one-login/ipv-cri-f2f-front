const { APP } = require("../../lib/config");
const { EU_DL_COUNTRIES } = require("./countryCodes/euDrivingLicence");

module.exports = {
  photoIdChoice: {
    type: "radios",
    legend: "",
    label: "",
    hint: "",
    items: [
      {
        value: APP.PHOTO_ID_OPTIONS.UK_PASSPORT,
        hint: { text: APP.UK_PASSPORT_HINT }
      },
      { value: APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT },
      { value: APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL },
      { value: APP.PHOTO_ID_OPTIONS.BRP },
      {
        value: APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL,
        hint: { text: APP.EU_PHOTOCARD_DL_HINT }
      },
      {
        value: APP.PHOTO_ID_OPTIONS.EEA_IDENTITY_CARD,
        hint: { text: APP.EEA_IDENTITY_CARD_HINT }
      },
      { divider: "or" },
      { value: APP.PHOTO_ID_OPTIONS.NO_PHOTO_ID }
    ],
    validate: ["required"]
  },
  ukPassportExpiryDate: {
    type: "date",
    journeyKey: "UKPassportExpiryDate",
    validate: ["required", "date",
      {
        type: "before",
        arguments: [
          new Date(
            new Date().getFullYear() + 10,
            new Date().getMonth(),
            new Date().getDate() + 1,
          )
            .toISOString()
            .split("T")[0],
        ],
      },
    ]
  },
  nonUKPassportExpiryDate: {
    type: "date",
    journeyKey: "nonUKPassportExpiryDate",
    validate: ["required", "date",
      {
        type: "before",
        arguments: [
          new Date(
            new Date().getFullYear() + 75,
            new Date().getMonth(),
            new Date().getDate() + 1,
          )
            .toISOString()
            .split("T")[0],
        ],
      },
    ]
  },
  ukPhotocardDlExpiryDate: {
    type: "date",
    journeyKey: "ukPhotocardDlExpiryDate",
    validate: ["required", "date",
      {
        type: "before",
        arguments: [
          new Date(
            new Date().getFullYear() + 10,
            new Date().getMonth(),
            new Date().getDate() + 1,
          )
            .toISOString()
            .split("T")[0],
        ],
      },
    ]
  },
  brpExpiryDate: {
    type: "date",
    journeyKey: "brpExpiryDate",
    validate: ["required", "date",
      {
        type: "before",
        arguments: ["2025-01-01"]
      },
    ]
  },
  euPhotocardDlExpiryDate: {
    type: "date",
    journeyKey: "euPhotocardDlDate",
    validate: ["required", "date",
      {
        type: "before",
        arguments: [
          new Date(
            new Date().getFullYear() + 75,
            new Date().getMonth(),
            new Date().getDate() + 1,
          )
            .toISOString()
            .split("T")[0],
        ],
      },
    ]
  },
  eeaIdCardExpiryDate: {
    type: "date",
    journeyKey: "euIdCardExpiryDate",
    validate: [
      "required", "date",
      {
        type: "before",
        arguments: [
          new Date(
            new Date().getFullYear() + 75,
            new Date().getMonth(),
            new Date().getDate() + 1,
          )
            .toISOString()
            .split("T")[0],
        ],
      },
    ]
  },
  postcode: {
    type: "text",
    journeyKey: "postcode",
    validate: [
      "required",
      { type: "maxlength", arguments: [8] },
      { type: "minlength", arguments: [5] },
      { type: "regexPostcodeSymbol", fn: (value) => value.match(/^[A-Za-z0-9 ]+$/) },
      { type: "regexPostcodeAlpha", fn: (value) => value.match(/[A-Za-z]+/) },
      { type: "regexPostcodeNumeric", fn: (value) => value.match(/[0-9]+/) },
      { type: "regexPostcodeUK", fn: (value) => value.match(/([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/) }
    ],
    classes: "govuk-input--width-10",
  },
  branches: {
    validate: ["required"]
  },
  photoIdExpiryChoice: {
    type: "radios",
    legend: "What would you like to do?",
    label: "",
    hint: "",
    items: [
      { value: APP.PHOTO_ID_EXPIRY_OPTIONS.RE_ENTER_DETAILS },
      { value: APP.PHOTO_ID_EXPIRY_OPTIONS.CHOOSE_DIFFERENT_PHOTO_ID },
      { divider: "or" },
      { value: APP.PHOTO_ID_EXPIRY_OPTIONS.PROVE_IDENTITY_ANOTHER_WAY }, 
    ],
    validate: ["required"]
  },
  euDrivingLicenseCountrySelector: {
    type: "select",
    legend: "",
    label: "",
    hint: "",
    items: [
      { value: "choose", text: " ", selected: false},
      { value: EU_DL_COUNTRIES.AUSTRIA.code, text: EU_DL_COUNTRIES.AUSTRIA.text },
      { value: EU_DL_COUNTRIES.BELGIUM.code, text: EU_DL_COUNTRIES.BELGIUM.text },
      { value: EU_DL_COUNTRIES.BULGARIA.code, text: EU_DL_COUNTRIES.BULGARIA.text },
      { value: EU_DL_COUNTRIES.CROATIA.code, text: EU_DL_COUNTRIES.CROATIA.text },
      { value: EU_DL_COUNTRIES.CYPRUS.code, text: EU_DL_COUNTRIES.CYPRUS.text },
      { value: EU_DL_COUNTRIES.CZECH.code, text: EU_DL_COUNTRIES.CZECH.text },
      { value: EU_DL_COUNTRIES.DENMARK.code, text: EU_DL_COUNTRIES.DENMARK.text },
      { value: EU_DL_COUNTRIES.ESTONIA.code, text: EU_DL_COUNTRIES.ESTONIA.text },
      { value: EU_DL_COUNTRIES.FINLAND.code, text: EU_DL_COUNTRIES.FINLAND.text },
      { value: EU_DL_COUNTRIES.FRANCE.code, text: EU_DL_COUNTRIES.FRANCE.text },
      { value: EU_DL_COUNTRIES.GERMANY.code, text: EU_DL_COUNTRIES.GERMANY.text },
      { value: EU_DL_COUNTRIES.GREECE.code, text: EU_DL_COUNTRIES.GREECE.text },
      { value: EU_DL_COUNTRIES.HUNGARY.code, text: EU_DL_COUNTRIES.HUNGARY.text },
      { value: EU_DL_COUNTRIES.ITALY.code, text: EU_DL_COUNTRIES.ITALY.text },
      { value: EU_DL_COUNTRIES.IRELAND.code, text: EU_DL_COUNTRIES.IRELAND.text },
      { value: EU_DL_COUNTRIES.LATVIA.code, text: EU_DL_COUNTRIES.LATVIA.text },
      { value: EU_DL_COUNTRIES.LITHUANIA.code, text: EU_DL_COUNTRIES.LITHUANIA.text },
      { value: EU_DL_COUNTRIES.LUXEMBOURG.code, text: EU_DL_COUNTRIES.LUXEMBOURG.text },
      { value: EU_DL_COUNTRIES.MALTA.code, text: EU_DL_COUNTRIES.MALTA.text },
      { value: EU_DL_COUNTRIES.NETHERLANDS.code, text: EU_DL_COUNTRIES.NETHERLANDS.text },
      { value: EU_DL_COUNTRIES.POLAND.code, text: EU_DL_COUNTRIES.POLAND.text },
      { value: EU_DL_COUNTRIES.PORTUGAL.code, text: EU_DL_COUNTRIES.PORTUGAL.text },
      { value: EU_DL_COUNTRIES.ROMANIA.code, text: EU_DL_COUNTRIES.ROMANIA.text },
      { value: EU_DL_COUNTRIES.SLOVAKIA.code, text: EU_DL_COUNTRIES.SLOVAKIA.text },
      { value: EU_DL_COUNTRIES.SLOVENIA.code, text: EU_DL_COUNTRIES.SLOVENIA.text },
      { value: EU_DL_COUNTRIES.SPAIN.code, text: EU_DL_COUNTRIES.SPAIN.text },
      { value: EU_DL_COUNTRIES.SWEDEN.code, text: EU_DL_COUNTRIES.SWEDEN.text }
    ],
    validate: ["required"]
  }
}