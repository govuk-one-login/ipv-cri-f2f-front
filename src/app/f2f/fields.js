const { APP } = require("../../lib/config");
const { EEA_ID_CARD } = require("./data/countryCodes/eeaNationalIdentityCard");
const { EU_DL_COUNTRIES } = require("./data/countryCodes/euDrivingLicence");
const { NON_UK_PASSPORT } = require("./data/countryCodes/nonUkPassport");

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
    invalidates: ["eeaIdentityCardAddressCheck"]
  },
  photoIdChoiceThinFile: {
    type: "radios",
    legend: "",
    label: "",
    hint: "",
    items: [
      { value: APP.PHOTO_ID_OPTIONS.UK_PASSPORT },
      { value: APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT },
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
  idHasExpiryDate: {
    type: "radios",
    legend: "",
    label: "",
    hint: "",
    items: ["yes", "no"],
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
  ukPhotocardDlAddressCheck: {
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
  euPhotocardDlAddressCheck: {
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
  eeaIdentityCardAddressCheck: {
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
      { value: "Select" },
      "AUT", "BEL", "BGR", "HRV", "CYP", "CZE", "EST", "FIN", "FRA",
      "DEU", "GRC", "HUN", "IRL", "ISL", "ITA", "LVA", "LIE", "LTU", "LUX", "MLT", "NLD",
      "NOR", "POL", "PRT", "ROU", "SVK", "SVN", "ESP", "SWE"
    ],
    validate: ["required",
      { type: "equal", fn: (value) => !value.match(/Select/)}
    ]
  },
// eeaIdentityCardCountrySelector: {
//     legend: "",
//     label: "",
//     hint: "",
//     items: [
//         { value: "Select" },
//         "Austria",
//         "Belgium",
//         "Bulgaria",
//         "Croatia",
//         "Cyprus",
//         "Czech Republic",
//         "Estonia",
//         "Finland",
//         "France",
//         "Germany",
//         "Greece",
//         "Hungary",
//         "Iceland",
//         "Ireland",
//         "Italy",
//         "Latvia",
//         "Liechtenstein",
//         "Lithuania",
//         "Luxembourg",
//         "Malta",
//         "Netherlands",
//         "Norway",
//         "Poland",
//         "Portugal",
//         "Romania",
//         "Slovakia",
//         "Slovenia",
//         "Spain",
//         "Sweden",
//     ],
//     validate: ["required",
//       { type: "equal", fn: (value) => !value.match(/Select/)}
//     ]
//   },
  euDrivingLicenceCountrySelector: {
    legend: "",
    label: "",
    hint: "",
    items: [
      { value: "Select" },
      "AUT", "BEL", "BGR", "HRV", "CYP", "CZE", "DNK", "EST", "FIN", "FRA",
      "DEU", "GRC", "HUN", "IRL", "ITA", "LVA", "LTU", "LUX", "MLT", "NLD",
      "POL", "PRT", "ROU", "SVK", "SVN", "ESP", "SWE"
    ],
    validate: ["required",
      {type: "equal", fn: (value) => !value.match(/Select/)}
    ]
  },
  // euDrivingLicenceCountrySelector: {
  //   legend: "",
  //   label: "",
  //   hint: "",
  //   items: [
  //     { value: "Select" },
  //     "Austria",
  //     "Belgium",
  //     "Bulgaria",
  //     "Croatia",
  //     "Cyprus",
  //     "Czech Republic",
  //     "Denmark",
  //     "Estonia",
  //     "Finland",
  //     "France",
  //     "Germany",
  //     "Greece",
  //     "Hungary",
  //     "Italy",
  //     "Ireland",
  //     "Latvia",
  //     "Lithuania",
  //     "Luxembourg",
  //     "Malta",
  //     "Netherlands",
  //     "Poland",
  //     "Portugal",
  //     "Romania",
  //     "Slovakia",
  //     "Slovenia",
  //     "Spain",
  //     "Sweden",
  //   ],
  //   validate: ["required",
  //     {type: "equal", fn: (value) => !value.match(/Select/)}
  //   ]
  // },
  nonUkPassportCountrySelector: {
    type: "select",
    legend: "",
    label: "",
    hint: "",
    items: [
      { value: "Select" },
      "AFG", "ALB", "DZA", "AND", "AGO", "ATG", "ARG", "ARM", "AUS", "AUT",
      "AZE", "BHS", "BHR", "BGD", "BRB", "BLR", "BEL", "BLZ", "BEN", "BTN",
      "BOL", "BIH", "BWA", "BRA", "BRN", "BGR", "BFA", "BDI", "KHM", "CMR",
      "CAN", "CPV", "CAF", "TCD", "CHL", "CHN", "COL", "COM", "COG", "CRI",
      "HRV", "CUB", "CYP", "CZE", "COD", "DNK", "DJI", "DMA", "DOM", "TLS",
      "ECU", "EGY", "SLV", "GNQ", "ERI", "EST", "SWZ", "ETH", "FJI", "FIN",
      "FRA", "GAB", "GMB", "GEO", "DEU", "GHA", "GRC", "GRD", "GTM", "GIN",
      "GNB", "GUY", "HTI", "HND", "HUN", "ISL", "IND", "IDN", "IRN", "IRQ",
      "IRL", "ISR", "ITA", "CIV", "JAM", "JPN", "JOR", "KAZ", "KEN", "KIR",
      "XXK", "KWT", "KGZ", "LAO", "LVA", "LBN", "LSO", "LBR", "LBY", "LIE",
      "LTU", "LUX", "MDG", "MWI", "MYS", "MDV", "MLI", "MLT", "MHL", "MRT",
      "MUS", "MEX", "FSM", "MDA", "MCO", "MNG", "MNE", "MAR", "MOZ", "MMR",
      "NAM", "NRU", "NPL", "NLD", "NZL", "NIC", "NER", "NGA", "PRK", "MKD",
      "NOR", "OMN", "PAK", "PLW", "PAN", "PNG", "PRY", "PER", "PHL", "POL",
      "PRT", "QAT", "ROU", "RUS", "RWA", "WSM", "SMR", "STP", "SAU", "SEN",
      "SRB", "SYC", "SLE", "SGP", "SVK", "SVN", "SLB", "SOM", "ZAF", "KOR",
      "SSD", "ESP", "LKA", "KNA", "LCA", "VCT", "SDN", "SUR", "SWE", "CHE",
      "SYR", "TJK", "TZA", "THA", "TGO", "TON", "TTO", "TUN", "TUR", "TKM",
      "TUV", "UGA", "UKR", "ARE", "USA", "URY", "UZB", "VUT", "VEN", "VNM",
      "YEM", "ZMB", "ZWE"],
    validate: ["required",
      {type: "equal", fn: (value) => !value.match(/Select/)}
    ]
  }
  // nonUkPassportCountrySelector: {
  //   type: "select",
  //   legend: "",
  //   label: "",
  //   hint: "",
  //   items: [
  //     {value: "Select"},
  //     "Afghanistan",
  //     "Albania",
  //     "Algeria",
  //     "Andorra",
  //     "Angola",
  //     "Antigua and Barbuda",
  //     "Argentina",
  //     "Armenia",
  //     "Australia",
  //     "Austria",
  //     "Azerbaijan",
  //     "Bahamas",
  //     "Bahrain",
  //     "Bangladesh",
  //     "Barbados",
  //     "Belarus",
  //     "Belgium",
  //     "Belize",
  //     "Benin",
  //     "Bhutan",
  //     "Bolivia",
  //     "Bosnia and Herzegovina",
  //     "Botswana",
  //     "Brazil",
  //     "Brunei",
  //     "Bulgaria",
  //     "Burkina Faso",
  //     "Burundi",
  //     "Cambodia",
  //     "Cameroon",
  //     "Canada",
  //     "Cape Verde",
  //     "Central African Republic",
  //     "Chad",
  //     "Chile",
  //     "China",
  //     "Colombia",
  //     "Comoros",
  //     "Congo",
  //     "Costa Rica",
  //     "Croatia",
  //     "Cuba",
  //     "Cyprus",
  //     "Czech Republic",
  //     "Democratic Republic of the Congo",
  //     "Denmark",
  //     "Djibouti",
  //     "Dominica",
  //     "Dominican Republic",
  //     "East Timor",
  //     "Ecuador",
  //     "Egypt",
  //     "El Salvador",
  //     "Equatorial Guinea",
  //     "Eritrea",
  //     "Estonia",
  //     "Eswatini",
  //     "Ethiopia",
  //     "Fiji",
  //     "Finland",
  //     "France",
  //     "Gabon",
  //     "The Gambia",
  //     "Georgia",
  //     "Germany",
  //     "Ghana",
  //     "Greece",
  //     "Grenada",
  //     "Guatemala",
  //     "Guinea",
  //     "Guinea-Bissau",
  //     "Guyana",
  //     "Haiti",
  //     "Honduras",
  //     "Hungary",
  //     "Iceland",
  //     "India",
  //     "Indonesia",
  //     "Iran",
  //     "Iraq",
  //     "Ireland",
  //     "Israel",
  //     "Italy",
  //     "Ivory Coast",
  //     "Jamaica",
  //     "Japan",
  //     "Jordan",
  //     "Kazakhstan",
  //     "Kenya",
  //     "Kiribati",
  //     "Kosovo",
  //     "Kuwait",
  //     "Kyrgyzstan",
  //     "Laos",
  //     "Latvia",
  //     "Lebanon",
  //     "Lesotho",
  //     "Liberia",
  //     "Libya",
  //     "Liechtenstein",
  //     "Lithuania",
  //     "Luxembourg",
  //     "Madagascar",
  //     "Malawi",
  //     "Malaysia",
  //     "Maldives",
  //     "Mali",
  //     "Malta",
  //     "Marshall Islands",
  //     "Mauritania",
  //     "Mauritius",
  //     "Mexico",
  //     "Micronesia",
  //     "Moldova",
  //     "Monaco",
  //     "Mongolia",
  //     "Montenegro",
  //     "Morocco",
  //     "Mozambique",
  //     "Myanmar",
  //     "Namibia",
  //     "Nauru",
  //     "Nepal",
  //     "Netherlands",
  //     "New Zealand",
  //     "Nicaragua",
  //     "Niger",
  //     "Nigeria",
  //     "North Korea",
  //     "North Macedonia",
  //     "Norway",
  //     "Oman",
  //     "Pakistan",
  //     "Palau",
  //     "Panama",
  //     "Papua New Guinea",
  //     "Paraguay",
  //     "Peru",
  //     "Philippines",
  //     "Poland",
  //     "Portugal",
  //     "Qatar",
  //     "Romania",
  //     "Russia",
  //     "Rwanda",
  //     "Samoa",
  //     "San Marino",
  //     "Sao Tome and Principe",
  //     "Saudi Arabia",
  //     "Senegal",
  //     "Serbia",
  //     "Seychelles",
  //     "Sierra Leone",
  //     "Singapore",
  //     "Slovakia",
  //     "Slovenia",
  //     "Solomon Islands",
  //     "Somalia",
  //     "South Africa",
  //     "South Korea",
  //     "South Sudan",
  //     "Spain",
  //     "Sri Lanka",
  //     "St Kitts and Nevis",
  //     "St Lucia",
  //     "St Vincent",
  //     "Sudan",
  //     "Suriname",
  //     "Sweden",
  //     "Switzerland",
  //     "Syria",
  //     "Tajikistan",
  //     "Tanzania",
  //     "Thailand",
  //     "Togo",
  //     "Tonga",
  //     "Trinidad and Tobago",
  //     "Tunisia",
  //     "Turkey",
  //     "Turkmenistan",
  //     "Tuvalu",
  //     "Uganda",
  //     "Ukraine",
  //     "United Arab Emirates",
  //     "United States",
  //     "Uruguay",
  //     "Uzbekistan",
  //     "Vanuatu",
  //     "Venezuela",
  //     "Vietnam",
  //     "Yemen",
  //     "Zambia",
  //     "Zimbabwe"
  //     ],
  //   validate: ["required",
  //     {type: "equal", fn: (value) => !value.match(/Select/)}
  //   ]
  // }
}
