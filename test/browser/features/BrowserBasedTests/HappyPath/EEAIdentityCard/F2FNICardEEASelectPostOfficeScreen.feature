@mock-api:f2f-f2f-success @success
Feature: National Identity Card EEA Find Nearest PO Branch - Happy Path

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
    Then the user is routed to the next screen in the National Identity Card EEA journey - Find Branch
    Then the user enters a valid postcode

    Given the postcode entered is valid
    When the user clicks the continue button on the find Post Office branch page
    Then the user is routed to the Select Location page showing 5 nearest POs

Scenario: Find Nearest PO Branch - NI Card EEA (Happy path)
        Given a Post Office branch is selected
        When the user clicks continue
        Then the user is navigated to the next step in the journey - Confirm Answer