@mock-api:f2f-f2f-success @success @browser
Feature: Biometric Residence Permit Re-enter Date In Error Screen - Unhappy Path

    Background:
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the BRP option is selected
        When the user clicks the BRP continue button
        Then the user is routed to the next screen in the journey BRP Expiry Date

        Given the date entered is before the accepted BRP expiration window
        When the user clicks the continue button on the BRPPast page
        Then the user is routed to the Expired Date Error Screen from the BRP Page

    Scenario: BRP re-enter ID expiry date details (UnHappy path)
        Given the ReEnterBRPDetails option is selected
        When the user clicks BRP Expired Date Error Screen continue button
        Then the user is routed back to the BRP Expiry Date screen