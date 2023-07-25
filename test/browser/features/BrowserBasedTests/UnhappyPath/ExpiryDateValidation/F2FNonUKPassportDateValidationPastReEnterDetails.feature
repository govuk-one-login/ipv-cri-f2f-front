@mock-api:f2f-f2f-success @success @browser
Feature: Expired Date Error Screen - Unhappy Path

    Background:
        Given Authenticatable Anita is using the system
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

        Given the date entered is before the accepted Non UK Passport expiration window
        When the user clicks the continue button on the Non UK Passport Past page
        Then the user is routed to the Expired Date Error Screen from the Non UK passport screen

    Scenario: User chooses to re-enter ID expiry date details (UnHappy path)
        Given the ReEnterNonUKPassportDetails option is selected
        When the user clicks NonUKPassport Expired Date Error Screen continue button
        Then the user is routed back to the Non UK passport Expiry Date screen