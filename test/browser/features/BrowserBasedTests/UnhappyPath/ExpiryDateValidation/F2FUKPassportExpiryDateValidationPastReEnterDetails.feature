@mock-api:f2f-f2f-success @success @browser
Feature: UK Passport Re-enter Date In Error Screen - Unhappy Path

    Background:
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the UK passport option is selected
        When the user clicks the PhotoId continue button
        Then the user is routed to the next screen in the journey Passport Details

        Given the date entered is more than 18 months in the past
        When the user clicks the continue button on the UK passport page
        Then the user is routed to the Expired Date Error Screen from the UK passport screen

    Scenario: UK Passport re-enter ID expiry date details (UnHappy path)
        Given the ReEnterUKPassportDetails option is selected
        When the user clicks Expired Date Error Screen continue button
        Then the user is routed back to the UK passport Expiry Date screen