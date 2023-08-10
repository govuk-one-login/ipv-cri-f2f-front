@browser
Feature: Directly navigating Non- UK passport pages in journey- unhappy path

    Scenario: Direct Navigation to nonUKPassportCountrySelector
        Given the user navigates directly to select-country-non-uk-passport page
        Then the user sees an error message displayed on the select-country-non-uk-passport page

    Scenario: Direct Navigation to nonUKPassportDetailsPageInvalidPast
        Given the user navigates directly to non-uk-passport-expire-invalidpast page
        Then the user sees an error message displayed on the non-uk-passport-expire-invalidpast page

    Scenario: Direct Navigation to nonUKPassportDetailsPageInvalidFuture
        Given the user navigates directly to non-uk-passport-expire-invalidfuture page
        Then the user sees an error message displayed on the non-uk-passport-expire-invalidfuture page

    Scenario: Direct Navigation to nonUKPassportDetailsValid
        Given the user navigates directly to non-uk-passport-expire page
        Then the user sees an error message displayed on the non-uk-passport-expire page

    Scenario: Direct Navigation to nonUKPassportDetailsValidEdit
        Given the user navigates directly to non-uk-passport-expire-edit page
        Then the user sees an error message displayed on the non-uk-passport-expire-edit page

    Scenario: Direct Navigation to nonUKPassportHasExpiry
        Given the user navigates directly to non-uk-passport-has-expiry-date page
        Then the user sees an error message displayed on the non-uk-passport-has-expiry-date page