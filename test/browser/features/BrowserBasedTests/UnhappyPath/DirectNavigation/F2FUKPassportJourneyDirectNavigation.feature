@browser @QualityGateIntegrationTest @QualityGateRegressionTest
Feature: Directly navigating UK passport pages in journey- unhappy path

    Scenario: Direct Navigation to UKPassportExpiryPage
        Given the user navigates directly to uk-passport-expire page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to UKPassportDetailsPageInvalidPast
        Given the user navigates directly to uk-passport-expire-invalidpast page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to nonUKPassportDetailsPageInvalidFuture
        Given the user navigates directly to uk-passport-expire-invalidfuture page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to UKPassportDetailsValidEdit
        Given the user navigates directly to uk-passport-expire-edit page
        Then they should see the unrecoverable error page
