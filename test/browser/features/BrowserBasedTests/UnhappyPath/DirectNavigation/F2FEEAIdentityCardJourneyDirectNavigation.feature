@browser @QualityGateIntegrationTest @QualityGateRegressionTest
Feature: Directly navigating EEA Identity Card pages in journey- unhappy path

    Scenario: Direct Navigation to EEAIdentityCardHasExpiry
        Given the user navigates directly to national-identity-card-expiry-date page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to EEAIdentityCardCountrySelector
        Given the user navigates directly to select-country-national-identity-card page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to EEAIdentityCardAddress
        Given the user navigates directly to national-identity-card-current-address page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to EEAIdentityCardDetailsInvalidPast
        Given the user navigates directly to national-identity-card-expire-invalidpast page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to EEAIdentityCardInvalidFuture
        Given the user navigates directly to national-identity-card-expire-invalidfuture page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to EEAIdentityCardValid
        Given the user navigates directly to national-identity-card-expire page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to EEAIdentityCardAddressCheckEdit
        Given the user navigates directly to eu-driving-licence-current-address-edit page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to EEAIdentityCardCountrySelectorEdit
        Given the user navigates directly to euDrivingLicenceCountrySelector-edit page
        Then they should see the unrecoverable error page