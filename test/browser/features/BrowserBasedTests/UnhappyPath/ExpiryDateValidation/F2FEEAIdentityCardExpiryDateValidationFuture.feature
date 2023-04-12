@mock-api:f2f-f2f-success @success
Feature: Enter National Identity Card from an EEA country - Happy Path

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

    
    Scenario: National Identity Card from an EEA country expired (UnHappy path)
        Given the date entered is beyond the accepted National Identity Card EEA expiration window
        When the user clicks the continue button on the National Identity Card EEA Future details Page
        Then the user sees an inline error on the National Identity Card EEA Screen