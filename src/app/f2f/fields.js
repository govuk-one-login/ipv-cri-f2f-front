const { APP } = require("../../lib/config");

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
      { value: "Select", key: "countries.Select" },
      { value: "AUT", key: "countries.AUT" },
      { value: "BEL", key: "countries.BEL" },
      { value: "BGR", key: "countries.BGR" },
      { value: "HRV", key: "countries.HRV" },
      { value: "CYP", key: "countries.CYP" },
      { value: "CZE", key: "countries.CZE" },
      { value: "DNK", key: "countries.DNK" },
      { value: "EST", key: "countries.EST" },
      { value: "FIN", key: "countries.FIN" },
      { value: "FRA", key: "countries.FRA" },
      { value: "DEU", key: "countries.DEU" },
      { value: "GRC", key: "countries.GRC" },
      { value: "HUN", key: "countries.HUN" },
      { value: "ISL", key: "countries.ISL" },
      { value: "IRL", key: "countries.IRL" },
      { value: "ITA", key: "countries.ITA" },
      { value: "LVA", key: "countries.LVA" },
      { value: "LIE", key: "countries.LIE" },
      { value: "LTU", key: "countries.LTU" },
      { value: "LUX", key: "countries.LUX" },
      { value: "MLT", key: "countries.MLT" },
      { value: "NLD", key: "countries.NLD" },
      { value: "NOR", key: "countries.NOR" },
      { value: "POL", key: "countries.POL" },
      { value: "PRT", key: "countries.PRT" },
      { value: "ROU", key: "countries.ROU" },
      { value: "SVK", key: "countries.SVK" },
      { value: "SVN", key: "countries.SVN" },
      { value: "ESP", key: "countries.ESP" },
      { value: "SWE", key: "countries.SWE" }

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
      { value: "Select", key: "countries.Select" },
      { value: "AUT", key: "countries.AUT" },
      { value: "BEL", key: "countries.BEL" },
      { value: "BGR", key: "countries.BGR" },
      { value: "HRV", key: "countries.HRV" },
      { value: "CYP", key: "countries.CYP" },
      { value: "CZE", key: "countries.CZE" },
      { value: "DNK", key: "countries.DNK" },
      { value: "EST", key: "countries.EST" },
      { value: "FIN", key: "countries.FIN" },
      { value: "FRA", key: "countries.FRA" },
      { value: "DEU", key: "countries.DEU" },
      { value: "GRC", key: "countries.GRC" },
      { value: "HUN", key: "countries.HUN" },
      { value: "IRL", key: "countries.IRL" },
      { value: "ITA", key: "countries.ITA" },
      { value: "LVA", key: "countries.LVA" },
      { value: "LTU", key: "countries.LTU" },
      { value: "LUX", key: "countries.LUX" },
      { value: "MLT", key: "countries.MLT" },
      { value: "NLD", key: "countries.NLD" },
      { value: "POL", key: "countries.POL" },
      { value: "PRT", key: "countries.PRT" },
      { value: "ROU", key: "countries.ROU" },
      { value: "SVK", key: "countries.SVK" },
      { value: "SVN", key: "countries.SVN" },
      { value: "ESP", key: "countries.ESP" },
      { value: "SWE", key: "countries.SWE" }

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
      { value: "Select", key: "countries.Select"},
      { value: "AFG", key: "countries.AFG" },
      { value: "ALB", key: "countries.ALB" },
      { value: "DZA", key: "countries.DZA" },
      { value: "AND", key: "countries.AND" },
      { value: "AGO", key: "countries.AGO" },
      { value: "ATG", key: "countries.ATG" },
      { value: "ARG", key: "countries.ARG" },
      { value: "ARM", key: "countries.ARM" },
      { value: "AUS", key: "countries.AUS" },
      { value: "AUT", key: "countries.AUT" },
      { value: "AZE", key: "countries.AZE" },
      { value: "BHS", key: "countries.BHS" },
      { value: "BHR", key: "countries.BHR" },
      { value: "BGD", key: "countries.BGD" },
      { value: "BRB", key: "countries.BRB" },
      { value: "BLR", key: "countries.BLR" },
      { value: "BEL", key: "countries.BEL" },
      { value: "BLZ", key: "countries.BLZ" },
      { value: "BEN", key: "countries.BEN" },
      { value: "BTN", key: "countries.BTN" },
      { value: "BOL", key: "countries.BOL" },
      { value: "BIH", key: "countries.BIH" },
      { value: "BWA", key: "countries.BWA" },
      { value: "BRA", key: "countries.BRA" },
      { value: "BRN", key: "countries.BRN" },
      { value: "BGR", key: "countries.BGR" },
      { value: "BFA", key: "countries.BFA" },
      { value: "BDI", key: "countries.BDI" },
      { value: "KHM", key: "countries.KHM" },
      { value: "CMR", key: "countries.CMR" },
      { value: "CAN", key: "countries.CAN" },
      { value: "CPV", key: "countries.CPV" },
      { value: "CAF", key: "countries.CAF" },
      { value: "TCD", key: "countries.TCD" },
      { value: "CHL", key: "countries.CHL" },
      { value: "CHN", key: "countries.CHN" },
      { value: "COL", key: "countries.COL" },
      { value: "COM", key: "countries.COM" },
      { value: "COG", key: "countries.COG" },
      { value: "CRI", key: "countries.CRI" },
      { value: "HRV", key: "countries.HRV" },
      { value: "CUB", key: "countries.CUB" },
      { value: "CYP", key: "countries.CYP" },
      { value: "CZE", key: "countries.CZE" },
      { value: "COD", key: "countries.COD" },
      { value: "DNK", key: "countries.DNK" },
      { value: "DJI", key: "countries.DJI" },
      { value: "DMA", key: "countries.DMA" },
      { value: "DOM", key: "countries.DOM" },
      { value: "TLS", key: "countries.TLS" },
      { value: "ECU", key: "countries.ECU" },
      { value: "EGY", key: "countries.EGY" },
      { value: "SLV", key: "countries.SLV" },
      { value: "GNQ", key: "countries.GNQ" },
      { value: "ERI", key: "countries.ERI" },
      { value: "EST", key: "countries.EST" },
      { value: "SWZ", key: "countries.SWZ" },
      { value: "ETH", key: "countries.ETH" },
      { value: "FJI", key: "countries.FJI" },
      { value: "FIN", key: "countries.FIN" },
      { value: "FRA", key: "countries.FRA" },
      { value: "GAB", key: "countries.GAB" },
      { value: "GMB", key: "countries.GMB" },
      { value: "GEO", key: "countries.GEO" },
      { value: "DEU", key: "countries.DEU" },
      { value: "GHA", key: "countries.GHA" },
      { value: "GRC", key: "countries.GRC" },
      { value: "GRD", key: "countries.GRD" },
      { value: "GTM", key: "countries.GTM" },
      { value: "GIN", key: "countries.GIN" },
      { value: "GNB", key: "countries.GNB" },
      { value: "GUY", key: "countries.GUY" },
      { value: "HTI", key: "countries.HTI" },
      { value: "HND", key: "countries.HND" },
      { value: "HUN", key: "countries.HUN" },
      { value: "ISL", key: "countries.ISL" },
      { value: "IND", key: "countries.IND" },
      { value: "IDN", key: "countries.IDN" },
      { value: "IRN", key: "countries.IRN" },
      { value: "IRQ", key: "countries.IRQ" },
      { value: "IRL", key: "countries.IRL" },
      { value: "ISR", key: "countries.ISR" },
      { value: "ITA", key: "countries.ITA" },
      { value: "CIV", key: "countries.CIV" },
      { value: "JAM", key: "countries.JAM" },
      { value: "JPN", key: "countries.JPN" },
      { value: "JOR", key: "countries.JOR" },
      { value: "KAZ", key: "countries.KAZ" },
      { value: "KEN", key: "countries.KEN" },
      { value: "KIR", key: "countries.KIR" },
      { value: "XXK", key: "countries.XXK" },
      { value: "KWT", key: "countries.KWT" },
      { value: "KGZ", key: "countries.KGZ" },
      { value: "LAO", key: "countries.LAO" },
      { value: "LVA", key: "countries.LVA" },
      { value: "LBN", key: "countries.LBN" },
      { value: "LSO", key: "countries.LSO" },
      { value: "LBR", key: "countries.LBR" },
      { value: "LBY", key: "countries.LBY" },
      { value: "LIE", key: "countries.LIE" },
      { value: "LTU", key: "countries.LTU" },
      { value: "LUX", key: "countries.LUX" },
      { value: "MDG", key: "countries.MDG" },
      { value: "MWI", key: "countries.MWI" },
      { value: "MYS", key: "countries.MYS" },
      { value: "MDV", key: "countries.MDV" },
      { value: "MLI", key: "countries.MLI" },
      { value: "MLT", key: "countries.MLT" },
      { value: "MHL", key: "countries.MHL" },
      { value: "MRT", key: "countries.MRT" },
      { value: "MUS", key: "countries.MUS" },
      { value: "MEX", key: "countries.MEX" },
      { value: "FSM", key: "countries.FSM" },
      { value: "MDA", key: "countries.MDA" },
      { value: "MCO", key: "countries.MCO" },
      { value: "MNG", key: "countries.MNG" },
      { value: "MNE", key: "countries.MNE" },
      { value: "MAR", key: "countries.MAR" },
      { value: "MOZ", key: "countries.MOZ" },
      { value: "MMR", key: "countries.MMR" },
      { value: "NAM", key: "countries.NAM" },
      { value: "NRU", key: "countries.NRU" },
      { value: "NPL", key: "countries.NPL" },
      { value: "NLD", key: "countries.NLD" },
      { value: "NZL", key: "countries.NZL" },
      { value: "NIC", key: "countries.NIC" },
      { value: "NER", key: "countries.NER" },
      { value: "NGA", key: "countries.NGA" },
      { value: "PRK", key: "countries.PRK" },
      { value: "MKD", key: "countries.MKD" },
      { value: "NOR", key: "countries.NOR" },
      { value: "OMN", key: "countries.OMN" },
      { value: "PAK", key: "countries.PAK" },
      { value: "PLW", key: "countries.PLW" },
      { value: "PAN", key: "countries.PAN" },
      { value: "PNG", key: "countries.PNG" },
      { value: "PRY", key: "countries.PRY" },
      { value: "PER", key: "countries.PER" },
      { value: "PHL", key: "countries.PHL" },
      { value: "POL", key: "countries.POL" },
      { value: "PRT", key: "countries.PRT" },
      { value: "QAT", key: "countries.QAT" },
      { value: "ROU", key: "countries.ROU" },
      { value: "RUS", key: "countries.RUS" },
      { value: "RWA", key: "countries.RWA" },
      { value: "WSM", key: "countries.WSM" },
      { value: "SMR", key: "countries.SMR" },
      { value: "STP", key: "countries.STP" },
      { value: "SAU", key: "countries.SAU" },
      { value: "SEN", key: "countries.SEN" },
      { value: "SRB", key: "countries.SRB" },
      { value: "SYC", key: "countries.SYC" },
      { value: "SLE", key: "countries.SLE" },
      { value: "SGP", key: "countries.SGP" },
      { value: "SVK", key: "countries.SVK" },
      { value: "SVN", key: "countries.SVN" },
      { value: "SLB", key: "countries.SLB" },
      { value: "SOM", key: "countries.SOM" },
      { value: "ZAF", key: "countries.ZAF" },
      { value: "KOR", key: "countries.KOR" },
      { value: "SSD", key: "countries.SSD" },
      { value: "ESP", key: "countries.ESP" },
      { value: "LKA", key: "countries.LKA" },
      { value: "KNA", key: "countries.KNA" },
      { value: "LCA", key: "countries.LCA" },
      { value: "VCT", key: "countries.VCT" },
      { value: "SDN", key: "countries.SDN" },
      { value: "SUR", key: "countries.SUR" },
      { value: "SWE", key: "countries.SWE" },
      { value: "CHE", key: "countries.CHE" },
      { value: "SYR", key: "countries.SYR" },
      { value: "TJK", key: "countries.TJK" },
      { value: "TZA", key: "countries.TZA" },
      { value: "THA", key: "countries.THA" },
      { value: "TGO", key: "countries.TGO" },
      { value: "TON", key: "countries.TON" },
      { value: "TTO", key: "countries.TTO" },
      { value: "TUN", key: "countries.TUN" },
      { value: "TUR", key: "countries.TUR" },
      { value: "TKM", key: "countries.TKM" },
      { value: "TUV", key: "countries.TUV" },
      { value: "UGA", key: "countries.UGA" },
      { value: "UKR", key: "countries.UKR" },
      { value: "ARE", key: "countries.ARE" },
      { value: "USA", key: "countries.USA" },
      { value: "URY", key: "countries.URY" },
      { value: "UZB", key: "countries.UZB" },
      { value: "VUT", key: "countries.VUT" },
      { value: "VEN", key: "countries.VEN" },
      { value: "VNM", key: "countries.VNM" },
      { value: "YEM", key: "countries.YEM" },
      { value: "ZMB", key: "countries.ZMB" },
      { value: "ZWE", key: "countries.ZWE" }
    ],
    validate: ["required",
      {type: "equal", fn: (value) => !value.match(/Select/)}
    ]
  }
}



