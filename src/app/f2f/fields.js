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
      {
        value: APP.PHOTO_ID_OPTIONS.UK_PASSPORT,
        hint: { text: APP.UK_PASSPORT_HINT }
      },
      { value: APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT },
      {
        value: APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL,
        hint: { text: APP.UK_DL_HINT }
      },
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
        value: APP.PHOTO_ID_OPTIONS.UK_PASSPORT,
        hint: { text: APP.UK_PASSPORT_HINT }
      },
      { 
        value: APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT,
        hint: { text: APP.NON_UK_PASSPORT_HINT}
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
      { value: "Select", text: "Select country" },
      { value: EEA_ID_CARD.AUSTRIA.text, text: EEA_ID_CARD.AUSTRIA.text },
      { value: EEA_ID_CARD.BELGIUM.text, text: EEA_ID_CARD.BELGIUM.text },
      { value: EEA_ID_CARD.BULGARIA.text, text: EEA_ID_CARD.BULGARIA.text },
      { value: EEA_ID_CARD.CROATIA.text, text: EEA_ID_CARD.CROATIA.text },
      { value: EEA_ID_CARD.CYPRUS.text, text: EEA_ID_CARD.CYPRUS.text },
      { value: EEA_ID_CARD.CZECH.text, text: EEA_ID_CARD.CZECH.text },
      { value: EEA_ID_CARD.ESTONIA.text, text: EEA_ID_CARD.ESTONIA.text },
      { value: EEA_ID_CARD.FINLAND.text, text: EEA_ID_CARD.FINLAND.text },
      { value: EEA_ID_CARD.FRANCE.text, text: EEA_ID_CARD.FRANCE.text },
      { value: EEA_ID_CARD.GERMANY.text, text: EEA_ID_CARD.GERMANY.text },
      { value: EEA_ID_CARD.GREECE.text, text: EEA_ID_CARD.GREECE.text },
      { value: EEA_ID_CARD.HUNGARY.text, text: EEA_ID_CARD.HUNGARY.text },
      { value: EEA_ID_CARD.IRELAND.text, text: EEA_ID_CARD.IRELAND.text },
      { value: EEA_ID_CARD.ICELAND.text, text: EEA_ID_CARD.ICELAND.text },
      { value: EEA_ID_CARD.ITALY.text, text: EEA_ID_CARD.ITALY.text },
      { value: EEA_ID_CARD.LATVIA.text, text: EEA_ID_CARD.LATVIA.text },
      { value: EEA_ID_CARD.LIECHTENSTEIN.text, text: EEA_ID_CARD.LIECHTENSTEIN.text },
      { value: EEA_ID_CARD.LITHUANIA.text, text: EEA_ID_CARD.LITHUANIA.text },
      { value: EEA_ID_CARD.LUXEMBOURG.text, text: EEA_ID_CARD.LUXEMBOURG.text },
      { value: EEA_ID_CARD.MALTA.text, text: EEA_ID_CARD.MALTA.text },
      { value: EEA_ID_CARD.NETHERLANDS.text, text: EEA_ID_CARD.NETHERLANDS.text },
      { value: EEA_ID_CARD.NORWAY.text, text: EEA_ID_CARD.NORWAY.text },
      { value: EEA_ID_CARD.POLAND.text, text: EEA_ID_CARD.POLAND.text },
      { value: EEA_ID_CARD.PORTUGAL.text, text: EEA_ID_CARD.PORTUGAL.text },
      { value: EEA_ID_CARD.ROMANIA.text, text: EEA_ID_CARD.ROMANIA.text },
      { value: EEA_ID_CARD.SLOVAKIA.text, text: EEA_ID_CARD.SLOVAKIA.text },
      { value: EEA_ID_CARD.SLOVENIA.text, text: EEA_ID_CARD.SLOVENIA.text },
      { value: EEA_ID_CARD.SPAIN.text, text: EEA_ID_CARD.SPAIN.text },
      { value: EEA_ID_CARD.SWEDEN.text, text: EEA_ID_CARD.SWEDEN.text }
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
      { value: "Select", text: "Select country" },
      { value: EU_DL_COUNTRIES.AUSTRIA.text, text: EU_DL_COUNTRIES.AUSTRIA.text },
      { value: EU_DL_COUNTRIES.BELGIUM.text, text: EU_DL_COUNTRIES.BELGIUM.text },
      { value: EU_DL_COUNTRIES.BULGARIA.text, text: EU_DL_COUNTRIES.BULGARIA.text },
      { value: EU_DL_COUNTRIES.CROATIA.text, text: EU_DL_COUNTRIES.CROATIA.text },
      { value: EU_DL_COUNTRIES.CYPRUS.text, text: EU_DL_COUNTRIES.CYPRUS.text },
      { value: EU_DL_COUNTRIES.CZECH.text, text: EU_DL_COUNTRIES.CZECH.text },
      { value: EU_DL_COUNTRIES.DENMARK.text, text: EU_DL_COUNTRIES.DENMARK.text },
      { value: EU_DL_COUNTRIES.ESTONIA.text, text: EU_DL_COUNTRIES.ESTONIA.text },
      { value: EU_DL_COUNTRIES.FINLAND.text, text: EU_DL_COUNTRIES.FINLAND.text },
      { value: EU_DL_COUNTRIES.FRANCE.text, text: EU_DL_COUNTRIES.FRANCE.text },
      { value: EU_DL_COUNTRIES.GERMANY.text, text: EU_DL_COUNTRIES.GERMANY.text },
      { value: EU_DL_COUNTRIES.GREECE.text, text: EU_DL_COUNTRIES.GREECE.text },
      { value: EU_DL_COUNTRIES.HUNGARY.text, text: EU_DL_COUNTRIES.HUNGARY.text },
      { value: EU_DL_COUNTRIES.ITALY.text, text: EU_DL_COUNTRIES.ITALY.text },
      { value: EU_DL_COUNTRIES.IRELAND.text, text: EU_DL_COUNTRIES.IRELAND.text },
      { value: EU_DL_COUNTRIES.LATVIA.text, text: EU_DL_COUNTRIES.LATVIA.text },
      { value: EU_DL_COUNTRIES.LITHUANIA.text, text: EU_DL_COUNTRIES.LITHUANIA.text },
      { value: EU_DL_COUNTRIES.LUXEMBOURG.text, text: EU_DL_COUNTRIES.LUXEMBOURG.text },
      { value: EU_DL_COUNTRIES.MALTA.text, text: EU_DL_COUNTRIES.MALTA.text },
      { value: EU_DL_COUNTRIES.NETHERLANDS.text, text: EU_DL_COUNTRIES.NETHERLANDS.text },
      { value: EU_DL_COUNTRIES.POLAND.text, text: EU_DL_COUNTRIES.POLAND.text },
      { value: EU_DL_COUNTRIES.PORTUGAL.text, text: EU_DL_COUNTRIES.PORTUGAL.text },
      { value: EU_DL_COUNTRIES.ROMANIA.text, text: EU_DL_COUNTRIES.ROMANIA.text },
      { value: EU_DL_COUNTRIES.SLOVAKIA.text, text: EU_DL_COUNTRIES.SLOVAKIA.text },
      { value: EU_DL_COUNTRIES.SLOVENIA.text, text: EU_DL_COUNTRIES.SLOVENIA.text },
      { value: EU_DL_COUNTRIES.SPAIN.text, text: EU_DL_COUNTRIES.SPAIN.text },
      { value: EU_DL_COUNTRIES.SWEDEN.text, text: EU_DL_COUNTRIES.SWEDEN.text }
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
      {value: "Select", text: "Select country"},
      {value: NON_UK_PASSPORT.AFGHANISTAN.text, text: NON_UK_PASSPORT.AFGHANISTAN.text},
      {value: NON_UK_PASSPORT.ALBANIA.text, text: NON_UK_PASSPORT.ALBANIA.text},
      {value: NON_UK_PASSPORT.ALGERIA.text, text: NON_UK_PASSPORT.ALGERIA.text},
      {value: NON_UK_PASSPORT.ANDORRA.text, text: NON_UK_PASSPORT.ANDORRA.text},
      {value: NON_UK_PASSPORT.ANGOLA.text, text: NON_UK_PASSPORT.ANGOLA.text},
      {value: NON_UK_PASSPORT.ANTIGUA.text, text: NON_UK_PASSPORT.ANTIGUA.text},
      {value: NON_UK_PASSPORT.ARGENTINA.text, text: NON_UK_PASSPORT.ARGENTINA.text},
      {value: NON_UK_PASSPORT.ARMENIA.text, text: NON_UK_PASSPORT.ARMENIA.text},
      {value: NON_UK_PASSPORT.AUSTRALIA.text, text: NON_UK_PASSPORT.AUSTRALIA.text},
      {value: NON_UK_PASSPORT.AUSTRIA.text, text: NON_UK_PASSPORT.AUSTRIA.text},
      {value: NON_UK_PASSPORT.AZERBAIJAN.text, text: NON_UK_PASSPORT.AZERBAIJAN.text},
      {value: NON_UK_PASSPORT.BAHAMAS.text, text: NON_UK_PASSPORT.BAHAMAS.text},
      {value: NON_UK_PASSPORT.BAHRAIN.text, text: NON_UK_PASSPORT.BAHRAIN.text},
      {value: NON_UK_PASSPORT.BANGLADESH.text, text: NON_UK_PASSPORT.BANGLADESH.text},
      {value: NON_UK_PASSPORT.BARBADOS.text, text: NON_UK_PASSPORT.BARBADOS.text},
      {value: NON_UK_PASSPORT.BELARUS.text, text: NON_UK_PASSPORT.BELARUS.text},
      {value: NON_UK_PASSPORT.BELGIUM.text, text: NON_UK_PASSPORT.BELGIUM.text},
      {value: NON_UK_PASSPORT.BELIZE.text, text: NON_UK_PASSPORT.BELIZE.text},
      {value: NON_UK_PASSPORT.BENIN.text, text: NON_UK_PASSPORT.BENIN.text},
      {value: NON_UK_PASSPORT.BHUTAN.text, text: NON_UK_PASSPORT.BHUTAN.text},
      {value: NON_UK_PASSPORT.BOLIVIA.text, text: NON_UK_PASSPORT.BOLIVIA.text},
      {value: NON_UK_PASSPORT.BOSNIA.text, text: NON_UK_PASSPORT.BOSNIA.text},
      {value: NON_UK_PASSPORT.BOTSWANA.text, text: NON_UK_PASSPORT.BOTSWANA.text},
      {value: NON_UK_PASSPORT.BRAZIL.text, text: NON_UK_PASSPORT.BRAZIL.text},
      {value: NON_UK_PASSPORT.BRUNEI.text, text: NON_UK_PASSPORT.BRUNEI.text},
      {value: NON_UK_PASSPORT.BULGARIA.text, text: NON_UK_PASSPORT.BULGARIA.text},
      {value: NON_UK_PASSPORT.BURKINA_FASO.text, text: NON_UK_PASSPORT.BURKINA_FASO.text},
      {value: NON_UK_PASSPORT.BURUNDI.text, text: NON_UK_PASSPORT.BURUNDI.text},
      {value: NON_UK_PASSPORT.CAMBODIA.text, text: NON_UK_PASSPORT.CAMBODIA.text},
      {value: NON_UK_PASSPORT.CAMEROON.text, text: NON_UK_PASSPORT.CAMEROON.text},
      {value: NON_UK_PASSPORT.CANADA.text, text: NON_UK_PASSPORT.CANADA.text},
      {value: NON_UK_PASSPORT.CAPE_VERDE.text, text: NON_UK_PASSPORT.CAPE_VERDE.text},
      {value: NON_UK_PASSPORT.CAR.text, text: NON_UK_PASSPORT.CAR.text},
      {value: NON_UK_PASSPORT.CHAD.text, text: NON_UK_PASSPORT.CHAD.text},
      {value: NON_UK_PASSPORT.CHILE.text, text: NON_UK_PASSPORT.CHILE.text},
      {value: NON_UK_PASSPORT.CHINA.text, text: NON_UK_PASSPORT.CHINA.text},
      {value: NON_UK_PASSPORT.COLOMBIA.text, text: NON_UK_PASSPORT.COLOMBIA.text},
      {value: NON_UK_PASSPORT.COMOROS.text, text: NON_UK_PASSPORT.COMOROS.text},
      {value: NON_UK_PASSPORT.CONGO.text, text: NON_UK_PASSPORT.CONGO.text},
      {value: NON_UK_PASSPORT.COSTA_RICA.text, text: NON_UK_PASSPORT.COSTA_RICA.text},
      {value: NON_UK_PASSPORT.CROATIA.text, text: NON_UK_PASSPORT.CROATIA.text},
      {value: NON_UK_PASSPORT.CUBA.text, text: NON_UK_PASSPORT.CUBA.text},
      {value: NON_UK_PASSPORT.CYPRUS.text, text: NON_UK_PASSPORT.CYPRUS.text},
      {value: NON_UK_PASSPORT.CZECH.text, text: NON_UK_PASSPORT.CZECH.text},
      {value: NON_UK_PASSPORT.DRC.text, text: NON_UK_PASSPORT.DRC.text},
      {value: NON_UK_PASSPORT.DENMARK.text, text: NON_UK_PASSPORT.DENMARK.text},
      {value: NON_UK_PASSPORT.DJIBOUTI.text, text: NON_UK_PASSPORT.DJIBOUTI.text},
      {value: NON_UK_PASSPORT.DOMINICA.text, text: NON_UK_PASSPORT.DOMINICA.text},
      {value: NON_UK_PASSPORT.DOMINICAN_REP.text, text: NON_UK_PASSPORT.DOMINICAN_REP.text},
      {value: NON_UK_PASSPORT.EAST_TIMOR.text, text: NON_UK_PASSPORT.EAST_TIMOR.text},
      {value: NON_UK_PASSPORT.ECUADOR.text, text: NON_UK_PASSPORT.ECUADOR.text},
      {value: NON_UK_PASSPORT.EGYPT.text, text: NON_UK_PASSPORT.EGYPT.text},
      {value: NON_UK_PASSPORT.EL_SALVADOR.text, text: NON_UK_PASSPORT.EL_SALVADOR.text},
      {value: NON_UK_PASSPORT.EQ_GUINEA.text, text: NON_UK_PASSPORT.EQ_GUINEA.text},
      {value: NON_UK_PASSPORT.ERITREA.text, text: NON_UK_PASSPORT.ERITREA.text},
      {value: NON_UK_PASSPORT.ESTONIA.text, text: NON_UK_PASSPORT.ESTONIA.text},
      {value: NON_UK_PASSPORT.ESQATINI.text, text: NON_UK_PASSPORT.ESQATINI.text},
      {value: NON_UK_PASSPORT.ETHIOPIA.text, text: NON_UK_PASSPORT.ETHIOPIA.text},
      {value: NON_UK_PASSPORT.FIJI.text, text: NON_UK_PASSPORT.FIJI.text},
      {value: NON_UK_PASSPORT.FINLAND.text, text: NON_UK_PASSPORT.FINLAND.text},
      {value: NON_UK_PASSPORT.FRANCE.text, text: NON_UK_PASSPORT.FRANCE.text},
      {value: NON_UK_PASSPORT.GABON.text, text: NON_UK_PASSPORT.GABON.text},
      {value: NON_UK_PASSPORT.THE_GAMBIA.text, text: NON_UK_PASSPORT.THE_GAMBIA.text},
      {value: NON_UK_PASSPORT.GEORGIA.text, text: NON_UK_PASSPORT.GEORGIA.text},
      {value: NON_UK_PASSPORT.GERMANY.text, text: NON_UK_PASSPORT.GERMANY.text},
      {value: NON_UK_PASSPORT.GHANA.text, text: NON_UK_PASSPORT.GHANA.text},
      {value: NON_UK_PASSPORT.GREECE.text, text: NON_UK_PASSPORT.GREECE.text},
      {value: NON_UK_PASSPORT.GRENADA.text, text: NON_UK_PASSPORT.GRENADA.text},
      {value: NON_UK_PASSPORT.GUATEMALA.text, text: NON_UK_PASSPORT.GUATEMALA.text},
      {value: NON_UK_PASSPORT.GUINEA.text, text: NON_UK_PASSPORT.GUINEA.text},
      {value: NON_UK_PASSPORT.GUINEA_BISSAU.text, text: NON_UK_PASSPORT.GUINEA_BISSAU.text},
      {value: NON_UK_PASSPORT.GUYANA.text, text: NON_UK_PASSPORT.GUYANA.text},
      {value: NON_UK_PASSPORT.HAITI.text, text: NON_UK_PASSPORT.HAITI.text},
      {value: NON_UK_PASSPORT.HONDURAS.text, text: NON_UK_PASSPORT.HONDURAS.text},
      {value: NON_UK_PASSPORT.HUNGARY.text, text: NON_UK_PASSPORT.HUNGARY.text},
      {value: NON_UK_PASSPORT.ICELAND.text, text: NON_UK_PASSPORT.ICELAND.text},
      {value: NON_UK_PASSPORT.INDIA.text, text: NON_UK_PASSPORT.INDIA.text},
      {value: NON_UK_PASSPORT.INDONESIA.text, text: NON_UK_PASSPORT.INDONESIA.text},
      {value: NON_UK_PASSPORT.IRAN.text, text: NON_UK_PASSPORT.IRAN.text},
      {value: NON_UK_PASSPORT.IRAQ.text, text: NON_UK_PASSPORT.IRAQ.text},
      {value: NON_UK_PASSPORT.IRELAND.text, text: NON_UK_PASSPORT.IRELAND.text},
      {value: NON_UK_PASSPORT.ISRAEL.text, text: NON_UK_PASSPORT.ISRAEL.text},
      {value: NON_UK_PASSPORT.ITALY.text, text: NON_UK_PASSPORT.ITALY.text},
      {value: NON_UK_PASSPORT.IVORY_COAST.text, text: NON_UK_PASSPORT.IVORY_COAST.text},
      {value: NON_UK_PASSPORT.JAMAICA.text, text: NON_UK_PASSPORT.JAMAICA.text},
      {value: NON_UK_PASSPORT.JAPAN.text, text: NON_UK_PASSPORT.JAPAN.text},
      {value: NON_UK_PASSPORT.JORDAN.text, text: NON_UK_PASSPORT.JORDAN.text},
      {value: NON_UK_PASSPORT.KAZAKHSTAN.text, text: NON_UK_PASSPORT.KAZAKHSTAN.text},
      {value: NON_UK_PASSPORT.KENYA.text, text: NON_UK_PASSPORT.KENYA.text},
      {value: NON_UK_PASSPORT.KIRIBATI.text, text: NON_UK_PASSPORT.KIRIBATI.text},
      {value: NON_UK_PASSPORT.KOSOVO.text, text: NON_UK_PASSPORT.KOSOVO.text},
      {value: NON_UK_PASSPORT.KUWAIT.text, text: NON_UK_PASSPORT.KUWAIT.text},
      {value: NON_UK_PASSPORT.KYRGYZSTAN.text, text: NON_UK_PASSPORT.KYRGYZSTAN.text},
      {value: NON_UK_PASSPORT.LAOS.text, text: NON_UK_PASSPORT.LAOS.text},
      {value: NON_UK_PASSPORT.LATVIA.text, text: NON_UK_PASSPORT.LATVIA.text},
      {value: NON_UK_PASSPORT.LEBANON.text, text: NON_UK_PASSPORT.LEBANON.text},
      {value: NON_UK_PASSPORT.LESOTHO.text, text: NON_UK_PASSPORT.LESOTHO.text},
      {value: NON_UK_PASSPORT.LIBERIA.text, text: NON_UK_PASSPORT.LIBERIA.text},
      {value: NON_UK_PASSPORT.LIBYA.text, text: NON_UK_PASSPORT.LIBYA.text},
      {value: NON_UK_PASSPORT.LIECHTENSTEIN.text, text: NON_UK_PASSPORT.LIECHTENSTEIN.text},
      {value: NON_UK_PASSPORT.LITHUANIA.text, text: NON_UK_PASSPORT.LITHUANIA.text},
      {value: NON_UK_PASSPORT.LUXEMBOURG.text, text: NON_UK_PASSPORT.LUXEMBOURG.text},
      {value: NON_UK_PASSPORT.MADAGASCAR.text, text: NON_UK_PASSPORT.MADAGASCAR.text},
      {value: NON_UK_PASSPORT.MALAWAI.text, text: NON_UK_PASSPORT.MALAWAI.text},
      {value: NON_UK_PASSPORT.MALAYSIA.text, text: NON_UK_PASSPORT.MALAYSIA.text},
      {value: NON_UK_PASSPORT.MALDIVES.text, text: NON_UK_PASSPORT.MALDIVES.text},
      {value: NON_UK_PASSPORT.MALI.text, text: NON_UK_PASSPORT.MALI.text},
      {value: NON_UK_PASSPORT.MALTA.text, text: NON_UK_PASSPORT.MALTA.text},
      {value: NON_UK_PASSPORT.MARSHALL_ISLANDS.text, text: NON_UK_PASSPORT.MARSHALL_ISLANDS.text},
      {value: NON_UK_PASSPORT.MAURITANIA.text, text: NON_UK_PASSPORT.MAURITANIA.text},
      {value: NON_UK_PASSPORT.MAURITIUS.text, text: NON_UK_PASSPORT.MAURITIUS.text},
      {value: NON_UK_PASSPORT.MEXICO.text, text: NON_UK_PASSPORT.MEXICO.text},
      {value: NON_UK_PASSPORT.MICRONESIA.text, text: NON_UK_PASSPORT.MICRONESIA.text},
      {value: NON_UK_PASSPORT.MOLDOVA.text, text: NON_UK_PASSPORT.MOLDOVA.text},
      {value: NON_UK_PASSPORT.MONACO.text, text: NON_UK_PASSPORT.MONACO.text},
      {value: NON_UK_PASSPORT.MONGOLIA.text, text: NON_UK_PASSPORT.MONGOLIA.text},
      {value: NON_UK_PASSPORT.MONTENEGRO.text, text: NON_UK_PASSPORT.MONTENEGRO.text},
      {value: NON_UK_PASSPORT.MOROCCO.text, text: NON_UK_PASSPORT.MOROCCO.text},
      {value: NON_UK_PASSPORT.MOZAMBIQUE.text, text: NON_UK_PASSPORT.MOZAMBIQUE.text},
      {value: NON_UK_PASSPORT.MYANMAR.text, text: NON_UK_PASSPORT.MYANMAR.text},
      {value: NON_UK_PASSPORT.NAMIBIA.text, text: NON_UK_PASSPORT.NAMIBIA.text},
      {value: NON_UK_PASSPORT.NAURU.text, text: NON_UK_PASSPORT.NAURU.text},
      {value: NON_UK_PASSPORT.NEPAL.text, text: NON_UK_PASSPORT.NEPAL.text},
      {value: NON_UK_PASSPORT.NETHERLANDS.text, text: NON_UK_PASSPORT.NETHERLANDS.text},
      {value: NON_UK_PASSPORT.NEW_ZEALAND.text, text: NON_UK_PASSPORT.NEW_ZEALAND.text},
      {value: NON_UK_PASSPORT.NICARAGUA.text, text: NON_UK_PASSPORT.NICARAGUA.text},
      {value: NON_UK_PASSPORT.NIGER.text, text: NON_UK_PASSPORT.NIGER.text},
      {value: NON_UK_PASSPORT.NIGERIA.text, text: NON_UK_PASSPORT.NIGERIA.text},
      {value: NON_UK_PASSPORT.NORTH_KOREA.text, text: NON_UK_PASSPORT.NORTH_KOREA.text},
      {value: NON_UK_PASSPORT.N_MACEDONIA.text, text: NON_UK_PASSPORT.N_MACEDONIA.text},
      {value: NON_UK_PASSPORT.NORWAY.text, text: NON_UK_PASSPORT.NORWAY.text},
      {value: NON_UK_PASSPORT.OMAN.text, text: NON_UK_PASSPORT.OMAN.text},
      {value: NON_UK_PASSPORT.PAKISTAN.text, text: NON_UK_PASSPORT.PAKISTAN.text},
      {value: NON_UK_PASSPORT.PALAU.text, text: NON_UK_PASSPORT.PALAU.text},
      {value: NON_UK_PASSPORT.PANAMA.text, text: NON_UK_PASSPORT.PANAMA.text},
      {value: NON_UK_PASSPORT.PAPUA_NEW_GUINEA.text, text: NON_UK_PASSPORT.PAPUA_NEW_GUINEA.text},
      {value: NON_UK_PASSPORT.PARAGUAY.text, text: NON_UK_PASSPORT.PARAGUAY.text},
      {value: NON_UK_PASSPORT.PERU.text, text: NON_UK_PASSPORT.PERU.text},
      {value: NON_UK_PASSPORT.PHILIPPINES.text, text: NON_UK_PASSPORT.PHILIPPINES.text},
      {value: NON_UK_PASSPORT.POLAND.text, text: NON_UK_PASSPORT.POLAND.text},
      {value: NON_UK_PASSPORT.PORTUGAL.text, text: NON_UK_PASSPORT.PORTUGAL.text},
      {value: NON_UK_PASSPORT.QATAR.text, text: NON_UK_PASSPORT.QATAR.text},
      {value: NON_UK_PASSPORT.ROMANIA.text, text: NON_UK_PASSPORT.ROMANIA.text},
      {value: NON_UK_PASSPORT.RUSSIA.text, text: NON_UK_PASSPORT.RUSSIA.text},
      {value: NON_UK_PASSPORT.RWANDA.text, text: NON_UK_PASSPORT.RWANDA.text},
      {value: NON_UK_PASSPORT.SAMOA.text, text: NON_UK_PASSPORT.SAMOA.text},
      {value: NON_UK_PASSPORT.SAN_MARINO.text, text: NON_UK_PASSPORT.SAN_MARINO.text},
      {value: NON_UK_PASSPORT.SAO_TOME.text, text: NON_UK_PASSPORT.SAO_TOME.text},
      {value: NON_UK_PASSPORT.SAUDI_ARABIA.text, text: NON_UK_PASSPORT.SAUDI_ARABIA.text},
      {value: NON_UK_PASSPORT.SENEGAL.text, text: NON_UK_PASSPORT.SENEGAL.text},
      {value: NON_UK_PASSPORT.SERBIA.text, text: NON_UK_PASSPORT.SERBIA.text},
      {value: NON_UK_PASSPORT.SEYCHELLES.text, text: NON_UK_PASSPORT.SEYCHELLES.text},
      {value: NON_UK_PASSPORT.SIERRA_LEONE.text, text: NON_UK_PASSPORT.SIERRA_LEONE.text},
      {value: NON_UK_PASSPORT.SINGAPORE.text, text: NON_UK_PASSPORT.SINGAPORE.text},
      {value: NON_UK_PASSPORT.SLOVAKIA.text, text: NON_UK_PASSPORT.SLOVAKIA.text},
      {value: NON_UK_PASSPORT.SLOVENIA.text, text: NON_UK_PASSPORT.SLOVENIA.text},
      {value: NON_UK_PASSPORT.SOLOMON_ISLANDS.text, text: NON_UK_PASSPORT.SOLOMON_ISLANDS.text},
      {value: NON_UK_PASSPORT.SOMALIA.text, text: NON_UK_PASSPORT.SOMALIA.text},
      {value: NON_UK_PASSPORT.SOUTH_AFRICA.text, text: NON_UK_PASSPORT.SOUTH_AFRICA.text},
      {value: NON_UK_PASSPORT.SOUTH_KOREA.text, text: NON_UK_PASSPORT.SOUTH_KOREA.text},
      {value: NON_UK_PASSPORT.SOUTH_SUDAN.text, text: NON_UK_PASSPORT.SOUTH_SUDAN.text},
      {value: NON_UK_PASSPORT.SPAIN.text, text: NON_UK_PASSPORT.SPAIN.text},
      {value: NON_UK_PASSPORT.SRI_LANKA.text, text: NON_UK_PASSPORT.SRI_LANKA.text},
      {value: NON_UK_PASSPORT.ST_KITTS.text, text: NON_UK_PASSPORT.ST_KITTS.text},
      {value: NON_UK_PASSPORT.ST_LUCIA.text, text: NON_UK_PASSPORT.ST_LUCIA.text},
      {value: NON_UK_PASSPORT.ST_VINCENT.text, text: NON_UK_PASSPORT.ST_VINCENT.text},
      {value: NON_UK_PASSPORT.SUDAN.text, text: NON_UK_PASSPORT.SUDAN.text},
      {value: NON_UK_PASSPORT.SURINAME.text, text: NON_UK_PASSPORT.SURINAME.text},
      {value: NON_UK_PASSPORT.SWEDEN.text, text: NON_UK_PASSPORT.SWEDEN.text},
      {value: NON_UK_PASSPORT.SWITZERLAND.text, text: NON_UK_PASSPORT.SWITZERLAND.text},
      {value: NON_UK_PASSPORT.SYRIA.text, text: NON_UK_PASSPORT.SYRIA.text},
      {value: NON_UK_PASSPORT.TAJIKISTAN.text, text: NON_UK_PASSPORT.TAJIKISTAN.text},
      {value: NON_UK_PASSPORT.TANZANIA.text, text: NON_UK_PASSPORT.TANZANIA.text},
      {value: NON_UK_PASSPORT.THAILAND.text, text: NON_UK_PASSPORT.THAILAND.text},
      {value: NON_UK_PASSPORT.TOGO.text, text: NON_UK_PASSPORT.TOGO.text},
      {value: NON_UK_PASSPORT.TONGA.text, text: NON_UK_PASSPORT.TONGA.text},
      {value: NON_UK_PASSPORT.TRINIDAD_TOBAGO.text, text: NON_UK_PASSPORT.TRINIDAD_TOBAGO.text},
      {value: NON_UK_PASSPORT.TUNISIA.text, text: NON_UK_PASSPORT.TUNISIA.text},
      {value: NON_UK_PASSPORT.TURKEY.text, text: NON_UK_PASSPORT.TURKEY.text},
      {value: NON_UK_PASSPORT.TURKMENISTAN.text, text: NON_UK_PASSPORT.TURKMENISTAN.text},
      {value: NON_UK_PASSPORT.TUVALU.text, text: NON_UK_PASSPORT.TUVALU.text},
      {value: NON_UK_PASSPORT.UGANDA.text, text: NON_UK_PASSPORT.UGANDA.text},
      {value: NON_UK_PASSPORT.UKRAINE.text, text: NON_UK_PASSPORT.UKRAINE.text},
      {value: NON_UK_PASSPORT.UAE.text, text: NON_UK_PASSPORT.UAE.text},
      {value: NON_UK_PASSPORT.US.text, text: NON_UK_PASSPORT.US.text},
      {value: NON_UK_PASSPORT.URUGUAY.text, text: NON_UK_PASSPORT.URUGUAY.text},
      {value: NON_UK_PASSPORT.UZBEKISTAN.text, text: NON_UK_PASSPORT.UZBEKISTAN.text},
      {value: NON_UK_PASSPORT.VANUATU.text, text: NON_UK_PASSPORT.VANUATU.text},
      {value: NON_UK_PASSPORT.VENEZUELA.text, text: NON_UK_PASSPORT.VENEZUELA.text},
      {value: NON_UK_PASSPORT.VIETNAM.text, text: NON_UK_PASSPORT.VIETNAM.text},
      {value: NON_UK_PASSPORT.YEMEN.text, text: NON_UK_PASSPORT.YEMEN.text},
      {value: NON_UK_PASSPORT.ZAMBIA.text, text: NON_UK_PASSPORT.ZAMBIA.text},
      {value: NON_UK_PASSPORT.ZIMBABWE.text, text: NON_UK_PASSPORT.ZIMBABWE.text},
    ],
    validate: ["required",
      {type: "equal", fn: (value) => !value.match(/Select/)}
    ]
  }
}
