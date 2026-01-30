@mock-api:f2f-f2f-success @success @ukPass @browser @QualityGateIntegrationTest @QualityGateRegressionTest
Feature:  Navigate Back from PhotoID Expiry Details screen - Unhappy Path

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

    When the user selects yes on the EEA identity expiry date page
    Then the user is routed to the next screen in the EEA National Identity journey - EEA National Identity Card details

Scenario:  Successful redirect from the PhotoId Expiry screen to the Document Selectipn screen
Given the date entered is within accepted National Identity Card EEA expiration window
When the user clicks the Back button on the National Identity Card EEA Page
Then the user is routed to the EEA Has Expiry Entry Screen