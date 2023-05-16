const { APP } = require("../../lib/config");
const { EEA_ID_CARD } = require("./countryCodes/eeaNationalIdentityCard");
const { EU_DL_COUNTRIES } = require("./countryCodes/euDrivingLicence");
const { NON_UK_PASSPORT } = require("./countryCodes/nonUkPassport");

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
  euDrivingLicenceAddressCheck: {
    legend: "",
    label: "",
    hint: "",
    items: [
      { value: APP.ADDRESS_OPTIONS.CURRENT_ADDRESS, text: APP.ADDRESS_OPTIONS.CURRENT_ADDRESS },
      { value: APP.ADDRESS_OPTIONS.DIFFERENT_ADDRESS, text: APP.ADDRESS_OPTIONS.DIFFERENT_ADDRESS },
      { divider: "or" },
      { value: APP.ADDRESS_OPTIONS.NO_ADDRESS, text: APP.ADDRESS_OPTIONS.NO_ADDRESS }
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
  },
  euDrivingLicenseCountrySelector: {
    legend: "",
    label: "",
    hint: "",
    items: [
      { value: "Select", text: "Select country" },
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
    validate: ["required", 
      {type: "equal", fn: (value) => !value.match(/Select/)}
    ]
  },
  nonUkPassportCountrySelector: {
    legend: "",
    label: "",
    hint: "",
    items: [
      {value: "Select", text: "Select country"},
      {value: NON_UK_PASSPORT.AFGHANISTAN.code, text: NON_UK_PASSPORT.AFGHANISTAN.text},
      {value: NON_UK_PASSPORT.ALBANIA.code, text: NON_UK_PASSPORT.ALBANIA.text},
      {value: NON_UK_PASSPORT.ALGERIA.code, text: NON_UK_PASSPORT.ALGERIA.text},
      {value: NON_UK_PASSPORT.ANDORRA.code, text: NON_UK_PASSPORT.ANDORRA.text},
      {value: NON_UK_PASSPORT.ANGOLA.code, text: NON_UK_PASSPORT.ANGOLA.text},
      {value: NON_UK_PASSPORT.ANTIGUA.code, text: NON_UK_PASSPORT.ANTIGUA.text},
      {value: NON_UK_PASSPORT.ARGENTINA.code, text: NON_UK_PASSPORT.ARGENTINA.text},
      {value: NON_UK_PASSPORT.ARMENIA.code, text: NON_UK_PASSPORT.ARMENIA.text},
      {value: NON_UK_PASSPORT.AUSTRALIA.code, text: NON_UK_PASSPORT.AUSTRALIA.text},
      {value: NON_UK_PASSPORT.AUSTRIA.code, text: NON_UK_PASSPORT.AUSTRIA.text},
      {value: NON_UK_PASSPORT.AZERBAIJAN.code, text: NON_UK_PASSPORT.AZERBAIJAN.text},
      {value: NON_UK_PASSPORT.BAHAMAS.code, text: NON_UK_PASSPORT.BAHAMAS.text},
      {value: NON_UK_PASSPORT.BAHRAIN.code, text: NON_UK_PASSPORT.BAHRAIN.text},
      {value: NON_UK_PASSPORT.BANGLADESH.code, text: NON_UK_PASSPORT.BANGLADESH.text},
      {value: NON_UK_PASSPORT.BARBADOS.code, text: NON_UK_PASSPORT.BARBADOS.text},
      {value: NON_UK_PASSPORT.BELARUS.code, text: NON_UK_PASSPORT.BELARUS.text},
      {value: NON_UK_PASSPORT.BELGIUM.code, text: NON_UK_PASSPORT.BELGIUM.text},
      {value: NON_UK_PASSPORT.BELIZE.code, text: NON_UK_PASSPORT.BELIZE.text},
      {value: NON_UK_PASSPORT.BENIN.code, text: NON_UK_PASSPORT.BENIN.text},
      {value: NON_UK_PASSPORT.BHUTAN.code, text: NON_UK_PASSPORT.BHUTAN.text},
      {value: NON_UK_PASSPORT.BOLIVIA.code, text: NON_UK_PASSPORT.BOLIVIA.text},
      {value: NON_UK_PASSPORT.BOSNIA.code, text: NON_UK_PASSPORT.BOSNIA.text},
      {value: NON_UK_PASSPORT.BOTSWANA.code, text: NON_UK_PASSPORT.BOTSWANA.text},
      {value: NON_UK_PASSPORT.BRAZIL.code, text: NON_UK_PASSPORT.BRAZIL.text},
      {value: NON_UK_PASSPORT.BRUNEI.code, text: NON_UK_PASSPORT.BRUNEI.text},
      {value: NON_UK_PASSPORT.BULGARIA.code, text: NON_UK_PASSPORT.BULGARIA.text},
      {value: NON_UK_PASSPORT.BURKINA_FASO.code, text: NON_UK_PASSPORT.BURKINA_FASO.text},
      {value: NON_UK_PASSPORT.BURUNDI.code, text: NON_UK_PASSPORT.BURUNDI.text},
      {value: NON_UK_PASSPORT.CAMBODIA.code, text: NON_UK_PASSPORT.CAMBODIA.text},
      {value: NON_UK_PASSPORT.CAMEROON.code, text: NON_UK_PASSPORT.CAMEROON.text},
      {value: NON_UK_PASSPORT.CANADA.code, text: NON_UK_PASSPORT.CANADA.text},
      {value: NON_UK_PASSPORT.CAPE_VERDE.code, text: NON_UK_PASSPORT.CAPE_VERDE.text},
      {value: NON_UK_PASSPORT.CAR.code, text: NON_UK_PASSPORT.CAR.text},
      {value: NON_UK_PASSPORT.CHAD.code, text: NON_UK_PASSPORT.CHAD.text},
      {value: NON_UK_PASSPORT.CHILE.code, text: NON_UK_PASSPORT.CHILE.text},
      {value: NON_UK_PASSPORT.CHINA.code, text: NON_UK_PASSPORT.CHINA.text},
      {value: NON_UK_PASSPORT.COLOMBIA.code, text: NON_UK_PASSPORT.COLOMBIA.text},
      {value: NON_UK_PASSPORT.COMOROS.code, text: NON_UK_PASSPORT.COMOROS.text},
      {value: NON_UK_PASSPORT.CONGO.code, text: NON_UK_PASSPORT.CONGO.text},
      {value: NON_UK_PASSPORT.COSTA_RICA.code, text: NON_UK_PASSPORT.COSTA_RICA.text},
      {value: NON_UK_PASSPORT.CROATIA.code, text: NON_UK_PASSPORT.CROATIA.text},
      {value: NON_UK_PASSPORT.CUBA.code, text: NON_UK_PASSPORT.CUBA.text},
      {value: NON_UK_PASSPORT.CYPRUS.code, text: NON_UK_PASSPORT.CYPRUS.text},
      {value: NON_UK_PASSPORT.CZECH.code, text: NON_UK_PASSPORT.CZECH.text},
      {value: NON_UK_PASSPORT.DRC.code, text: NON_UK_PASSPORT.DRC.text},
      {value: NON_UK_PASSPORT.DENMARK.code, text: NON_UK_PASSPORT.DENMARK.text},
      {value: NON_UK_PASSPORT.DJIBOUTI.code, text: NON_UK_PASSPORT.DJIBOUTI.text},
      {value: NON_UK_PASSPORT.DOMINICA.code, text: NON_UK_PASSPORT.DOMINICA.text},
      {value: NON_UK_PASSPORT.DOMINICAN_REP.code, text: NON_UK_PASSPORT.DOMINICAN_REP.text},
      {value: NON_UK_PASSPORT.EAST_TIMOR.code, text: NON_UK_PASSPORT.EAST_TIMOR.text},
      {value: NON_UK_PASSPORT.ECUADOR.code, text: NON_UK_PASSPORT.ECUADOR.text},
      {value: NON_UK_PASSPORT.EGYPT.code, text: NON_UK_PASSPORT.EGYPT.text},
      {value: NON_UK_PASSPORT.EL_SALVADOR.code, text: NON_UK_PASSPORT.EL_SALVADOR.text},
      {value: NON_UK_PASSPORT.EQ_GUINEA.code, text: NON_UK_PASSPORT.EQ_GUINEA.text},
      {value: NON_UK_PASSPORT.ERITREA.code, text: NON_UK_PASSPORT.ERITREA.text},
      {value: NON_UK_PASSPORT.ESTONIA.code, text: NON_UK_PASSPORT.ESTONIA.text},
      {value: NON_UK_PASSPORT.ESQATINI.code, text: NON_UK_PASSPORT.ESQATINI.text},
      {value: NON_UK_PASSPORT.ETHIOPIA.code, text: NON_UK_PASSPORT.ETHIOPIA.text},
      {value: NON_UK_PASSPORT.FIJI.code, text: NON_UK_PASSPORT.FIJI.text},
      {value: NON_UK_PASSPORT.FINLAND.code, text: NON_UK_PASSPORT.FINLAND.text},
      {value: NON_UK_PASSPORT.FRANCE.code, text: NON_UK_PASSPORT.FRANCE.text},
      {value: NON_UK_PASSPORT.GABON.code, text: NON_UK_PASSPORT.GABON.text},
      {value: NON_UK_PASSPORT.THE_GAMBIA.code, text: NON_UK_PASSPORT.THE_GAMBIA.text},
      {value: NON_UK_PASSPORT.GEORGIA.code, text: NON_UK_PASSPORT.GEORGIA.text},
      {value: NON_UK_PASSPORT.GERMANY.code, text: NON_UK_PASSPORT.GERMANY.text},
      {value: NON_UK_PASSPORT.GHANA.code, text: NON_UK_PASSPORT.GHANA.text},
      {value: NON_UK_PASSPORT.GREECE.code, text: NON_UK_PASSPORT.GREECE.text},
      {value: NON_UK_PASSPORT.GRENADA.code, text: NON_UK_PASSPORT.GRENADA.text},
      {value: NON_UK_PASSPORT.GUATEMALA.code, text: NON_UK_PASSPORT.GUATEMALA.text},
      {value: NON_UK_PASSPORT.GUINEA.code, text: NON_UK_PASSPORT.GUINEA.text},
      {value: NON_UK_PASSPORT.GUINEA_BISSAU.code, text: NON_UK_PASSPORT.GUINEA_BISSAU.text},
      {value: NON_UK_PASSPORT.GUYANA.code, text: NON_UK_PASSPORT.GUYANA.text},
      {value: NON_UK_PASSPORT.HAITI.code, text: NON_UK_PASSPORT.HAITI.text},
      {value: NON_UK_PASSPORT.HONDURAS.code, text: NON_UK_PASSPORT.HONDURAS.text},
      {value: NON_UK_PASSPORT.HUNGARY.code, text: NON_UK_PASSPORT.HUNGARY.text},
      {value: NON_UK_PASSPORT.ICELAND.code, text: NON_UK_PASSPORT.ICELAND.text},
      {value: NON_UK_PASSPORT.INDIA.code, text: NON_UK_PASSPORT.INDIA.text},
      {value: NON_UK_PASSPORT.INDONESIA.code, text: NON_UK_PASSPORT.INDONESIA.text},
      {value: NON_UK_PASSPORT.IRAN.code, text: NON_UK_PASSPORT.IRAN.text},
      {value: NON_UK_PASSPORT.IRAQ.code, text: NON_UK_PASSPORT.IRAQ.text},
      {value: NON_UK_PASSPORT.IRELAND.code, text: NON_UK_PASSPORT.IRELAND.text},
      {value: NON_UK_PASSPORT.ISRAEL.code, text: NON_UK_PASSPORT.ISRAEL.text},
      {value: NON_UK_PASSPORT.ITALY.code, text: NON_UK_PASSPORT.ITALY.text},
      {value: NON_UK_PASSPORT.IVORY_COAST.code, text: NON_UK_PASSPORT.IVORY_COAST.text},
      {value: NON_UK_PASSPORT.JAMAICA.code, text: NON_UK_PASSPORT.JAMAICA.text},
      {value: NON_UK_PASSPORT.JAPAN.code, text: NON_UK_PASSPORT.JAPAN.text},
      {value: NON_UK_PASSPORT.JORDAN.code, text: NON_UK_PASSPORT.JORDAN.text},
      {value: NON_UK_PASSPORT.KAZAKHSTAN.code, text: NON_UK_PASSPORT.KAZAKHSTAN.text},
      {value: NON_UK_PASSPORT.KENYA.code, text: NON_UK_PASSPORT.KENYA.text},
      {value: NON_UK_PASSPORT.KIRIBATI.code, text: NON_UK_PASSPORT.KIRIBATI.text},
      {value: NON_UK_PASSPORT.KOSOVO.code, text: NON_UK_PASSPORT.KOSOVO.text},
      {value: NON_UK_PASSPORT.KUWAIT.code, text: NON_UK_PASSPORT.KUWAIT.text},
      {value: NON_UK_PASSPORT.KYRGYZSTAN.code, text: NON_UK_PASSPORT.KYRGYZSTAN.text},
      {value: NON_UK_PASSPORT.LAOS.code, text: NON_UK_PASSPORT.LAOS.text},
      {value: NON_UK_PASSPORT.LATVIA.code, text: NON_UK_PASSPORT.LATVIA.text},
      {value: NON_UK_PASSPORT.LEBANON.code, text: NON_UK_PASSPORT.LEBANON.text},
      {value: NON_UK_PASSPORT.LESOTHO.code, text: NON_UK_PASSPORT.LESOTHO.text},
      {value: NON_UK_PASSPORT.LIBERIA.code, text: NON_UK_PASSPORT.LIBERIA.text},
      {value: NON_UK_PASSPORT.LIBYA.code, text: NON_UK_PASSPORT.LIBYA.text},
      {value: NON_UK_PASSPORT.LIECHTENSTEIN.code, text: NON_UK_PASSPORT.LIECHTENSTEIN.text},
      {value: NON_UK_PASSPORT.LITHUANIA.code, text: NON_UK_PASSPORT.LITHUANIA.text},
      {value: NON_UK_PASSPORT.LUXEMBOURG.code, text: NON_UK_PASSPORT.LUXEMBOURG.text},
      {value: NON_UK_PASSPORT.MADAGASCAR.code, text: NON_UK_PASSPORT.MADAGASCAR.text},
      {value: NON_UK_PASSPORT.MALAWAI.code, text: NON_UK_PASSPORT.MALAWAI.text},
      {value: NON_UK_PASSPORT.MALAYSIA.code, text: NON_UK_PASSPORT.MALAYSIA.text},
      {value: NON_UK_PASSPORT.MALDIVES.code, text: NON_UK_PASSPORT.MALDIVES.text},
      {value: NON_UK_PASSPORT.MALI.code, text: NON_UK_PASSPORT.MALI.text},
      {value: NON_UK_PASSPORT.MALTA.code, text: NON_UK_PASSPORT.MALTA.text},
      {value: NON_UK_PASSPORT.MARSHALL_ISLANDS.code, text: NON_UK_PASSPORT.MARSHALL_ISLANDS.text},
      {value: NON_UK_PASSPORT.MAURITANIA.code, text: NON_UK_PASSPORT.MAURITANIA.text},
      {value: NON_UK_PASSPORT.MAURITIUS.code, text: NON_UK_PASSPORT.MAURITIUS.text},
      {value: NON_UK_PASSPORT.MEXICO.code, text: NON_UK_PASSPORT.MEXICO.text},
      {value: NON_UK_PASSPORT.MICRONESIA.code, text: NON_UK_PASSPORT.MICRONESIA.text},
      {value: NON_UK_PASSPORT.MOLDOVA.code, text: NON_UK_PASSPORT.MOLDOVA.text},
      {value: NON_UK_PASSPORT.MONACO.code, text: NON_UK_PASSPORT.MONACO.text},
      {value: NON_UK_PASSPORT.MONGOLIA.code, text: NON_UK_PASSPORT.MONGOLIA.text},
      {value: NON_UK_PASSPORT.MONTENEGRO.code, text: NON_UK_PASSPORT.MONTENEGRO.text},
      {value: NON_UK_PASSPORT.MOROCCO.code, text: NON_UK_PASSPORT.MOROCCO.text},
      {value: NON_UK_PASSPORT.MOZAMBIQUE.code, text: NON_UK_PASSPORT.MOZAMBIQUE.text},
      {value: NON_UK_PASSPORT.MYANMAR.code, text: NON_UK_PASSPORT.MYANMAR.text},
      {value: NON_UK_PASSPORT.NAMIBIA.code, text: NON_UK_PASSPORT.NAMIBIA.text},
      {value: NON_UK_PASSPORT.NAURU.code, text: NON_UK_PASSPORT.NAURU.text},
      {value: NON_UK_PASSPORT.NEPAL.code, text: NON_UK_PASSPORT.NEPAL.text},
      {value: NON_UK_PASSPORT.NETHERLANDS.code, text: NON_UK_PASSPORT.NETHERLANDS.text},
      {value: NON_UK_PASSPORT.NEW_ZEALAND.code, text: NON_UK_PASSPORT.NEW_ZEALAND.text},
      {value: NON_UK_PASSPORT.NICARAGUA.code, text: NON_UK_PASSPORT.NICARAGUA.text},
      {value: NON_UK_PASSPORT.NIGER.code, text: NON_UK_PASSPORT.NIGER.text},
      {value: NON_UK_PASSPORT.NIGERIA.code, text: NON_UK_PASSPORT.NIGERIA.text},
      {value: NON_UK_PASSPORT.NORTH_KOREA.code, text: NON_UK_PASSPORT.NORTH_KOREA.text},
      {value: NON_UK_PASSPORT.N_MACEDONIA.code, text: NON_UK_PASSPORT.N_MACEDONIA.text},
      {value: NON_UK_PASSPORT.NORWAY.code, text: NON_UK_PASSPORT.NORWAY.text},
      {value: NON_UK_PASSPORT.OMAN.code, text: NON_UK_PASSPORT.OMAN.text},
      {value: NON_UK_PASSPORT.PAKISTAN.code, text: NON_UK_PASSPORT.PAKISTAN.text},
      {value: NON_UK_PASSPORT.PALAU.code, text: NON_UK_PASSPORT.PALAU.text},
      {value: NON_UK_PASSPORT.PANAMA.code, text: NON_UK_PASSPORT.PANAMA.text},
      {value: NON_UK_PASSPORT.PAPUA_NEW_GUINEA.code, text: NON_UK_PASSPORT.PAPUA_NEW_GUINEA.text},
      {value: NON_UK_PASSPORT.PARAGUAY.code, text: NON_UK_PASSPORT.PARAGUAY.text},
      {value: NON_UK_PASSPORT.PERU.code, text: NON_UK_PASSPORT.PERU.text},
      {value: NON_UK_PASSPORT.PHILIPPINES.code, text: NON_UK_PASSPORT.PHILIPPINES.text},
      {value: NON_UK_PASSPORT.POLAND.code, text: NON_UK_PASSPORT.POLAND.text},
      {value: NON_UK_PASSPORT.PORTUGAL.code, text: NON_UK_PASSPORT.PORTUGAL.text},
      {value: NON_UK_PASSPORT.QATAR.code, text: NON_UK_PASSPORT.QATAR.text},
      {value: NON_UK_PASSPORT.ROMANIA.code, text: NON_UK_PASSPORT.ROMANIA.text},
      {value: NON_UK_PASSPORT.RUSSIA.code, text: NON_UK_PASSPORT.RUSSIA.text},
      {value: NON_UK_PASSPORT.RWANDA.code, text: NON_UK_PASSPORT.RWANDA.text},
      {value: NON_UK_PASSPORT.SAMOA.code, text: NON_UK_PASSPORT.SAMOA.text},
      {value: NON_UK_PASSPORT.SAN_MARINO.code, text: NON_UK_PASSPORT.SAN_MARINO.text},
      {value: NON_UK_PASSPORT.SAO_TOME.code, text: NON_UK_PASSPORT.SAO_TOME.text},
      {value: NON_UK_PASSPORT.SAUDI_ARABIA.code, text: NON_UK_PASSPORT.SAUDI_ARABIA.text},
      {value: NON_UK_PASSPORT.SENEGAL.code, text: NON_UK_PASSPORT.SENEGAL.text},
      {value: NON_UK_PASSPORT.SERBIA.code, text: NON_UK_PASSPORT.SERBIA.text},
      {value: NON_UK_PASSPORT.SEYCHELLES.code, text: NON_UK_PASSPORT.SEYCHELLES.text},
      {value: NON_UK_PASSPORT.SIERRA_LEONE.code, text: NON_UK_PASSPORT.SIERRA_LEONE.text},
      {value: NON_UK_PASSPORT.SINGAPORE.code, text: NON_UK_PASSPORT.SINGAPORE.text},
      {value: NON_UK_PASSPORT.SLOVAKIA.code, text: NON_UK_PASSPORT.SLOVAKIA.text},
      {value: NON_UK_PASSPORT.SLOVENIA.code, text: NON_UK_PASSPORT.SLOVENIA.text},
      {value: NON_UK_PASSPORT.SOLOMON_ISLANDS.code, text: NON_UK_PASSPORT.SOLOMON_ISLANDS.text},
      {value: NON_UK_PASSPORT.SOMALIA.code, text: NON_UK_PASSPORT.SOMALIA.text},
      {value: NON_UK_PASSPORT.SOUTH_AFRICA.code, text: NON_UK_PASSPORT.SOUTH_AFRICA.text},
      {value: NON_UK_PASSPORT.SOUTH_KOREA.code, text: NON_UK_PASSPORT.SOUTH_KOREA.text},
      {value: NON_UK_PASSPORT.SOUTH_SUDAN.code, text: NON_UK_PASSPORT.SOUTH_SUDAN.text},
      {value: NON_UK_PASSPORT.SPAIN.code, text: NON_UK_PASSPORT.SPAIN.text},
      {value: NON_UK_PASSPORT.SRI_LANKA.code, text: NON_UK_PASSPORT.SRI_LANKA.text},
      {value: NON_UK_PASSPORT.ST_KITTS.code, text: NON_UK_PASSPORT.ST_KITTS.text},
      {value: NON_UK_PASSPORT.ST_LUCIA.code, text: NON_UK_PASSPORT.ST_LUCIA.text},
      {value: NON_UK_PASSPORT.ST_VINCENT.code, text: NON_UK_PASSPORT.ST_VINCENT.text},
      {value: NON_UK_PASSPORT.SUDAN.code, text: NON_UK_PASSPORT.SUDAN.text},
      {value: NON_UK_PASSPORT.SURINAME.code, text: NON_UK_PASSPORT.SURINAME.text},
      {value: NON_UK_PASSPORT.SWEDEN.code, text: NON_UK_PASSPORT.SWEDEN.text},
      {value: NON_UK_PASSPORT.SWITZERLAND.code, text: NON_UK_PASSPORT.SWITZERLAND.text},
      {value: NON_UK_PASSPORT.SYRIA.code, text: NON_UK_PASSPORT.SYRIA.text},
      {value: NON_UK_PASSPORT.TAJIKISTAN.code, text: NON_UK_PASSPORT.TAJIKISTAN.text},
      {value: NON_UK_PASSPORT.TANZANIA.code, text: NON_UK_PASSPORT.TANZANIA.text},
      {value: NON_UK_PASSPORT.THAILAND.code, text: NON_UK_PASSPORT.THAILAND.text},
      {value: NON_UK_PASSPORT.TOGO.code, text: NON_UK_PASSPORT.TOGO.text},
      {value: NON_UK_PASSPORT.TONGA.code, text: NON_UK_PASSPORT.TONGA.text},
      {value: NON_UK_PASSPORT.TRINIDAD_TOBAGO.code, text: NON_UK_PASSPORT.TRINIDAD_TOBAGO.text},
      {value: NON_UK_PASSPORT.TUNISIA.code, text: NON_UK_PASSPORT.TUNISIA.text},
      {value: NON_UK_PASSPORT.TURKEY.code, text: NON_UK_PASSPORT.TURKEY.text},
      {value: NON_UK_PASSPORT.TURKMENISTAN.code, text: NON_UK_PASSPORT.TURKMENISTAN.text},
      {value: NON_UK_PASSPORT.TUVALU.code, text: NON_UK_PASSPORT.TUVALU.text},
      {value: NON_UK_PASSPORT.UGANDA.code, text: NON_UK_PASSPORT.UGANDA.text},
      {value: NON_UK_PASSPORT.UKRAINE.code, text: NON_UK_PASSPORT.UKRAINE.text},
      {value: NON_UK_PASSPORT.UAE.code, text: NON_UK_PASSPORT.UAE.text},
      {value: NON_UK_PASSPORT.US.code, text: NON_UK_PASSPORT.US.text},
      {value: NON_UK_PASSPORT.URUGUAY.code, text: NON_UK_PASSPORT.URUGUAY.text},
      {value: NON_UK_PASSPORT.UZBEKISTAN.code, text: NON_UK_PASSPORT.UZBEKISTAN.text},
      {value: NON_UK_PASSPORT.VANUATU.code, text: NON_UK_PASSPORT.VANUATU.text},
      {value: NON_UK_PASSPORT.VENEZUELA.code, text: NON_UK_PASSPORT.VENEZUELA.text},
      {value: NON_UK_PASSPORT.VIETNAM.code, text: NON_UK_PASSPORT.VIETNAM.text},
      {value: NON_UK_PASSPORT.YEMEN.code, text: NON_UK_PASSPORT.YEMEN.text},
      {value: NON_UK_PASSPORT.ZAMBIA.code, text: NON_UK_PASSPORT.ZAMBIA.text},
      {value: NON_UK_PASSPORT.ZIMBABWE.code, text: NON_UK_PASSPORT.ZIMBABWE.text},
    ],
    validate: ["required", 
      {type: "equal", fn: (value) => !value.match(/Select/)}
    ]
  }
}
