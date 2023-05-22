@mock-api:f2f-f2f-success @success @ukPass
Feature: Enter National Identity Card EEA Details  - Unhappy Path

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
    Then the user is routed from NI Card EEA Details to the address check page

    @test
    Scenario: User cannot progress without selecting an option
        Given no option has been chosen on the National Identity Card EEA Address Check screen
        When the user clicks the continue button on the National Identity Card EEA Page
        Then the user sees an inline error message displayed on the National Identity Card EEA address check page
