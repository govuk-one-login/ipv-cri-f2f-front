@mock-api:f2f-cic-success @success
Feature: Enter UK Passport Details  - Happy Path

    Background:
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the Other passport option is selected
        When the user clicks the continue button with Non UK passport selected
        Then the user is routed to the next screen - OtherPassport Details

    
    Scenario: Non UK Passport expired (UnHappy path)
        Given the date entered is before the accepted Non UK Passport expiration window
        When the user clicks the continue button on the Non UK Passport Past page
        Then the user is routed to the Expired Date Error Screen from the Non UK passport screen