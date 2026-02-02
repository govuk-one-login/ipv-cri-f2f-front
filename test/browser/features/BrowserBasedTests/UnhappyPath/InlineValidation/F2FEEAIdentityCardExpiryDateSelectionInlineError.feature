@mock-api:f2f-f2f-success @success @browser @QualityGateIntegrationTest @QualityGateRegressionTest
Feature: EEAIdentityCard Page - Expiry Selection Inline Validation

    Background:
        Given A UK Drivers Licence User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the EEA National Identity Card option is selected
        When the user clicks the PhotoId continue button with EEA National Identity Card selected
        Then the user is routed to the EEA Has Expiry Entry Screen

    Scenario: EEAIdentityCard - Does your national identity card have an expiry date - Non Selection
        Given the user clicks the continue button only on the EEAIdentityCardHasExpiryDatePage
        Then the user sees an inline error message displayed on the EEAIdentityCardHasExpiryDatePage
 