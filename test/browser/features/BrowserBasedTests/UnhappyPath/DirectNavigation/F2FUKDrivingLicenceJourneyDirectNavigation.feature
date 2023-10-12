@browser
Feature: Directly navigating UK Driving Licence pages in journey- unhappy path

    Scenario: Direct Navigation to UKDrivingLicenceExpiryPage
        Given the user navigates directly to uk-driving-licence-expire page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to UKDrivingLicenceExpiryPageInvalidPast
        Given the user navigates directly to uk-driving-licence-expire-invalidpast page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to UKDrivingLicenceExpiryPageInvalidFuture
        Given the user navigates directly to uk-driving-licence-expire-invalidfuture page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to UKDrivingLicenceAddress
        Given the user navigates directly to uk-driving-licence-current-address page
        Then they should see the unrecoverable error page
