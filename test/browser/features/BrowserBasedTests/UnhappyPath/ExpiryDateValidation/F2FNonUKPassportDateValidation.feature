@mock-api:f2f-f2f-success @success @browser
Feature: Non UK Passport Expiry Date Validation - Unhappy Path

    Background:
        Given A UK Drivers Licence User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the Other passport option is selected
        When the user clicks the continue button with Non UK passport selected
        Then the user is routed to the next screen - Non-UKPassportHasExpiryDate

        When the user selects yes on the passport expiry date page
        Then the user is routed to the next screen - OtherPassport Details

    
    Scenario: Non UK Passport expired date in the past (UnHappy path)
        Given the date entered is before the accepted Non UK Passport expiration window
        When the user clicks the continue button on the Non UK Passport Past page
        Then the user is routed to the Expired Date Error Screen from the Non UK passport screen


    Scenario: Non UK Passport expired date in the future (UnHappy path)
        Given the date entered is beyond the accepted Non UK Passport expiration window
        When the user clicks the continue button on the Non UK Passport Future page
        Then the user sees an inline error message displayed on the Non UK Passport Page