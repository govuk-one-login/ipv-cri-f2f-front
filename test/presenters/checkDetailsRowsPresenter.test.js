const { expect } = require("chai");

const { buildCheckDetailsRows } = require("../../src/presenters/checkDetailsRowsPresenter");
const { APP } = require("../../src/lib/config");

const makeReq = (sessionValues = {}) => ({
  sessionModel: { get: (k) => sessionValues[k] },
});

const makeRes = () => ({
  locals: { translate: (k) => k },
});

const localsBase = () => ({
  idTranslatedString: "UK passport",
  formattedExpiryDate: "1 January 2030",
  hasExpiryDateTranslatedString: "Yes",
  countryTranslatedString: "France",
  pdfPreferenceText: "By email only",
  postOfficeName: "PO Name",
  postOfficeAddress: ["L1", "L2", "L3", "L4"],
  changeUrl: "/uk-passport-expire",
  addressLine: "123 Example St",
  addressCheckTranslatedString: "Yes",
  showLetterLanguagePreferenceRow: false,
  letterLanguagePreferenceText: undefined,
});

describe("checkDetailsRowsPresenter", () => {
  it("email journey does not include postal address row", () => {
    const req = makeReq({
      photoIdChoice: APP.PHOTO_ID_OPTIONS.UK_PASSPORT,
      postOfficeCustomerLetterChoice: APP.POST_OFFICE_CUSTOMER_LETTER.EMAIL,
      idHasExpiryDate: undefined,
    });

    const rows = buildCheckDetailsRows(req, makeRes(), localsBase());
    const keys = rows.map((r) => r.key.text);

    expect(keys).to.include("checkDetails.selectedId");
    expect(keys).to.include("checkDetails.postOffice");
    expect(keys).to.include("checkDetails.pdfPreference");
    expect(keys).to.not.include("checkDetails.pdfChosenAddress");
  });

  it("post journey includes postal address row", () => {
    const req = makeReq({
      photoIdChoice: APP.PHOTO_ID_OPTIONS.UK_PASSPORT,
      postOfficeCustomerLetterChoice: APP.POST_OFFICE_CUSTOMER_LETTER.POST,
      idHasExpiryDate: undefined,
    });

    const rows = buildCheckDetailsRows(req, makeRes(), localsBase());
    const addrRow = rows.find((r) => r.key.text === "checkDetails.pdfChosenAddress");

    expect(addrRow).to.exist;
    expect(addrRow.actions.items[0].href).to.equal(
      `${APP.PATHS.CHECK_ADDRESS}/edit?edit=true`
    );
  });

  it("shows language preference row when gated on", () => {
    const req = makeReq({
      photoIdChoice: APP.PHOTO_ID_OPTIONS.UK_PASSPORT,
      postOfficeCustomerLetterChoice: APP.POST_OFFICE_CUSTOMER_LETTER.POST,
      idHasExpiryDate: undefined,
    });

    const locals = localsBase();
    locals.showLetterLanguagePreferenceRow = true;
    locals.letterLanguagePreferenceText = "English";

    const rows = buildCheckDetailsRows(req, makeRes(), locals);
    const langRow = rows.find((r) => r.key.text === "checkDetails.letterLanguagePreference");

    expect(langRow).to.exist;
    expect(langRow.value.text).to.equal("English");
    expect(langRow.actions.items[0].href).to.equal(
      `${APP.PATHS.POST_OFFICE_CUSTOMER_LETTER_CHOOSE_LANGUAGE}/edit?edit=true`
    );
  });

  it("EU driving licence includes address-on-ID row and correct change link", () => {
    const req = makeReq({
      photoIdChoice: APP.PHOTO_ID_OPTIONS.EU_PHOTOCARD_DL,
      postOfficeCustomerLetterChoice: APP.POST_OFFICE_CUSTOMER_LETTER.EMAIL,
      idHasExpiryDate: APP.HAS_EXPIRY_DATE.YES,
    });

    const rows = buildCheckDetailsRows(req, makeRes(), localsBase());
    const row = rows.find((r) => r.key.text === "checkDetails.euDlAddress");

    expect(row).to.exist;
    expect(row.actions.items[0].href).to.equal(
      `${APP.PATHS.EU_DRIVING_LICENCE_ADDRESS_CHECK}/edit?edit=true`
    );
  });

  it("non-UK passport with no expiry date omits expiry date row", () => {
    const req = makeReq({
      photoIdChoice: APP.PHOTO_ID_OPTIONS.NON_UK_PASSPORT,
      postOfficeCustomerLetterChoice: APP.POST_OFFICE_CUSTOMER_LETTER.EMAIL,
      idHasExpiryDate: APP.HAS_EXPIRY_DATE.NO,
    });

    const rows = buildCheckDetailsRows(req, makeRes(), localsBase());
    const keys = rows.map((r) => r.key.text);

    expect(keys).to.not.include("checkDetails.expiryDate");
    expect(keys).to.include("checkDetails.hasExpiryDate");
  });
});