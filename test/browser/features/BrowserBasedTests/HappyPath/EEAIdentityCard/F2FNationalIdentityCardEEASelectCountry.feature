@mock-api:f2f-f2f-success @success @ukPass
Feature: Enter UK Passport Details  - Happy Path

Background:
    Given Authenticatable Anita is using the system
    When they have provided their details
    Then they should be redirected to the Landing Page

    Given the user wants to progress to the next step of the journey
    When the user clicks the continue button on the Landing Page
    Then the user is routed to the next screen in the journey PhotoId Selection

    Given the EEA National Identity Card option is selected
    When the user clicks the PhotoId continue button with EEA National Identity Card selected
    Then the user is routed to the next screen in the EEA National Identity journey - EEA National Identity Card details

    Given the date entered is within accepted National Identity Card EEA expiration window
    When the user clicks the continue button on the National Identity Card EEA Page
    Then the user is routed from NI Card EEA Details to the Country Code selector page

Scenario: National Identity Card EEA not expired (Happy path)
    Given the user is on the NI Card EEA Country Code Selection screen
    When the user selects an EEA country code
    Then the user is routed from NI Card EEA Country to Branch Finder Screen