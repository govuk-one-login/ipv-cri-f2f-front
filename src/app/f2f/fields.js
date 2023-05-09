const { APP } = require("../../lib/config");
const { EEA_ID_CARD } = require("./countryCodes/eeaNationalIdentityCard");

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

  eeaIdentityCardCountrySelector: {
    legend: "",
    label: "",
    hint: "",
    items: [
      { value: "Select", text: "Select country" },
      { value: EEA_ID_CARD.AUSTRIA.code, text: EEA_ID_CARD.AUSTRIA.text },
      { value: EEA_ID_CARD.BELGIUM.code, text: EEA_ID_CARD.BELGIUM.text },
      { value: EEA_ID_CARD.BULGARIA.code, text: EEA_ID_CARD.BULGARIA.text },
      { value: EEA_ID_CARD.CROATIA.code, text: EEA_ID_CARD.CROATIA.text },
      { value: EEA_ID_CARD.CYPRUS.code, text: EEA_ID_CARD.CYPRUS.text },
      { value: EEA_ID_CARD.CZECH.code, text: EEA_ID_CARD.CZECH.text },
      { value: EEA_ID_CARD.ESTONIA.code, text: EEA_ID_CARD.ESTONIA.text },
      { value: EEA_ID_CARD.FINLAND.code, text: EEA_ID_CARD.FINLAND.text },
      { value: EEA_ID_CARD.FRANCE.code, text: EEA_ID_CARD.FRANCE.text },
      { value: EEA_ID_CARD.GERMANY.code, text: EEA_ID_CARD.GERMANY.text },
      { value: EEA_ID_CARD.GREECE.code, text: EEA_ID_CARD.GREECE.text },
      { value: EEA_ID_CARD.HUNGARY.code, text: EEA_ID_CARD.HUNGARY.text },
      { value: EEA_ID_CARD.IRELAND.code, text: EEA_ID_CARD.IRELAND.text },
      { value: EEA_ID_CARD.ICELAND.code, text: EEA_ID_CARD.ICELAND.text },
      { value: EEA_ID_CARD.ITALY.code, text: EEA_ID_CARD.ITALY.text },
      { value: EEA_ID_CARD.LATVIA.code, text: EEA_ID_CARD.LATVIA.text },
      { value: EEA_ID_CARD.LIECHTENSTEIN.code, text: EEA_ID_CARD.LIECHTENSTEIN.text },
      { value: EEA_ID_CARD.LITHUANIA.code, text: EEA_ID_CARD.LITHUANIA.text },
      { value: EEA_ID_CARD.LUXEMBOURG.code, text: EEA_ID_CARD.LUXEMBOURG.text },
      { value: EEA_ID_CARD.MALTA.code, text: EEA_ID_CARD.MALTA.text },
      { value: EEA_ID_CARD.NETHERLANDS.code, text: EEA_ID_CARD.NETHERLANDS.text },
      { value: EEA_ID_CARD.NORWAY.code, text: EEA_ID_CARD.NORWAY.text },
      { value: EEA_ID_CARD.POLAND.code, text: EEA_ID_CARD.POLAND.text },
      { value: EEA_ID_CARD.PORTUGAL.code, text: EEA_ID_CARD.PORTUGAL.text },
      { value: EEA_ID_CARD.ROMANIA.code, text: EEA_ID_CARD.ROMANIA.text },
      { value: EEA_ID_CARD.SLOVAKIA.code, text: EEA_ID_CARD.SLOVAKIA.text },
      { value: EEA_ID_CARD.SLOVENIA.code, text: EEA_ID_CARD.SLOVENIA.text },
      { value: EEA_ID_CARD.SPAIN.code, text: EEA_ID_CARD.SPAIN.text },
      { value: EEA_ID_CARD.SWEDEN.code, text: EEA_ID_CARD.SWEDEN.text }
    ],
    validate: ["required", 
      { type: "equal", fn: (value) => !value.match(/Select/)}
    ]
  }
}