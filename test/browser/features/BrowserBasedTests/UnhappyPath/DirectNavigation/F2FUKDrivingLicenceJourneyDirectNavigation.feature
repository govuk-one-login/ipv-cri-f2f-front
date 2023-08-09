@browser
Feature: Directly navigating UK Driving Licence pages in journey- unhappy path

    Scenario: Direct Navigation to UKDrivingLicenceExpiryPage
        Given the user navigates directly to uk-driving-licence-expire page
        Then the user sees an error message displayed on the uk-driving-licence-expire page

    Scenario: Direct Navigation to UKDrivingLicenceExpiryPageInvalidPast
        Given the user navigates directly to uk-driving-licence-expire-invalidpast page
        Then the user sees an error message displayed on the uk-driving-licence-expire-invalidpast page

    Scenario: Direct Navigation to UKDrivingLicenceExpiryPageInvalidFuture
        Given the user navigates directly to uk-driving-licence-expire-invalidfuture page
        Then the user sees an error message displayed on the uk-driving-licence-expire-invalidfuture page

    Scenario: Direct Navigation to UKDrivingLicenceAddress
        Given the user navigates directly to uk-driving-licence-current-address page
        Then the user sees an error message displayed on the uk-driving-licence-current-address page
