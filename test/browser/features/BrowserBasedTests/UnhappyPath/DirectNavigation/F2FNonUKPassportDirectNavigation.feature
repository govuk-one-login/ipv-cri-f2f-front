@browser
Feature: Directly navigating Non- UK passport pages in journey- unhappy path

    Scenario: Direct Navigation to nonUKPassportCountrySelector
        Given the user navigates directly to select-country-non-uk-passport page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to nonUKPassportDetailsPageInvalidPast
        Given the user navigates directly to non-uk-passport-expire-invalidpast page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to nonUKPassportDetailsPageInvalidFuture
        Given the user navigates directly to non-uk-passport-expire-invalidfuture page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to nonUKPassportDetailsValid
        Given the user navigates directly to non-uk-passport-expire page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to nonUKPassportDetailsValidEdit
        Given the user navigates directly to non-uk-passport-expire-edit page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to nonUKPassportHasExpiry
        Given the user navigates directly to non-uk-passport-expiry-date page
        Then they should see the unrecoverable error page