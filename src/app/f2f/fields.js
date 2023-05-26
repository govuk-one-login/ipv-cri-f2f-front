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
  ukDlAddressCheck: {
    legend: "",
    label: "",
    hint: "",
    items: [
      { value: "Yes", text: "Yes" },
      { value: "No", text: "No" }
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
      { value: "sameAddress", text: APP.ADDRESS_OPTIONS.CURRENT_ADDRESS },
      { value: "differentAddress", text: APP.ADDRESS_OPTIONS.DIFFERENT_ADDRESS },
      { divider: "or" },
      { value: "noAddress", text: APP.ADDRESS_OPTIONS.NO_ADDRESS }
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
      { value: "sameAddress", text: APP.ADDRESS_OPTIONS.CURRENT_ADDRESS},
      { value: "differentAddress", text: APP.ADDRESS_OPTIONS.DIFFERENT_ADDRESS},
      {divider: "or"},
      { value: "noAddress", text: APP.ADDRESS_OPTIONS.ID_NO_ADDRESS}
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
  euDrivingLicenceCountrySelector: {
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
    type: "select",
    legend: "",
    label: "",
    hint: "",
    items: [
      {value: "Select", text: "Select country"},
      {value: NON_UK_PASSPORT.AFGHANISTAN.value, text: NON_UK_PASSPORT.AFGHANISTAN.text},
      {value: NON_UK_PASSPORT.ALBANIA.value, text: NON_UK_PASSPORT.ALBANIA.text},
      {value: NON_UK_PASSPORT.ALGERIA.value, text: NON_UK_PASSPORT.ALGERIA.text},
      {value: NON_UK_PASSPORT.ANDORRA.value, text: NON_UK_PASSPORT.ANDORRA.text},
      {value: NON_UK_PASSPORT.ANGOLA.value, text: NON_UK_PASSPORT.ANGOLA.text},
      {value: NON_UK_PASSPORT.ANTIGUA.value, text: NON_UK_PASSPORT.ANTIGUA.text},
      {value: NON_UK_PASSPORT.ARGENTINA.value, text: NON_UK_PASSPORT.ARGENTINA.text},
      {value: NON_UK_PASSPORT.ARMENIA.value, text: NON_UK_PASSPORT.ARMENIA.text},
      {value: NON_UK_PASSPORT.AUSTRALIA.value, text: NON_UK_PASSPORT.AUSTRALIA.text},
      {value: NON_UK_PASSPORT.AUSTRIA.value, text: NON_UK_PASSPORT.AUSTRIA.text},
      {value: NON_UK_PASSPORT.AZERBAIJAN.value, text: NON_UK_PASSPORT.AZERBAIJAN.text},
      {value: NON_UK_PASSPORT.BAHAMAS.value, text: NON_UK_PASSPORT.BAHAMAS.text},
      {value: NON_UK_PASSPORT.BAHRAIN.value, text: NON_UK_PASSPORT.BAHRAIN.text},
      {value: NON_UK_PASSPORT.BANGLADESH.value, text: NON_UK_PASSPORT.BANGLADESH.text},
      {value: NON_UK_PASSPORT.BARBADOS.value, text: NON_UK_PASSPORT.BARBADOS.text},
      {value: NON_UK_PASSPORT.BELARUS.value, text: NON_UK_PASSPORT.BELARUS.text},
      {value: NON_UK_PASSPORT.BELGIUM.value, text: NON_UK_PASSPORT.BELGIUM.text},
      {value: NON_UK_PASSPORT.BELIZE.value, text: NON_UK_PASSPORT.BELIZE.text},
      {value: NON_UK_PASSPORT.BENIN.value, text: NON_UK_PASSPORT.BENIN.text},
      {value: NON_UK_PASSPORT.BHUTAN.value, text: NON_UK_PASSPORT.BHUTAN.text},
      {value: NON_UK_PASSPORT.BOLIVIA.value, text: NON_UK_PASSPORT.BOLIVIA.text},
      {value: NON_UK_PASSPORT.BOSNIA.value, text: NON_UK_PASSPORT.BOSNIA.text},
      {value: NON_UK_PASSPORT.BOTSWANA.value, text: NON_UK_PASSPORT.BOTSWANA.text},
      {value: NON_UK_PASSPORT.BRAZIL.value, text: NON_UK_PASSPORT.BRAZIL.text},
      {value: NON_UK_PASSPORT.BRUNEI.value, text: NON_UK_PASSPORT.BRUNEI.text},
      {value: NON_UK_PASSPORT.BULGARIA.value, text: NON_UK_PASSPORT.BULGARIA.text},
      {value: NON_UK_PASSPORT.BURKINA_FASO.value, text: NON_UK_PASSPORT.BURKINA_FASO.text},
      {value: NON_UK_PASSPORT.BURUNDI.value, text: NON_UK_PASSPORT.BURUNDI.text},
      {value: NON_UK_PASSPORT.CAMBODIA.value, text: NON_UK_PASSPORT.CAMBODIA.text},
      {value: NON_UK_PASSPORT.CAMEROON.value, text: NON_UK_PASSPORT.CAMEROON.text},
      {value: NON_UK_PASSPORT.CANADA.value, text: NON_UK_PASSPORT.CANADA.text},
      {value: NON_UK_PASSPORT.CAPE_VERDE.value, text: NON_UK_PASSPORT.CAPE_VERDE.text},
      {value: NON_UK_PASSPORT.CAR.value, text: NON_UK_PASSPORT.CAR.text},
      {value: NON_UK_PASSPORT.CHAD.value, text: NON_UK_PASSPORT.CHAD.text},
      {value: NON_UK_PASSPORT.CHILE.value, text: NON_UK_PASSPORT.CHILE.text},
      {value: NON_UK_PASSPORT.CHINA.value, text: NON_UK_PASSPORT.CHINA.text},
      {value: NON_UK_PASSPORT.COLOMBIA.value, text: NON_UK_PASSPORT.COLOMBIA.text},
      {value: NON_UK_PASSPORT.COMOROS.value, text: NON_UK_PASSPORT.COMOROS.text},
      {value: NON_UK_PASSPORT.CONGO.value, text: NON_UK_PASSPORT.CONGO.text},
      {value: NON_UK_PASSPORT.COSTA_RICA.value, text: NON_UK_PASSPORT.COSTA_RICA.text},
      {value: NON_UK_PASSPORT.CROATIA.value, text: NON_UK_PASSPORT.CROATIA.text},
      {value: NON_UK_PASSPORT.CUBA.value, text: NON_UK_PASSPORT.CUBA.text},
      {value: NON_UK_PASSPORT.CYPRUS.value, text: NON_UK_PASSPORT.CYPRUS.text},
      {value: NON_UK_PASSPORT.CZECH.value, text: NON_UK_PASSPORT.CZECH.text},
      {value: NON_UK_PASSPORT.DRC.value, text: NON_UK_PASSPORT.DRC.text},
      {value: NON_UK_PASSPORT.DENMARK.value, text: NON_UK_PASSPORT.DENMARK.text},
      {value: NON_UK_PASSPORT.DJIBOUTI.value, text: NON_UK_PASSPORT.DJIBOUTI.text},
      {value: NON_UK_PASSPORT.DOMINICA.value, text: NON_UK_PASSPORT.DOMINICA.text},
      {value: NON_UK_PASSPORT.DOMINICAN_REP.value, text: NON_UK_PASSPORT.DOMINICAN_REP.text},
      {value: NON_UK_PASSPORT.EAST_TIMOR.value, text: NON_UK_PASSPORT.EAST_TIMOR.text},
      {value: NON_UK_PASSPORT.ECUADOR.value, text: NON_UK_PASSPORT.ECUADOR.text},
      {value: NON_UK_PASSPORT.EGYPT.value, text: NON_UK_PASSPORT.EGYPT.text},
      {value: NON_UK_PASSPORT.EL_SALVADOR.value, text: NON_UK_PASSPORT.EL_SALVADOR.text},
      {value: NON_UK_PASSPORT.EQ_GUINEA.value, text: NON_UK_PASSPORT.EQ_GUINEA.text},
      {value: NON_UK_PASSPORT.ERITREA.value, text: NON_UK_PASSPORT.ERITREA.text},
      {value: NON_UK_PASSPORT.ESTONIA.value, text: NON_UK_PASSPORT.ESTONIA.text},
      {value: NON_UK_PASSPORT.ESQATINI.value, text: NON_UK_PASSPORT.ESQATINI.text},
      {value: NON_UK_PASSPORT.ETHIOPIA.value, text: NON_UK_PASSPORT.ETHIOPIA.text},
      {value: NON_UK_PASSPORT.FIJI.value, text: NON_UK_PASSPORT.FIJI.text},
      {value: NON_UK_PASSPORT.FINLAND.value, text: NON_UK_PASSPORT.FINLAND.text},
      {value: NON_UK_PASSPORT.FRANCE.value, text: NON_UK_PASSPORT.FRANCE.text},
      {value: NON_UK_PASSPORT.GABON.value, text: NON_UK_PASSPORT.GABON.text},
      {value: NON_UK_PASSPORT.THE_GAMBIA.value, text: NON_UK_PASSPORT.THE_GAMBIA.text},
      {value: NON_UK_PASSPORT.GEORGIA.value, text: NON_UK_PASSPORT.GEORGIA.text},
      {value: NON_UK_PASSPORT.GERMANY.value, text: NON_UK_PASSPORT.GERMANY.text},
      {value: NON_UK_PASSPORT.GHANA.value, text: NON_UK_PASSPORT.GHANA.text},
      {value: NON_UK_PASSPORT.GREECE.value, text: NON_UK_PASSPORT.GREECE.text},
      {value: NON_UK_PASSPORT.GRENADA.value, text: NON_UK_PASSPORT.GRENADA.text},
      {value: NON_UK_PASSPORT.GUATEMALA.value, text: NON_UK_PASSPORT.GUATEMALA.text},
      {value: NON_UK_PASSPORT.GUINEA.value, text: NON_UK_PASSPORT.GUINEA.text},
      {value: NON_UK_PASSPORT.GUINEA_BISSAU.value, text: NON_UK_PASSPORT.GUINEA_BISSAU.text},
      {value: NON_UK_PASSPORT.GUYANA.value, text: NON_UK_PASSPORT.GUYANA.text},
      {value: NON_UK_PASSPORT.HAITI.value, text: NON_UK_PASSPORT.HAITI.text},
      {value: NON_UK_PASSPORT.HONDURAS.value, text: NON_UK_PASSPORT.HONDURAS.text},
      {value: NON_UK_PASSPORT.HUNGARY.value, text: NON_UK_PASSPORT.HUNGARY.text},
      {value: NON_UK_PASSPORT.ICELAND.value, text: NON_UK_PASSPORT.ICELAND.text},
      {value: NON_UK_PASSPORT.INDIA.value, text: NON_UK_PASSPORT.INDIA.text},
      {value: NON_UK_PASSPORT.INDONESIA.value, text: NON_UK_PASSPORT.INDONESIA.text},
      {value: NON_UK_PASSPORT.IRAN.value, text: NON_UK_PASSPORT.IRAN.text},
      {value: NON_UK_PASSPORT.IRAQ.value, text: NON_UK_PASSPORT.IRAQ.text},
      {value: NON_UK_PASSPORT.IRELAND.value, text: NON_UK_PASSPORT.IRELAND.text},
      {value: NON_UK_PASSPORT.ISRAEL.value, text: NON_UK_PASSPORT.ISRAEL.text},
      {value: NON_UK_PASSPORT.ITALY.value, text: NON_UK_PASSPORT.ITALY.text},
      {value: NON_UK_PASSPORT.IVORY_COAST.value, text: NON_UK_PASSPORT.IVORY_COAST.text},
      {value: NON_UK_PASSPORT.JAMAICA.value, text: NON_UK_PASSPORT.JAMAICA.text},
      {value: NON_UK_PASSPORT.JAPAN.value, text: NON_UK_PASSPORT.JAPAN.text},
      {value: NON_UK_PASSPORT.JORDAN.value, text: NON_UK_PASSPORT.JORDAN.text},
      {value: NON_UK_PASSPORT.KAZAKHSTAN.value, text: NON_UK_PASSPORT.KAZAKHSTAN.text},
      {value: NON_UK_PASSPORT.KENYA.value, text: NON_UK_PASSPORT.KENYA.text},
      {value: NON_UK_PASSPORT.KIRIBATI.value, text: NON_UK_PASSPORT.KIRIBATI.text},
      {value: NON_UK_PASSPORT.KOSOVO.value, text: NON_UK_PASSPORT.KOSOVO.text},
      {value: NON_UK_PASSPORT.KUWAIT.value, text: NON_UK_PASSPORT.KUWAIT.text},
      {value: NON_UK_PASSPORT.KYRGYZSTAN.value, text: NON_UK_PASSPORT.KYRGYZSTAN.text},
      {value: NON_UK_PASSPORT.LAOS.value, text: NON_UK_PASSPORT.LAOS.text},
      {value: NON_UK_PASSPORT.LATVIA.value, text: NON_UK_PASSPORT.LATVIA.text},
      {value: NON_UK_PASSPORT.LEBANON.value, text: NON_UK_PASSPORT.LEBANON.text},
      {value: NON_UK_PASSPORT.LESOTHO.value, text: NON_UK_PASSPORT.LESOTHO.text},
      {value: NON_UK_PASSPORT.LIBERIA.value, text: NON_UK_PASSPORT.LIBERIA.text},
      {value: NON_UK_PASSPORT.LIBYA.value, text: NON_UK_PASSPORT.LIBYA.text},
      {value: NON_UK_PASSPORT.LIECHTENSTEIN.value, text: NON_UK_PASSPORT.LIECHTENSTEIN.text},
      {value: NON_UK_PASSPORT.LITHUANIA.value, text: NON_UK_PASSPORT.LITHUANIA.text},
      {value: NON_UK_PASSPORT.LUXEMBOURG.value, text: NON_UK_PASSPORT.LUXEMBOURG.text},
      {value: NON_UK_PASSPORT.MADAGASCAR.value, text: NON_UK_PASSPORT.MADAGASCAR.text},
      {value: NON_UK_PASSPORT.MALAWAI.value, text: NON_UK_PASSPORT.MALAWAI.text},
      {value: NON_UK_PASSPORT.MALAYSIA.value, text: NON_UK_PASSPORT.MALAYSIA.text},
      {value: NON_UK_PASSPORT.MALDIVES.value, text: NON_UK_PASSPORT.MALDIVES.text},
      {value: NON_UK_PASSPORT.MALI.value, text: NON_UK_PASSPORT.MALI.text},
      {value: NON_UK_PASSPORT.MALTA.value, text: NON_UK_PASSPORT.MALTA.text},
      {value: NON_UK_PASSPORT.MARSHALL_ISLANDS.value, text: NON_UK_PASSPORT.MARSHALL_ISLANDS.text},
      {value: NON_UK_PASSPORT.MAURITANIA.value, text: NON_UK_PASSPORT.MAURITANIA.text},
      {value: NON_UK_PASSPORT.MAURITIUS.value, text: NON_UK_PASSPORT.MAURITIUS.text},
      {value: NON_UK_PASSPORT.MEXICO.value, text: NON_UK_PASSPORT.MEXICO.text},
      {value: NON_UK_PASSPORT.MICRONESIA.value, text: NON_UK_PASSPORT.MICRONESIA.text},
      {value: NON_UK_PASSPORT.MOLDOVA.value, text: NON_UK_PASSPORT.MOLDOVA.text},
      {value: NON_UK_PASSPORT.MONACO.value, text: NON_UK_PASSPORT.MONACO.text},
      {value: NON_UK_PASSPORT.MONGOLIA.value, text: NON_UK_PASSPORT.MONGOLIA.text},
      {value: NON_UK_PASSPORT.MONTENEGRO.value, text: NON_UK_PASSPORT.MONTENEGRO.text},
      {value: NON_UK_PASSPORT.MOROCCO.value, text: NON_UK_PASSPORT.MOROCCO.text},
      {value: NON_UK_PASSPORT.MOZAMBIQUE.value, text: NON_UK_PASSPORT.MOZAMBIQUE.text},
      {value: NON_UK_PASSPORT.MYANMAR.value, text: NON_UK_PASSPORT.MYANMAR.text},
      {value: NON_UK_PASSPORT.NAMIBIA.value, text: NON_UK_PASSPORT.NAMIBIA.text},
      {value: NON_UK_PASSPORT.NAURU.value, text: NON_UK_PASSPORT.NAURU.text},
      {value: NON_UK_PASSPORT.NEPAL.value, text: NON_UK_PASSPORT.NEPAL.text},
      {value: NON_UK_PASSPORT.NETHERLANDS.value, text: NON_UK_PASSPORT.NETHERLANDS.text},
      {value: NON_UK_PASSPORT.NEW_ZEALAND.value, text: NON_UK_PASSPORT.NEW_ZEALAND.text},
      {value: NON_UK_PASSPORT.NICARAGUA.value, text: NON_UK_PASSPORT.NICARAGUA.text},
      {value: NON_UK_PASSPORT.NIGER.value, text: NON_UK_PASSPORT.NIGER.text},
      {value: NON_UK_PASSPORT.NIGERIA.value, text: NON_UK_PASSPORT.NIGERIA.text},
      {value: NON_UK_PASSPORT.NORTH_KOREA.value, text: NON_UK_PASSPORT.NORTH_KOREA.text},
      {value: NON_UK_PASSPORT.N_MACEDONIA.value, text: NON_UK_PASSPORT.N_MACEDONIA.text},
      {value: NON_UK_PASSPORT.NORWAY.value, text: NON_UK_PASSPORT.NORWAY.text},
      {value: NON_UK_PASSPORT.OMAN.value, text: NON_UK_PASSPORT.OMAN.text},
      {value: NON_UK_PASSPORT.PAKISTAN.value, text: NON_UK_PASSPORT.PAKISTAN.text},
      {value: NON_UK_PASSPORT.PALAU.value, text: NON_UK_PASSPORT.PALAU.text},
      {value: NON_UK_PASSPORT.PANAMA.value, text: NON_UK_PASSPORT.PANAMA.text},
      {value: NON_UK_PASSPORT.PAPUA_NEW_GUINEA.value, text: NON_UK_PASSPORT.PAPUA_NEW_GUINEA.text},
      {value: NON_UK_PASSPORT.PARAGUAY.value, text: NON_UK_PASSPORT.PARAGUAY.text},
      {value: NON_UK_PASSPORT.PERU.value, text: NON_UK_PASSPORT.PERU.text},
      {value: NON_UK_PASSPORT.PHILIPPINES.value, text: NON_UK_PASSPORT.PHILIPPINES.text},
      {value: NON_UK_PASSPORT.POLAND.value, text: NON_UK_PASSPORT.POLAND.text},
      {value: NON_UK_PASSPORT.PORTUGAL.value, text: NON_UK_PASSPORT.PORTUGAL.text},
      {value: NON_UK_PASSPORT.QATAR.value, text: NON_UK_PASSPORT.QATAR.text},
      {value: NON_UK_PASSPORT.ROMANIA.value, text: NON_UK_PASSPORT.ROMANIA.text},
      {value: NON_UK_PASSPORT.RUSSIA.value, text: NON_UK_PASSPORT.RUSSIA.text},
      {value: NON_UK_PASSPORT.RWANDA.value, text: NON_UK_PASSPORT.RWANDA.text},
      {value: NON_UK_PASSPORT.SAMOA.value, text: NON_UK_PASSPORT.SAMOA.text},
      {value: NON_UK_PASSPORT.SAN_MARINO.value, text: NON_UK_PASSPORT.SAN_MARINO.text},
      {value: NON_UK_PASSPORT.SAO_TOME.value, text: NON_UK_PASSPORT.SAO_TOME.text},
      {value: NON_UK_PASSPORT.SAUDI_ARABIA.value, text: NON_UK_PASSPORT.SAUDI_ARABIA.text},
      {value: NON_UK_PASSPORT.SENEGAL.value, text: NON_UK_PASSPORT.SENEGAL.text},
      {value: NON_UK_PASSPORT.SERBIA.value, text: NON_UK_PASSPORT.SERBIA.text},
      {value: NON_UK_PASSPORT.SEYCHELLES.value, text: NON_UK_PASSPORT.SEYCHELLES.text},
      {value: NON_UK_PASSPORT.SIERRA_LEONE.value, text: NON_UK_PASSPORT.SIERRA_LEONE.text},
      {value: NON_UK_PASSPORT.SINGAPORE.value, text: NON_UK_PASSPORT.SINGAPORE.text},
      {value: NON_UK_PASSPORT.SLOVAKIA.value, text: NON_UK_PASSPORT.SLOVAKIA.text},
      {value: NON_UK_PASSPORT.SLOVENIA.value, text: NON_UK_PASSPORT.SLOVENIA.text},
      {value: NON_UK_PASSPORT.SOLOMON_ISLANDS.value, text: NON_UK_PASSPORT.SOLOMON_ISLANDS.text},
      {value: NON_UK_PASSPORT.SOMALIA.value, text: NON_UK_PASSPORT.SOMALIA.text},
      {value: NON_UK_PASSPORT.SOUTH_AFRICA.value, text: NON_UK_PASSPORT.SOUTH_AFRICA.text},
      {value: NON_UK_PASSPORT.SOUTH_KOREA.value, text: NON_UK_PASSPORT.SOUTH_KOREA.text},
      {value: NON_UK_PASSPORT.SOUTH_SUDAN.value, text: NON_UK_PASSPORT.SOUTH_SUDAN.text},
      {value: NON_UK_PASSPORT.SPAIN.value, text: NON_UK_PASSPORT.SPAIN.text},
      {value: NON_UK_PASSPORT.SRI_LANKA.value, text: NON_UK_PASSPORT.SRI_LANKA.text},
      {value: NON_UK_PASSPORT.ST_KITTS.value, text: NON_UK_PASSPORT.ST_KITTS.text},
      {value: NON_UK_PASSPORT.ST_LUCIA.value, text: NON_UK_PASSPORT.ST_LUCIA.text},
      {value: NON_UK_PASSPORT.ST_VINCENT.value, text: NON_UK_PASSPORT.ST_VINCENT.text},
      {value: NON_UK_PASSPORT.SUDAN.value, text: NON_UK_PASSPORT.SUDAN.text},
      {value: NON_UK_PASSPORT.SURINAME.value, text: NON_UK_PASSPORT.SURINAME.text},
      {value: NON_UK_PASSPORT.SWEDEN.value, text: NON_UK_PASSPORT.SWEDEN.text},
      {value: NON_UK_PASSPORT.SWITZERLAND.value, text: NON_UK_PASSPORT.SWITZERLAND.text},
      {value: NON_UK_PASSPORT.SYRIA.value, text: NON_UK_PASSPORT.SYRIA.text},
      {value: NON_UK_PASSPORT.TAJIKISTAN.value, text: NON_UK_PASSPORT.TAJIKISTAN.text},
      {value: NON_UK_PASSPORT.TANZANIA.value, text: NON_UK_PASSPORT.TANZANIA.text},
      {value: NON_UK_PASSPORT.THAILAND.value, text: NON_UK_PASSPORT.THAILAND.text},
      {value: NON_UK_PASSPORT.TOGO.value, text: NON_UK_PASSPORT.TOGO.text},
      {value: NON_UK_PASSPORT.TONGA.value, text: NON_UK_PASSPORT.TONGA.text},
      {value: NON_UK_PASSPORT.TRINIDAD_TOBAGO.value, text: NON_UK_PASSPORT.TRINIDAD_TOBAGO.text},
      {value: NON_UK_PASSPORT.TUNISIA.value, text: NON_UK_PASSPORT.TUNISIA.text},
      {value: NON_UK_PASSPORT.TURKEY.value, text: NON_UK_PASSPORT.TURKEY.text},
      {value: NON_UK_PASSPORT.TURKMENISTAN.value, text: NON_UK_PASSPORT.TURKMENISTAN.text},
      {value: NON_UK_PASSPORT.TUVALU.value, text: NON_UK_PASSPORT.TUVALU.text},
      {value: NON_UK_PASSPORT.UGANDA.value, text: NON_UK_PASSPORT.UGANDA.text},
      {value: NON_UK_PASSPORT.UKRAINE.value, text: NON_UK_PASSPORT.UKRAINE.text},
      {value: NON_UK_PASSPORT.UAE.value, text: NON_UK_PASSPORT.UAE.text},
      {value: NON_UK_PASSPORT.US.value, text: NON_UK_PASSPORT.US.text},
      {value: NON_UK_PASSPORT.URUGUAY.value, text: NON_UK_PASSPORT.URUGUAY.text},
      {value: NON_UK_PASSPORT.UZBEKISTAN.value, text: NON_UK_PASSPORT.UZBEKISTAN.text},
      {value: NON_UK_PASSPORT.VANUATU.value, text: NON_UK_PASSPORT.VANUATU.text},
      {value: NON_UK_PASSPORT.VENEZUELA.value, text: NON_UK_PASSPORT.VENEZUELA.text},
      {value: NON_UK_PASSPORT.VIETNAM.value, text: NON_UK_PASSPORT.VIETNAM.text},
      {value: NON_UK_PASSPORT.YEMEN.value, text: NON_UK_PASSPORT.YEMEN.text},
      {value: NON_UK_PASSPORT.ZAMBIA.value, text: NON_UK_PASSPORT.ZAMBIA.text},
      {value: NON_UK_PASSPORT.ZIMBABWE.value, text: NON_UK_PASSPORT.ZIMBABWE.text},
    ],
    validate: ["required", 
     {type: "equal", fn: (value) => !value.match(/Select/)}
    ]
  }
}