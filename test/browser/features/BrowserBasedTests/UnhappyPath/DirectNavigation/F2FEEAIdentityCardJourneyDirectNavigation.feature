@test
Feature: Directly navigating EEA Identity Card pages in journey- unhappy path

Scenario: Direct Navigation to EEAIdentityCardHasExpiry
Given the user navigates directly to national-identity-card-has-expiry-date page
Then the user sees an error message displayed on the national-identity-card-has-expiry-date page

Scenario: Direct Navigation to EEAIdentityCardCountrySelector
Given the user navigates directly to select-country-national-identity-card page
Then the user sees an error message displayed on the select-country-national-identity-card page

Scenario: Direct Navigation to EEAIdentityCardAddress
Given the user navigates directly to national-identity-card-current-address page
Then the user sees an error message displayed on the national-identity-card-current-address page

Scenario: Direct Navigation to EEAIdentityCardDetailsInvalidPast
Given the user navigates directly to national-identity-card-expire-invalidpast page
Then the user sees an error message displayed on the national-identity-card-expire-invalidpast page

Scenario: Direct Navigation to EEAIdentityCardInvalidFuture
Given the user navigates directly to national-identity-card-expire-invalidfuture page
Then the user sees an error message displayed on the national-identity-card-expire-invalidfuture page

Scenario: Direct Navigation to EEAIdentityCardValid
Given the user navigates directly to national-identity-card-expire page
Then the user sees an error message displayed on the national-identity-card-expire page

Scenario: Direct Navigation to EEAIdentityCardAddressCheckEdit
Given the user navigates directly to eu-driving-licence-current-address-edit page
Then the user sees an error message displayed on the eu-driving-licence-current-address-edit page

Scenario: Direct Navigation to EEAIdentityCardCountrySelectorEdit
Given the user navigates directly to euDrivingLicenceCountrySelector-edit page
Then the user sees an error message displayed on the euDrivingLicenceCountrySelector-edit page