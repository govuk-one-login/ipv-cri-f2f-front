const { APP } = require("../../lib/config");
const { EEA_ID_CARD } = require("./data/countryCodes/en/eeaNationalIdentityCard");
const { EU_DL_COUNTRIES } = require("./data/countryCodes/en/euDrivingLicence");
const { NON_UK_PASSPORT } = require("./data/countryCodes/en/nonUkPassport");

const items = [
  {value: "Select", text: "Select country"},
  {value: NON_UK_PASSPORT.AFGHANISTAN.text, text: NON_UK_PASSPORT.AFGHANISTAN.text},
  {value: "CAITLIN", text: "I AM ENGLISHLY SORTED"},
]

const itemsWelsh = [
  {value: "Select", text: "Select country"},
  {value: NON_UK_PASSPORT.AFGHANISTAN.text, text: NON_UK_PASSPORT.AFGHANISTAN.text},
  {value: "CAITLIN", text: "I AM WELSHLY SORTED"},
]

module.exports = {
  photoIdChoice: {
    type: "radios",
    legend: "",
    label: "",
    hint: "",
    items: [
      { value: APP.PHOTO_ID_OPTIONS.UK_PASSPORT },
      { value: APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT },
      { value: APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL },
      { value: APP.PHOTO_ID_OPTIONS.BRP },
      { value: APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL },
      { value: APP.PHOTO_ID_OPTIONS.EEA_IDENTITY_CARD },
      { divider: "or" },
      { value: APP.PHOTO_ID_OPTIONS.NO_PHOTO_ID }
    ],
    validate: ["required"],
    invalidates: ["eeaIdCardAddressCheck"]
  },
  photoIdChoiceThinFile: {
    type: "radios",
    legend: "",
    label: "",
    hint: "",
    items: [
      {
        value: APP.PHOTO_ID_OPTIONS.UK_PASSPORT
      },
      { 
        value: APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT
      },
      { divider: "or" },
      { value: APP.PHOTO_ID_OPTIONS.NO_PHOTO_ID }
    ],
    validate: ["required"]
  },
  ukDlAddressCheck: {
    legend: "",
    label: "",
    hint: "",
    items: [
      {
        value: APP.ADDRESS_OPTIONS.CURRENT_ADDRESS,
        conditional: {
          html: ""
        }
      },
      { value: APP.ADDRESS_OPTIONS.DIFFERENT_ADDRESS,
        conditional: {
          html: ""
        }
      }
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
  idHasExpiryDate: {
    legend: "",
    label: "",
    hint: "",
    items: [
      {
        value: APP.HAS_EXPIRY_DATE.YES,
        conditional: {
          html: ""
        }
      },
      { value: APP.HAS_EXPIRY_DATE.NO,
        conditional: {
          html: ""
        }
      }
    ],
    validate: ["required"]
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
        arguments: ["2033-01-01"]
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
  euDrivingLicenceAddressCheck: {
    legend: "",
    label: "",
    hint: "",
    items: [
      { value: APP.ADDRESS_OPTIONS.CURRENT_ADDRESS,
        conditional: {
          html: ""
        }
      },
      { value: APP.ADDRESS_OPTIONS.DIFFERENT_ADDRESS,
        conditional: {
          html: ""
        }
      },
      { divider: "or" },
      { value: APP.ADDRESS_OPTIONS.NO_ADDRESS,
        conditional: {
          html: ""
        }
      }
    ],
    validate: ["required"]
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
  eeaIdCardAddressCheck: {
    legend: "",
    label: "",
    hint: "",
    items: [
      { value: APP.ADDRESS_OPTIONS.CURRENT_ADDRESS,
        conditional: {
          html: ""
        }
      },
      { value: APP.ADDRESS_OPTIONS.DIFFERENT_ADDRESS,
        conditional: {
          html: ""
        }
      },
      {divider: "or"},
      { value: APP.ADDRESS_OPTIONS.ID_NO_ADDRESS,
        conditional: {
          html: ""
        }
      }
    ],
    validate: ["required"]
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
    legend: "",
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
      { value: APP.SELECTOR.TEXT },
      { value: EEA_ID_CARD.AUSTRIA },
      { value: EEA_ID_CARD.BELGIUM },
      { value: EEA_ID_CARD.BULGARIA },
      { value: EEA_ID_CARD.CROATIA },
      { value: EEA_ID_CARD.CYPRUS },
      { value: EEA_ID_CARD.CZECH },
      { value: EEA_ID_CARD.ESTONIA },
      { value: EEA_ID_CARD.FRANCE },
      { value: EEA_ID_CARD.FINLAND },
      { value: EEA_ID_CARD.GERMANY },
      { value: EEA_ID_CARD.GREECE },
      { value: EEA_ID_CARD.HUNGARY },
      { value: EEA_ID_CARD.ICELAND },
      { value: EEA_ID_CARD.IRELAND },
      { value: EEA_ID_CARD.ITALY },
      { value: EEA_ID_CARD.LATVIA },
      { value: EEA_ID_CARD.LIECHTENSTEIN },
      { value: EEA_ID_CARD.LITHUANIA },
      { value: EEA_ID_CARD.LUXEMBOURG },
      { value: EEA_ID_CARD.MALTA },
      { value: EEA_ID_CARD.NETHERLANDS },
      { value: EEA_ID_CARD.NORWAY },
      { value: EEA_ID_CARD.POLAND },
      { value: EEA_ID_CARD.PORTUGAL },
      { value: EEA_ID_CARD.ROMANIA },
      { value: EEA_ID_CARD.SLOVAKIA },
      { value: EEA_ID_CARD.SLOVENIA },
      { value: EEA_ID_CARD.SPAIN },
      { value: EEA_ID_CARD.SWEDEN }
    ],
    validate: ["required",
      { type: "equal", fn: (value) => !value.match(/Select/)}
    ]
  },
  
  euDrivingLicenceCountrySelector: {
    legend: "",
    label: "",
    hint: "",
    items: [
      { value: APP.SELECTOR.TEXT },
      { value: EU_DL_COUNTRIES.AUSTRIA },
      { value: EU_DL_COUNTRIES.BELGIUM },
      { value: EU_DL_COUNTRIES.BULGARIA },
      { value: EU_DL_COUNTRIES.CROATIA },
      { value: EU_DL_COUNTRIES.CYPRUS },
      { value: EU_DL_COUNTRIES.CZECH },
      { value: EU_DL_COUNTRIES.DENMARK },
      { value: EU_DL_COUNTRIES.ESTONIA },
      { value: EU_DL_COUNTRIES.FRANCE },
      { value: EU_DL_COUNTRIES.FINLAND },
      { value: EU_DL_COUNTRIES.GERMANY },
      { value: EU_DL_COUNTRIES.GREECE },
      { value: EU_DL_COUNTRIES.HUNGARY },
      { value: EU_DL_COUNTRIES.IRELAND },
      { value: EU_DL_COUNTRIES.ITALY },
      { value: EU_DL_COUNTRIES.LATVIA },
      { value: EU_DL_COUNTRIES.LITHUANIA },
      { value: EU_DL_COUNTRIES.LUXEMBOURG },
      { value: EU_DL_COUNTRIES.MALTA },
      { value: EU_DL_COUNTRIES.NETHERLANDS },
      { value: EU_DL_COUNTRIES.POLAND },
      { value: EU_DL_COUNTRIES.PORTUGAL },
      { value: EU_DL_COUNTRIES.ROMANIA },
      { value: EU_DL_COUNTRIES.SLOVAKIA },
      { value: EU_DL_COUNTRIES.SLOVENIA },
      { value: EU_DL_COUNTRIES.SPAIN },
      { value: EU_DL_COUNTRIES.SWEDEN }
    ],
    validate: ["required",
      {type: "equal", fn: (value) => !value.match(/Select/)}
    ]
  },
  nonUkPassportCountrySelector: {
    type: "select",
    legend: "",
    label: "",
    hint: "",
    items,
    validate: ["required",
      {type: "equal", fn: (value) => !value.match(/Select/)}
    ]
  },
  listWelsh: {
    type: "select",
    legend: "",
    label: "",
    hint: "",
    items: itemsWelsh,
    validate: ["required",
      {type: "equal", fn: (value) => !value.match(/Select/)}
    ]
  }
}
