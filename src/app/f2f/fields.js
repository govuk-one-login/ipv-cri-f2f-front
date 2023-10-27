const { APP } = require("../../lib/config");
const { EEA_ID_CARD } = require("./data/countryCodes/en/eeaNationalIdentityCard");
const { EU_DL_COUNTRIES } = require("./data/countryCodes/en/euDrivingLicence");
const { NON_UK_PASSPORT } = require("./data/countryCodes/en/nonUkPassport");

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
    items: [
      {value: APP.SELECTOR.TEXT},
      {value: NON_UK_PASSPORT.AFGHANISTAN},
      {value: NON_UK_PASSPORT.ALBANIA},
      {value: NON_UK_PASSPORT.ALGERIA},
      {value: NON_UK_PASSPORT.ANDORRA},
      {value: NON_UK_PASSPORT.ANGOLA},
      {value: NON_UK_PASSPORT.ANTIGUA},
      {value: NON_UK_PASSPORT.ARGENTINA},
      {value: NON_UK_PASSPORT.ARMENIA},
      {value: NON_UK_PASSPORT.AUSTRALIA},
      {value: NON_UK_PASSPORT.AUSTRIA},
      {value: NON_UK_PASSPORT.AZERBAIJAN},
      {value: NON_UK_PASSPORT.BAHAMAS},
      {value: NON_UK_PASSPORT.BAHRAIN},
      {value: NON_UK_PASSPORT.BANGLADESH},
      {value: NON_UK_PASSPORT.BARBADOS},
      {value: NON_UK_PASSPORT.BELARUS},
      {value: NON_UK_PASSPORT.BELGIUM},
      {value: NON_UK_PASSPORT.BELIZE},
      {value: NON_UK_PASSPORT.BENIN},
      {value: NON_UK_PASSPORT.BHUTAN},
      {value: NON_UK_PASSPORT.BOLIVIA},
      {value: NON_UK_PASSPORT.BOSNIA},
      {value: NON_UK_PASSPORT.BOTSWANA},
      {value: NON_UK_PASSPORT.BRAZIL},
      {value: NON_UK_PASSPORT.BRUNEI},
      {value: NON_UK_PASSPORT.BULGARIA},
      {value: NON_UK_PASSPORT.BURKINA_FASO},
      {value: NON_UK_PASSPORT.BURUNDI},
      {value: NON_UK_PASSPORT.CAMBODIA},
      {value: NON_UK_PASSPORT.CAMEROON},
      {value: NON_UK_PASSPORT.CANADA},
      {value: NON_UK_PASSPORT.CAPE_VERDE},
      {value: NON_UK_PASSPORT.CAR},
      {value: NON_UK_PASSPORT.CHAD},
      {value: NON_UK_PASSPORT.CHILE},
      {value: NON_UK_PASSPORT.CHINA},
      {value: NON_UK_PASSPORT.COLOMBIA},
      {value: NON_UK_PASSPORT.COMOROS},
      {value: NON_UK_PASSPORT.CONGO},
      {value: NON_UK_PASSPORT.COSTA_RICA},
      {value: NON_UK_PASSPORT.CROATIA},
      {value: NON_UK_PASSPORT.CUBA},
      {value: NON_UK_PASSPORT.CYPRUS},
      {value: NON_UK_PASSPORT.CZECH},
      {value: NON_UK_PASSPORT.DRC},
      {value: NON_UK_PASSPORT.DENMARK},
      {value: NON_UK_PASSPORT.DJIBOUTI},
      {value: NON_UK_PASSPORT.DOMINICA},
      {value: NON_UK_PASSPORT.DOMINICAN_REP},
      {value: NON_UK_PASSPORT.EAST_TIMOR},
      {value: NON_UK_PASSPORT.ECUADOR},
      {value: NON_UK_PASSPORT.EGYPT},
      {value: NON_UK_PASSPORT.EL_SALVADOR},
      {value: NON_UK_PASSPORT.EQ_GUINEA},
      {value: NON_UK_PASSPORT.ERITREA},
      {value: NON_UK_PASSPORT.ESTONIA},
      {value: NON_UK_PASSPORT.ESWATINI},
      {value: NON_UK_PASSPORT.ETHIOPIA},
      {value: NON_UK_PASSPORT.FIJI},
      {value: NON_UK_PASSPORT.FINLAND},
      {value: NON_UK_PASSPORT.FRANCE},
      {value: NON_UK_PASSPORT.GABON},
      {value: NON_UK_PASSPORT.THE_GAMBIA},
      {value: NON_UK_PASSPORT.GEORGIA},
      {value: NON_UK_PASSPORT.GERMANY},
      {value: NON_UK_PASSPORT.GHANA},
      {value: NON_UK_PASSPORT.GREECE},
      {value: NON_UK_PASSPORT.GRENADA},
      {value: NON_UK_PASSPORT.GUATEMALA},
      {value: NON_UK_PASSPORT.GUINEA},
      {value: NON_UK_PASSPORT.GUINEA_BISSAU},
      {value: NON_UK_PASSPORT.GUYANA},
      {value: NON_UK_PASSPORT.HAITI},
      {value: NON_UK_PASSPORT.HONDURAS},
      {value: NON_UK_PASSPORT.HUNGARY},
      {value: NON_UK_PASSPORT.ICELAND},
      {value: NON_UK_PASSPORT.INDIA},
      {value: NON_UK_PASSPORT.INDONESIA},
      {value: NON_UK_PASSPORT.IRAN},
      {value: NON_UK_PASSPORT.IRAQ},
      {value: NON_UK_PASSPORT.IRELAND},
      {value: NON_UK_PASSPORT.ISRAEL},
      {value: NON_UK_PASSPORT.ITALY},
      {value: NON_UK_PASSPORT.IVORY_COAST},
      {value: NON_UK_PASSPORT.JAMAICA},
      {value: NON_UK_PASSPORT.JAPAN},
      {value: NON_UK_PASSPORT.JORDAN},
      {value: NON_UK_PASSPORT.KAZAKHSTAN},
      {value: NON_UK_PASSPORT.KENYA},
      {value: NON_UK_PASSPORT.KIRIBATI},
      {value: NON_UK_PASSPORT.KOSOVO},
      {value: NON_UK_PASSPORT.KUWAIT},
      {value: NON_UK_PASSPORT.KYRGYZSTAN},
      {value: NON_UK_PASSPORT.LAOS},
      {value: NON_UK_PASSPORT.LATVIA},
      {value: NON_UK_PASSPORT.LEBANON},
      {value: NON_UK_PASSPORT.LESOTHO},
      {value: NON_UK_PASSPORT.LIBERIA},
      {value: NON_UK_PASSPORT.LIBYA},
      {value: NON_UK_PASSPORT.LIECHTENSTEIN},
      {value: NON_UK_PASSPORT.LITHUANIA},
      {value: NON_UK_PASSPORT.LUXEMBOURG},
      {value: NON_UK_PASSPORT.MADAGASCAR},
      {value: NON_UK_PASSPORT.MALAWAI},
      {value: NON_UK_PASSPORT.MALAYSIA},
      {value: NON_UK_PASSPORT.MALDIVES},
      {value: NON_UK_PASSPORT.MALI},
      {value: NON_UK_PASSPORT.MALTA},
      {value: NON_UK_PASSPORT.MARSHALL_ISLANDS},
      {value: NON_UK_PASSPORT.MAURITANIA},
      {value: NON_UK_PASSPORT.MAURITIUS},
      {value: NON_UK_PASSPORT.MEXICO},
      {value: NON_UK_PASSPORT.MICRONESIA},
      {value: NON_UK_PASSPORT.MOLDOVA},
      {value: NON_UK_PASSPORT.MONACO},
      {value: NON_UK_PASSPORT.MONGOLIA},
      {value: NON_UK_PASSPORT.MONTENEGRO},
      {value: NON_UK_PASSPORT.MOROCCO},
      {value: NON_UK_PASSPORT.MOZAMBIQUE},
      {value: NON_UK_PASSPORT.MYANMAR},
      {value: NON_UK_PASSPORT.NAMIBIA},
      {value: NON_UK_PASSPORT.NAURU},
      {value: NON_UK_PASSPORT.NEPAL},
      {value: NON_UK_PASSPORT.NETHERLANDS},
      {value: NON_UK_PASSPORT.NEW_ZEALAND},
      {value: NON_UK_PASSPORT.NICARAGUA},
      {value: NON_UK_PASSPORT.NIGER},
      {value: NON_UK_PASSPORT.NIGERIA},
      {value: NON_UK_PASSPORT.NORTH_KOREA},
      {value: NON_UK_PASSPORT.N_MACEDONIA},
      {value: NON_UK_PASSPORT.NORWAY},
      {value: NON_UK_PASSPORT.OMAN},
      {value: NON_UK_PASSPORT.PAKISTAN},
      {value: NON_UK_PASSPORT.PALAU},
      {value: NON_UK_PASSPORT.PANAMA},
      {value: NON_UK_PASSPORT.PAPUA_NEW_GUINEA},
      {value: NON_UK_PASSPORT.PARAGUAY},
      {value: NON_UK_PASSPORT.PERU},
      {value: NON_UK_PASSPORT.PHILIPPINES},
      {value: NON_UK_PASSPORT.POLAND},
      {value: NON_UK_PASSPORT.PORTUGAL},
      {value: NON_UK_PASSPORT.QATAR},
      {value: NON_UK_PASSPORT.ROMANIA},
      {value: NON_UK_PASSPORT.RUSSIA},
      {value: NON_UK_PASSPORT.RWANDA},
      {value: NON_UK_PASSPORT.SAMOA},
      {value: NON_UK_PASSPORT.SAN_MARINO},
      {value: NON_UK_PASSPORT.SAO_TOME},
      {value: NON_UK_PASSPORT.SAUDI_ARABIA},
      {value: NON_UK_PASSPORT.SENEGAL},
      {value: NON_UK_PASSPORT.SERBIA},
      {value: NON_UK_PASSPORT.SEYCHELLES},
      {value: NON_UK_PASSPORT.SIERRA_LEONE},
      {value: NON_UK_PASSPORT.SINGAPORE},
      {value: NON_UK_PASSPORT.SLOVAKIA},
      {value: NON_UK_PASSPORT.SLOVENIA},
      {value: NON_UK_PASSPORT.SOLOMON_ISLANDS},
      {value: NON_UK_PASSPORT.SOMALIA},
      {value: NON_UK_PASSPORT.SOUTH_AFRICA},
      {value: NON_UK_PASSPORT.SOUTH_KOREA},
      {value: NON_UK_PASSPORT.SOUTH_SUDAN},
      {value: NON_UK_PASSPORT.SPAIN},
      {value: NON_UK_PASSPORT.SRI_LANKA},
      {value: NON_UK_PASSPORT.ST_KITTS},
      {value: NON_UK_PASSPORT.ST_LUCIA},
      {value: NON_UK_PASSPORT.ST_VINCENT},
      {value: NON_UK_PASSPORT.SUDAN},
      {value: NON_UK_PASSPORT.SURINAME},
      {value: NON_UK_PASSPORT.SWEDEN},
      {value: NON_UK_PASSPORT.SWITZERLAND},
      {value: NON_UK_PASSPORT.SYRIA},
      {value: NON_UK_PASSPORT.TAJIKISTAN},
      {value: NON_UK_PASSPORT.TANZANIA},
      {value: NON_UK_PASSPORT.THAILAND},
      {value: NON_UK_PASSPORT.TOGO},
      {value: NON_UK_PASSPORT.TONGA},
      {value: NON_UK_PASSPORT.TRINIDAD_TOBAGO},
      {value: NON_UK_PASSPORT.TUNISIA},
      {value: NON_UK_PASSPORT.TURKEY},
      {value: NON_UK_PASSPORT.TURKMENISTAN},
      {value: NON_UK_PASSPORT.TUVALU},
      {value: NON_UK_PASSPORT.UGANDA},
      {value: NON_UK_PASSPORT.UKRAINE},
      {value: NON_UK_PASSPORT.UAE},
      {value: NON_UK_PASSPORT.US},
      {value: NON_UK_PASSPORT.URUGUAY},
      {value: NON_UK_PASSPORT.UZBEKISTAN},
      {value: NON_UK_PASSPORT.VANUATU},
      {value: NON_UK_PASSPORT.VENEZUELA},
      {value: NON_UK_PASSPORT.VIETNAM},
      {value: NON_UK_PASSPORT.YEMEN},
      {value: NON_UK_PASSPORT.ZAMBIA},
      {value: NON_UK_PASSPORT.ZIMBABWE},
    ],
    validate: ["required",
      {type: "equal", fn: (value) => !value.match(/Select/)}
    ]
  }
}
