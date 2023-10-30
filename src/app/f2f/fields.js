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
      {value: NON_UK_PASSPORT.Afghanistan},
      {value: NON_UK_PASSPORT.Albania},
      {value: NON_UK_PASSPORT.Algeria},
      {value: NON_UK_PASSPORT.Andorra},
      {value: NON_UK_PASSPORT.Angola},
      {value: NON_UK_PASSPORT["Antigua and Barbuda"]},
      {value: NON_UK_PASSPORT.Argentina},
      {value: NON_UK_PASSPORT.Armenia},
      {value: NON_UK_PASSPORT.Australia},
      {value: NON_UK_PASSPORT.Austria},
      {value: NON_UK_PASSPORT.Azerbaijan},
      {value: NON_UK_PASSPORT.Bahamas},
      {value: NON_UK_PASSPORT.Bahrain},
      {value: NON_UK_PASSPORT.Bangladesh},
      {value: NON_UK_PASSPORT.Barbados},
      {value: NON_UK_PASSPORT.Belarus},
      {value: NON_UK_PASSPORT.Belgium},
      {value: NON_UK_PASSPORT.Belize},
      {value: NON_UK_PASSPORT.Benin},
      {value: NON_UK_PASSPORT.Bhutan},
      {value: NON_UK_PASSPORT.Bolivia},
      {value: NON_UK_PASSPORT["Bosnia and Herzegovina"]},
      {value: NON_UK_PASSPORT.Botswana},
      {value: NON_UK_PASSPORT.Brazil},
      {value: NON_UK_PASSPORT.Brunei},
      {value: NON_UK_PASSPORT.Bulgaria},
      {value: NON_UK_PASSPORT["Burkina Faso"]},
      {value: NON_UK_PASSPORT.Burundi},
      {value: NON_UK_PASSPORT.Cambodia},
      {value: NON_UK_PASSPORT.Cameroon},
      {value: NON_UK_PASSPORT.Canada},
      {value: NON_UK_PASSPORT["Cape Verde"]},
      {value: NON_UK_PASSPORT["Central African Republic"]},
      {value: NON_UK_PASSPORT.Chad},
      {value: NON_UK_PASSPORT.Chile},
      {value: NON_UK_PASSPORT.China},
      {value: NON_UK_PASSPORT.Colombia},
      {value: NON_UK_PASSPORT.Comoros},
      {value: NON_UK_PASSPORT.Congo},
      {value: NON_UK_PASSPORT["Costa Rica"]},
      {value: NON_UK_PASSPORT.Croatia},
      {value: NON_UK_PASSPORT.Cuba},
      {value: NON_UK_PASSPORT.Cyprus},
      {value: NON_UK_PASSPORT["Czech Replublic"]},
      {value: NON_UK_PASSPORT["Democratic Republic of the Congo"]},
      {value: NON_UK_PASSPORT.Denmark},
      {value: NON_UK_PASSPORT.Djibouti},
      {value: NON_UK_PASSPORT.Dominica},
      {value: NON_UK_PASSPORT["Dominican Republic"]},
      {value: NON_UK_PASSPORT["East Timor"]},
      {value: NON_UK_PASSPORT.Ecuador},
      {value: NON_UK_PASSPORT.Egypt},
      {value: NON_UK_PASSPORT["El Salvador"]},
      {value: NON_UK_PASSPORT["Equitorial Guinea"]},
      {value: NON_UK_PASSPORT.Eritrea},
      {value: NON_UK_PASSPORT.Estonia},
      {value: NON_UK_PASSPORT.Eswatini},
      {value: NON_UK_PASSPORT.Ethiopia},
      {value: NON_UK_PASSPORT.Fiji},
      {value: NON_UK_PASSPORT.Finland},
      {value: NON_UK_PASSPORT.France},
      {value: NON_UK_PASSPORT.Gabon},
      {value: NON_UK_PASSPORT["The Gambia"]},
      {value: NON_UK_PASSPORT.Georgia},
      {value: NON_UK_PASSPORT.Germany},
      {value: NON_UK_PASSPORT.Ghana},
      {value: NON_UK_PASSPORT.Greece},
      {value: NON_UK_PASSPORT.Grenada},
      {value: NON_UK_PASSPORT.Guatemala},
      {value: NON_UK_PASSPORT.Guinea},
      {value: NON_UK_PASSPORT["Guinea-Bassau"]},
      {value: NON_UK_PASSPORT.Guyana},
      {value: NON_UK_PASSPORT.Haiti},
      {value: NON_UK_PASSPORT.Honduras},
      {value: NON_UK_PASSPORT.Hungary},
      {value: NON_UK_PASSPORT.Iceland},
      {value: NON_UK_PASSPORT.India},
      {value: NON_UK_PASSPORT.Indonesia},
      {value: NON_UK_PASSPORT.Iran},
      {value: NON_UK_PASSPORT.Iraq},
      {value: NON_UK_PASSPORT.Ireland},
      {value: NON_UK_PASSPORT.Israel},
      {value: NON_UK_PASSPORT.Italy},
      {value: NON_UK_PASSPORT["Ivory Coast"]},
      {value: NON_UK_PASSPORT.Jamaica},
      {value: NON_UK_PASSPORT.Japan},
      {value: NON_UK_PASSPORT.Jordan},
      {value: NON_UK_PASSPORT.Kazakhstan},
      {value: NON_UK_PASSPORT.Kenya},
      {value: NON_UK_PASSPORT.Kiribati},
      {value: NON_UK_PASSPORT.Kosovo},
      {value: NON_UK_PASSPORT.Kuwait},
      {value: NON_UK_PASSPORT.Kyrgyzstan},
      {value: NON_UK_PASSPORT.Laos},
      {value: NON_UK_PASSPORT.Latvia},
      {value: NON_UK_PASSPORT.Lebanon},
      {value: NON_UK_PASSPORT.Lesotho},
      {value: NON_UK_PASSPORT.Liberia},
      {value: NON_UK_PASSPORT.Libya},
      {value: NON_UK_PASSPORT.Liechtenstein},
      {value: NON_UK_PASSPORT.Lithuania},
      {value: NON_UK_PASSPORT.Luxembourg},
      {value: NON_UK_PASSPORT.Madagascar},
      {value: NON_UK_PASSPORT.Malawi},
      {value: NON_UK_PASSPORT.Malaysia},
      {value: NON_UK_PASSPORT.Maldives},
      {value: NON_UK_PASSPORT.Mali},
      {value: NON_UK_PASSPORT.Malta},
      {value: NON_UK_PASSPORT["Marshall Islands"]},
      {value: NON_UK_PASSPORT.Mauritania},
      {value: NON_UK_PASSPORT.Mauritius},
      {value: NON_UK_PASSPORT.Mexico},
      {value: NON_UK_PASSPORT.Micronesia},
      {value: NON_UK_PASSPORT.Moldova},
      {value: NON_UK_PASSPORT.Monaco},
      {value: NON_UK_PASSPORT.Mongolia},
      {value: NON_UK_PASSPORT.Montenegro},
      {value: NON_UK_PASSPORT.Morocco},
      {value: NON_UK_PASSPORT.Mozambique},
      {value: NON_UK_PASSPORT.Myanmar},
      {value: NON_UK_PASSPORT.Namibia},
      {value: NON_UK_PASSPORT.Nauru},
      {value: NON_UK_PASSPORT.Nepal},
      {value: NON_UK_PASSPORT.Netherlands},
      {value: NON_UK_PASSPORT["New Zealand"]},
      {value: NON_UK_PASSPORT.Nicaragua},
      {value: NON_UK_PASSPORT.Niger},
      {value: NON_UK_PASSPORT.Nigeria},
      {value: NON_UK_PASSPORT["North Korea"]},
      {value: NON_UK_PASSPORT["North Macedonia"]},
      {value: NON_UK_PASSPORT.Norway},
      {value: NON_UK_PASSPORT.Oman},
      {value: NON_UK_PASSPORT.Pakistan},
      {value: NON_UK_PASSPORT.Palau},
      {value: NON_UK_PASSPORT.Panama},
      {value: NON_UK_PASSPORT["Papua New Guinea"]},
      {value: NON_UK_PASSPORT.Paraguay},
      {value: NON_UK_PASSPORT.Peru},
      {value: NON_UK_PASSPORT.Philippines},
      {value: NON_UK_PASSPORT.Poland},
      {value: NON_UK_PASSPORT.Portugal},
      {value: NON_UK_PASSPORT.Qatar},
      {value: NON_UK_PASSPORT.Romania},
      {value: NON_UK_PASSPORT.Russia},
      {value: NON_UK_PASSPORT.Rwanda},
      {value: NON_UK_PASSPORT.Samoa},
      {value: NON_UK_PASSPORT["San Marino"]},
      {value: NON_UK_PASSPORT["Sao Tome"]},
      {value: NON_UK_PASSPORT["Saudi Arabia"]},
      {value: NON_UK_PASSPORT.Senegal},
      {value: NON_UK_PASSPORT.Serbia},
      {value: NON_UK_PASSPORT.Seychelles},
      {value: NON_UK_PASSPORT["Sierra Leone"]},
      {value: NON_UK_PASSPORT.Singapore},
      {value: NON_UK_PASSPORT.Slovakia},
      {value: NON_UK_PASSPORT.Slovenia},
      {value: NON_UK_PASSPORT["Solomon Islands"]},
      {value: NON_UK_PASSPORT.Somalia},
      {value: NON_UK_PASSPORT["South Africa"]},
      {value: NON_UK_PASSPORT["South Korea"]},
      {value: NON_UK_PASSPORT["South Sudan"]},
      {value: NON_UK_PASSPORT.Spain},
      {value: NON_UK_PASSPORT["Sri Lanka"]},
      {value: NON_UK_PASSPORT["St Kitts and Nevis"]},
      {value: NON_UK_PASSPORT["St Lucia"]},
      {value: NON_UK_PASSPORT["St Vincent"]},
      {value: NON_UK_PASSPORT.Sudan},
      {value: NON_UK_PASSPORT.Suriname},
      {value: NON_UK_PASSPORT.Sweden},
      {value: NON_UK_PASSPORT.Switzerland},
      {value: NON_UK_PASSPORT.Syria},
      {value: NON_UK_PASSPORT.Tajikistan},
      {value: NON_UK_PASSPORT.Tanzania},
      {value: NON_UK_PASSPORT.Thailand},
      {value: NON_UK_PASSPORT.Togo},
      {value: NON_UK_PASSPORT.Tonga},
      {value: NON_UK_PASSPORT["Trinidad and Tobago"]},
      {value: NON_UK_PASSPORT.Tunisia},
      {value: NON_UK_PASSPORT.Turkey},
      {value: NON_UK_PASSPORT.Turkmenistan},
      {value: NON_UK_PASSPORT.Tuvalu},
      {value: NON_UK_PASSPORT.Uganda},
      {value: NON_UK_PASSPORT.Ukraine},
      {value: NON_UK_PASSPORT["United Arab Emirates"]},
      {value: NON_UK_PASSPORT["United States"]},
      {value: NON_UK_PASSPORT.Uruguay},
      {value: NON_UK_PASSPORT.Uzbekistan},
      {value: NON_UK_PASSPORT.Vanuatu},
      {value: NON_UK_PASSPORT.Venezuela},
      {value: NON_UK_PASSPORT.Vietnam},
      {value: NON_UK_PASSPORT.Yemen},
      {value: NON_UK_PASSPORT.Zambia},
      {value: NON_UK_PASSPORT.Zimbabwe},
    ],
    validate: ["required",
      {type: "equal", fn: (value) => !value.match(/Select/)}
    ]
  }
}
