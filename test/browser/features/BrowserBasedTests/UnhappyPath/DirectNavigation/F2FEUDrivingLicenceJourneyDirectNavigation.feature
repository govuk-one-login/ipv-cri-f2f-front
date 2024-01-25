@browser
Feature: Directly navigating EU Driving Licence pages in journey- unhappy path

    Scenario: Direct Navigation to EUDrivingLicenceAddressPage
        Given the user navigates directly to eu-driving-licence-current-address page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigatißon to EUDrivingLicenceCountrySelectPage
        Given the user navigates directly to select-country-eu-driving-licence page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to EUDrivingLicenceDetailsInvalidPast
        Given the user navigates directly to eu-driving-licence-expire-invalidpast page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to EUDrivingLicenceDetailsInvalidFuture
        Given the user navigates directly to eu-driving-licence-expire-invalidfuture page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to EUDrivingLicenceDetailsValid
        Given the user navigates directly to eu-driving-licence-expire page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to EUDrivingLicenceDetailsValidEdit
        Given the user navigates directly to eu-driving-licence-expire-edit page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to EUDrivingLicenceHasExpiry
        Given the user navigates directly to eu-driving-licence-expiry-date page
        Then they should see the unrecoverable error page