@browser
Feature: Directly navigating EU Driving Licence pages in journey- unhappy path

    Scenario: Direct Navigation to EUDrivingLicenceAddressPage
        Given the user navigates directly to eu-driving-licence-current-address page
        Then the user sees an error message displayed on the eu-driving-licence-current-address page

    Scenario: Direct Navigatißon to EUDrivingLicenceCountrySelectPage
        Given the user navigates directly to select-country-eu-driving-licence page
        Then the user sees an error message displayed on the select-country-eu-driving-licence page

    Scenario: Direct Navigation to EUDrivingLicenceDetailsInvalidPast
        Given the user navigates directly to eu-driving-licence-expire-invalidpast page
        Then the user sees an error message displayed on the eu-driving-licence-expire-invalidpast page

    Scenario: Direct Navigation to EUDrivingLicenceDetailsInvalidFuture
        Given the user navigates directly to eu-driving-licence-expire-invalidfuture page
        Then the user sees an error message displayed on the eu-driving-licence-expire-invalidfuture page

    Scenario: Direct Navigation to EUDrivingLicenceDetailsValid
        Given the user navigates directly to eu-driving-licence-expire page
        Then the user sees an error message displayed on the eu-driving-licence-expire page

    Scenario: Direct Navigation to EUDrivingLicenceDetailsValidEdit
        Given the user navigates directly to eu-driving-licence-expire-edit page
        Then the user sees an error message displayed on the eu-driving-licence-expire-edit page

    Scenario: Direct Navigation to EUDrivingLicenceHasExpiry
        Given the user navigates directly to eu-driving-licence-has-expiry-date page
        Then the user sees an error message displayed on the eu-driving-licence-has-expiry-date page