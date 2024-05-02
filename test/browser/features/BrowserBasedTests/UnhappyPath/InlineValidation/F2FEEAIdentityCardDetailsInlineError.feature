@mock-api:f2f-f2f-success @success @ukPass @browser
Feature: Enter National Identity Card EEA Details  - Unhappy Path

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

Scenario: - Missing input value
Given the user clicks the continue button only on the EEAPage
Then the user sees an inline error message displayed on the EEAPage
