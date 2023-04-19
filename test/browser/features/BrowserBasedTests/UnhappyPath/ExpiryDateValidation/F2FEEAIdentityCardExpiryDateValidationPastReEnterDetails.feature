@mock-api:f2f-f2f-success @success
Feature: Expired Date Error Screen - Unhappy Path

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

        Given the date entered is before the accepted National Identity Card EEA expiration window
        When the user clicks the continue button on the National Identity Card EEA Past details Page
        Then the user is routed to the Expired Date Error Screen from the National Identity Card EEA Screen

    Scenario: User chooses to re-enter ID expiry date details (UnHappy path)
        Given the ReEnterEEAIDDetails option is selected
        When the user clicks Expired Date Error Screen continue button
        Then the user is routed back to the EEAID Expiry Date screen