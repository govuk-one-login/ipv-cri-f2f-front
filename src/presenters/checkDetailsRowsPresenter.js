const { APP } = require("../lib/config");

const editHref = (path) => `${path}/edit?edit=true`;

const rowsIf = (condition, rowFactory) => (condition ? [rowFactory()] : []);

const summaryRow = (translate, { keyTextKey, value, href, hiddenTextKey }) => ({
  key: { text: translate(keyTextKey) },
  value,
  actions: {
    items: [
      {
        href: editHref(href),
        text: translate("checkDetails.changeLink"),
        visuallyHiddenText: translate(hiddenTextKey ?? keyTextKey),
      },
    ],
  },
});

const addressCheckConfig = (photoIdChoice) => {
  switch (photoIdChoice) {
    case APP.PHOTO_ID_OPTIONS.UK_PHOTOCARD_DL:
      return {
        labelKey: "checkDetails.ukDlAddress",
        href: APP.PATHS.UK_PHOTOCARD_DL_ADDRESS_CHECK,
      };
    case APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL:
      return {
        labelKey: "checkDetails.euDlAddress",
        href: APP.PATHS.EU_DRIVING_LICENCE_ADDRESS_CHECK,
      };
    case APP.PHOTO_ID_OPTIONS.EEA_IDENTITY_CARD:
      return {
        labelKey: "checkDetails.idCardAddress",
        href: APP.PATHS.EEA_IDENTITY_CARD_ADDRESS_CHECK,
      };
    default:
      return null;
  }
};

const hasExpiryConfig = (photoIdChoice) => {
  switch (photoIdChoice) {
    case APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT:
      return APP.PATHS.NON_UK_PASSPORT_HAS_EXPIRY_DATE;
    case APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL:
      return APP.PATHS.EU_DRIVING_LICENCE_HAS_EXPIRY_DATE;
    case APP.PHOTO_ID_OPTIONS.EEA_IDENTITY_CARD:
      return APP.PATHS.NATIONAL_IDENTITY_CARD_HAS_EXPIRY_DATE;
    default:
      return null;
  }
};

const countryConfig = (photoIdChoice) => {
  switch (photoIdChoice) {
    case APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT:
      return APP.PATHS.NON_UK_PASSPORT_COUNTRY_SELECTOR;
    case APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL:
      return APP.PATHS.EU_DRIVING_LICENCE_COUNTRY_SELECTOR;
    case APP.PHOTO_ID_OPTIONS.EEA_IDENTITY_CARD:
      return APP.PATHS.EEA_IDENTITY_CARD_COUNTRY_SELECTOR;
    default:
      return null;
  }
};

function buildCheckDetailsRows(req, res, locals) {
  const translate = res.locals.translate;

  const photoIdChoice = req.sessionModel.get("photoIdChoice");
  const postChoice = req.sessionModel.get("postOfficeCustomerLetterChoice"); // "email" | "post"
  const hasExpiryDate = req.sessionModel.get("idHasExpiryDate"); // "yes" | "no" | undefined

  const addrCfg = addressCheckConfig(photoIdChoice);
  const hasExpiryHref = hasExpiryConfig(photoIdChoice);
  const countryHref = countryConfig(photoIdChoice);

  const postOfficeHtml = `${locals.postOfficeName}<br>${locals.postOfficeAddress[0]}<br>${locals.postOfficeAddress[1]}<br>${locals.postOfficeAddress[2]}<br>${locals.postOfficeAddress[3]}`;

  return [
    summaryRow(translate, {
      keyTextKey: "checkDetails.selectedId",
      value: { html: locals.idTranslatedString },
      href: APP.PATHS.PHOTO_ID_SELECTION,
    }),

    // Address-on-ID question (UK DL / EU DL / EEA ID only)
    ...rowsIf(!!addrCfg && !!locals.addressCheckTranslatedString, () =>
      summaryRow(translate, {
        keyTextKey: addrCfg.labelKey,
        value: { html: locals.addressCheckTranslatedString },
        href: addrCfg.href,
      })
    ),

    // "Has expiry date?" question (non-UK passport / EU DL / EEA ID only)
    ...rowsIf(!!hasExpiryHref, () =>
      summaryRow(translate, {
        keyTextKey: "checkDetails.hasExpiryDate",
        value: { html: locals.hasExpiryDateTranslatedString },
        href: hasExpiryHref,
      })
    ),

    // Expiry date row (not shown when user said document has no expiry date)
    ...rowsIf(
      !!locals.formattedExpiryDate && hasExpiryDate !== APP.HAS_EXPIRY_DATE.NO,
      () =>
        summaryRow(translate, {
          keyTextKey: "checkDetails.expiryDate",
          value: { html: locals.formattedExpiryDate },
          href: locals.changeUrl,
        })
    ),

    // Country row (non-UK passport / EU DL / EEA ID only)
    ...rowsIf(!!countryHref && !!locals.countryTranslatedString, () =>
      summaryRow(translate, {
        keyTextKey: "checkDetails.country",
        value: { html: locals.countryTranslatedString },
        href: countryHref,
      })
    ),

    // Always show chosen Post Office
    summaryRow(translate, {
      keyTextKey: "checkDetails.postOffice",
      value: { html: postOfficeHtml },
      href: APP.PATHS.FIND_POST_OFFICE,
    }),

    // Always show customer letter delivery choice (email only vs email+post)
    summaryRow(translate, {
      keyTextKey: "checkDetails.pdfPreference",
      value: { html: locals.pdfPreferenceText },
      href: APP.PATHS.POST_OFFICE_CUSTOMER_LETTER,
    }),

    // PCL language preference row (only when feature enabled + asserted)
    ...rowsIf(!!locals.showLetterLanguagePreferenceRow, () =>
      summaryRow(translate, {
        keyTextKey: "checkDetails.letterLanguagePreference",
        value: { text: locals.letterLanguagePreferenceText },
        href: APP.PATHS.POST_OFFICE_CUSTOMER_LETTER_CHOOSE_LANGUAGE,
      })
    ),

    // Postal address row (post journeys only)
    ...rowsIf(
      postChoice === APP.POST_OFFICE_CUSTOMER_LETTER.POST && !!locals.addressLine,
      () =>
        summaryRow(translate, {
          keyTextKey: "checkDetails.pdfChosenAddress",
          value: { html: locals.addressLine },
          href: APP.PATHS.CHECK_ADDRESS,
        })
    ),
  ];
}

module.exports = { buildCheckDetailsRows };