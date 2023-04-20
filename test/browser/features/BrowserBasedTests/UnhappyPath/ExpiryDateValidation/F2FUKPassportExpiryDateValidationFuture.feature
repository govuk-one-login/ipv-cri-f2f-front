@mock-api:f2f-f2f-success @success
Feature: Enter UK Passport - Happy Path

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
    

    Scenario: UK Passport expired (UnHappy path)
        Given the date entered is more than 10 years from today
        When the user clicks the continue button on the UK Passport page
        Then the user sees an inline error message displayed on the UK Passport Page