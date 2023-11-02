const { APP } = require("../../lib/config");
const { COUNTRY_CODES } = require("./data/countryCodes/en/countryCodes");

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
      { value: COUNTRY_CODES.Austria },
      { value: COUNTRY_CODES.Belgium },
      { value: COUNTRY_CODES.Bulgaria },
      { value: COUNTRY_CODES.Croatia },
      { value: COUNTRY_CODES.Cyprus },
      { value: COUNTRY_CODES["Czech Republic"] },
      { value: COUNTRY_CODES.Estonia },
      { value: COUNTRY_CODES.France },
      { value: COUNTRY_CODES.Finland },
      { value: COUNTRY_CODES.Germany },
      { value: COUNTRY_CODES.Greece },
      { value: COUNTRY_CODES.Hungary },
      { value: COUNTRY_CODES.Iceland },
      { value: COUNTRY_CODES.Ireland },
      { value: COUNTRY_CODES.Italy },
      { value: COUNTRY_CODES.Latvia },
      { value: COUNTRY_CODES.Liechtenstein },
      { value: COUNTRY_CODES.Lithuania },
      { value: COUNTRY_CODES.Luxembourg },
      { value: COUNTRY_CODES.Malta },
      { value: COUNTRY_CODES.Netherlands },
      { value: COUNTRY_CODES.Norway },
      { value: COUNTRY_CODES.Poland },
      { value: COUNTRY_CODES.Portugal },
      { value: COUNTRY_CODES.Romania },
      { value: COUNTRY_CODES.Slovakia },
      { value: COUNTRY_CODES.Slovenia },
      { value: COUNTRY_CODES.Spain },
      { value: COUNTRY_CODES.Sweden }
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
      { value: COUNTRY_CODES.Austria },
      { value: COUNTRY_CODES.Belgium },
      { value: COUNTRY_CODES.Bulgaria },
      { value: COUNTRY_CODES.Croatia },
      { value: COUNTRY_CODES.Cyprus },
      { value: COUNTRY_CODES["Czech Republic"] },
      { value: COUNTRY_CODES.Denmark },
      { value: COUNTRY_CODES.Estonia },
      { value: COUNTRY_CODES.France },
      { value: COUNTRY_CODES.Finland },
      { value: COUNTRY_CODES.Germany },
      { value: COUNTRY_CODES.Greece },
      { value: COUNTRY_CODES.Hungary },
      { value: COUNTRY_CODES.Ireland },
      { value: COUNTRY_CODES.Italy },
      { value: COUNTRY_CODES.Latvia },
      { value: COUNTRY_CODES.Lithuania },
      { value: COUNTRY_CODES.Luxembourg },
      { value: COUNTRY_CODES.Malta },
      { value: COUNTRY_CODES.Netherlands },
      { value: COUNTRY_CODES.Poland },
      { value: COUNTRY_CODES.Portugal },
      { value: COUNTRY_CODES.Romania },
      { value: COUNTRY_CODES.Slovakia },
      { value: COUNTRY_CODES.Slovenia },
      { value: COUNTRY_CODES.Spain },
      { value: COUNTRY_CODES.Sweden }
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
      {value: COUNTRY_CODES.Afghanistan},
      {value: COUNTRY_CODES.Albania},
      {value: COUNTRY_CODES.Algeria},
      {value: COUNTRY_CODES.Andorra},
      {value: COUNTRY_CODES.Angola},
      {value: COUNTRY_CODES["Antigua and Barbuda"]},
      {value: COUNTRY_CODES.Argentina},
      {value: COUNTRY_CODES.Armenia},
      {value: COUNTRY_CODES.Australia},
      {value: COUNTRY_CODES.Austria},
      {value: COUNTRY_CODES.Azerbaijan},
      {value: COUNTRY_CODES.Bahamas},
      {value: COUNTRY_CODES.Bahrain},
      {value: COUNTRY_CODES.Bangladesh},
      {value: COUNTRY_CODES.Barbados},
      {value: COUNTRY_CODES.Belarus},
      {value: COUNTRY_CODES.Belgium},
      {value: COUNTRY_CODES.Belize},
      {value: COUNTRY_CODES.Benin},
      {value: COUNTRY_CODES.Bhutan},
      {value: COUNTRY_CODES.Bolivia},
      {value: COUNTRY_CODES["Bosnia and Herzegovina"]},
      {value: COUNTRY_CODES.Botswana},
      {value: COUNTRY_CODES.Brazil},
      {value: COUNTRY_CODES.Brunei},
      {value: COUNTRY_CODES.Bulgaria},
      {value: COUNTRY_CODES["Burkina Faso"]},
      {value: COUNTRY_CODES.Burundi},
      {value: COUNTRY_CODES.Cambodia},
      {value: COUNTRY_CODES.Cameroon},
      {value: COUNTRY_CODES.Canada},
      {value: COUNTRY_CODES["Cape Verde"]},
      {value: COUNTRY_CODES["Central African Republic"]},
      {value: COUNTRY_CODES.Chad},
      {value: COUNTRY_CODES.Chile},
      {value: COUNTRY_CODES.China},
      {value: COUNTRY_CODES.Colombia},
      {value: COUNTRY_CODES.Comoros},
      {value: COUNTRY_CODES.Congo},
      {value: COUNTRY_CODES["Costa Rica"]},
      {value: COUNTRY_CODES.Croatia},
      {value: COUNTRY_CODES.Cuba},
      {value: COUNTRY_CODES.Cyprus},
      {value: COUNTRY_CODES["Czech Republic"]},
      {value: COUNTRY_CODES["Democratic Republic of the Congo"]},
      {value: COUNTRY_CODES.Denmark},
      {value: COUNTRY_CODES.Djibouti},
      {value: COUNTRY_CODES.Dominica},
      {value: COUNTRY_CODES["Dominican Republic"]},
      {value: COUNTRY_CODES["East Timor"]},
      {value: COUNTRY_CODES.Ecuador},
      {value: COUNTRY_CODES.Egypt},
      {value: COUNTRY_CODES["El Salvador"]},
      {value: COUNTRY_CODES["Equitorial Guinea"]},
      {value: COUNTRY_CODES.Eritrea},
      {value: COUNTRY_CODES.Estonia},
      {value: COUNTRY_CODES.Eswatini},
      {value: COUNTRY_CODES.Ethiopia},
      {value: COUNTRY_CODES.Fiji},
      {value: COUNTRY_CODES.Finland},
      {value: COUNTRY_CODES.France},
      {value: COUNTRY_CODES.Gabon},
      {value: COUNTRY_CODES["The Gambia"]},
      {value: COUNTRY_CODES.Georgia},
      {value: COUNTRY_CODES.Germany},
      {value: COUNTRY_CODES.Ghana},
      {value: COUNTRY_CODES.Greece},
      {value: COUNTRY_CODES.Grenada},
      {value: COUNTRY_CODES.Guatemala},
      {value: COUNTRY_CODES.Guinea},
      {value: COUNTRY_CODES["Guinea-Bassau"]},
      {value: COUNTRY_CODES.Guyana},
      {value: COUNTRY_CODES.Haiti},
      {value: COUNTRY_CODES.Honduras},
      {value: COUNTRY_CODES.Hungary},
      {value: COUNTRY_CODES.Iceland},
      {value: COUNTRY_CODES.India},
      {value: COUNTRY_CODES.Indonesia},
      {value: COUNTRY_CODES.Iran},
      {value: COUNTRY_CODES.Iraq},
      {value: COUNTRY_CODES.Ireland},
      {value: COUNTRY_CODES.Israel},
      {value: COUNTRY_CODES.Italy},
      {value: COUNTRY_CODES["Ivory Coast"]},
      {value: COUNTRY_CODES.Jamaica},
      {value: COUNTRY_CODES.Japan},
      {value: COUNTRY_CODES.Jordan},
      {value: COUNTRY_CODES.Kazakhstan},
      {value: COUNTRY_CODES.Kenya},
      {value: COUNTRY_CODES.Kiribati},
      {value: COUNTRY_CODES.Kosovo},
      {value: COUNTRY_CODES.Kuwait},
      {value: COUNTRY_CODES.Kyrgyzstan},
      {value: COUNTRY_CODES.Laos},
      {value: COUNTRY_CODES.Latvia},
      {value: COUNTRY_CODES.Lebanon},
      {value: COUNTRY_CODES.Lesotho},
      {value: COUNTRY_CODES.Liberia},
      {value: COUNTRY_CODES.Libya},
      {value: COUNTRY_CODES.Liechtenstein},
      {value: COUNTRY_CODES.Lithuania},
      {value: COUNTRY_CODES.Luxembourg},
      {value: COUNTRY_CODES.Madagascar},
      {value: COUNTRY_CODES.Malawi},
      {value: COUNTRY_CODES.Malaysia},
      {value: COUNTRY_CODES.Maldives},
      {value: COUNTRY_CODES.Mali},
      {value: COUNTRY_CODES.Malta},
      {value: COUNTRY_CODES["Marshall Islands"]},
      {value: COUNTRY_CODES.Mauritania},
      {value: COUNTRY_CODES.Mauritius},
      {value: COUNTRY_CODES.Mexico},
      {value: COUNTRY_CODES.Micronesia},
      {value: COUNTRY_CODES.Moldova},
      {value: COUNTRY_CODES.Monaco},
      {value: COUNTRY_CODES.Mongolia},
      {value: COUNTRY_CODES.Montenegro},
      {value: COUNTRY_CODES.Morocco},
      {value: COUNTRY_CODES.Mozambique},
      {value: COUNTRY_CODES.Myanmar},
      {value: COUNTRY_CODES.Namibia},
      {value: COUNTRY_CODES.Nauru},
      {value: COUNTRY_CODES.Nepal},
      {value: COUNTRY_CODES.Netherlands},
      {value: COUNTRY_CODES["New Zealand"]},
      {value: COUNTRY_CODES.Nicaragua},
      {value: COUNTRY_CODES.Niger},
      {value: COUNTRY_CODES.Nigeria},
      {value: COUNTRY_CODES["North Korea"]},
      {value: COUNTRY_CODES["North Macedonia"]},
      {value: COUNTRY_CODES.Norway},
      {value: COUNTRY_CODES.Oman},
      {value: COUNTRY_CODES.Pakistan},
      {value: COUNTRY_CODES.Palau},
      {value: COUNTRY_CODES.Panama},
      {value: COUNTRY_CODES["Papua New Guinea"]},
      {value: COUNTRY_CODES.Paraguay},
      {value: COUNTRY_CODES.Peru},
      {value: COUNTRY_CODES.Philippines},
      {value: COUNTRY_CODES.Poland},
      {value: COUNTRY_CODES.Portugal},
      {value: COUNTRY_CODES.Qatar},
      {value: COUNTRY_CODES.Romania},
      {value: COUNTRY_CODES.Russia},
      {value: COUNTRY_CODES.Rwanda},
      {value: COUNTRY_CODES.Samoa},
      {value: COUNTRY_CODES["San Marino"]},
      {value: COUNTRY_CODES["Sao Tome and Principe"]},
      {value: COUNTRY_CODES["Saudi Arabia"]},
      {value: COUNTRY_CODES.Senegal},
      {value: COUNTRY_CODES.Serbia},
      {value: COUNTRY_CODES.Seychelles},
      {value: COUNTRY_CODES["Sierra Leone"]},
      {value: COUNTRY_CODES.Singapore},
      {value: COUNTRY_CODES.Slovakia},
      {value: COUNTRY_CODES.Slovenia},
      {value: COUNTRY_CODES["Solomon Islands"]},
      {value: COUNTRY_CODES.Somalia},
      {value: COUNTRY_CODES["South Africa"]},
      {value: COUNTRY_CODES["South Korea"]},
      {value: COUNTRY_CODES["South Sudan"]},
      {value: COUNTRY_CODES.Spain},
      {value: COUNTRY_CODES["Sri Lanka"]},
      {value: COUNTRY_CODES["St Kitts and Nevis"]},
      {value: COUNTRY_CODES["St Lucia"]},
      {value: COUNTRY_CODES["St Vincent"]},
      {value: COUNTRY_CODES.Sudan},
      {value: COUNTRY_CODES.Suriname},
      {value: COUNTRY_CODES.Sweden},
      {value: COUNTRY_CODES.Switzerland},
      {value: COUNTRY_CODES.Syria},
      {value: COUNTRY_CODES.Tajikistan},
      {value: COUNTRY_CODES.Tanzania},
      {value: COUNTRY_CODES.Thailand},
      {value: COUNTRY_CODES.Togo},
      {value: COUNTRY_CODES.Tonga},
      {value: COUNTRY_CODES["Trinidad and Tobago"]},
      {value: COUNTRY_CODES.Tunisia},
      {value: COUNTRY_CODES.Turkey},
      {value: COUNTRY_CODES.Turkmenistan},
      {value: COUNTRY_CODES.Tuvalu},
      {value: COUNTRY_CODES.Uganda},
      {value: COUNTRY_CODES.Ukraine},
      {value: COUNTRY_CODES["United Arab Emirates"]},
      {value: COUNTRY_CODES["United States"]},
      {value: COUNTRY_CODES.Uruguay},
      {value: COUNTRY_CODES.Uzbekistan},
      {value: COUNTRY_CODES.Vanuatu},
      {value: COUNTRY_CODES.Venezuela},
      {value: COUNTRY_CODES.Vietnam},
      {value: COUNTRY_CODES.Yemen},
      {value: COUNTRY_CODES.Zambia},
      {value: COUNTRY_CODES.Zimbabwe},
    ],
    validate: ["required",
      {type: "equal", fn: (value) => !value.match(/Select/)}
    ]
  }
}
