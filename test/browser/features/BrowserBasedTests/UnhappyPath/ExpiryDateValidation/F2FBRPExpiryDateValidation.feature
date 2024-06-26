@mock-api:f2f-f2f-success @success @browser
Feature: BRP Expiry Date Validation - Unhappy Path

    Background:
        Given A UK Drivers Licence User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the BRP option is selected
        When the user clicks the BRP continue button
        Then the user is routed to the next screen in the journey BRP Expiry Date
    

    Scenario: BRP expired date in the past (UnHappy path)
        Given the date entered is before the accepted BRP expiration window
        When the user clicks the continue button on the BRPPast page
        Then the user is routed to the Expired Date Error Screen from the BRP Page


    Scenario: BRP expired date in the future (UnHappy path)
        Given the date entered is beyond the accepted BRP expiration window
        When the user clicks the continue button on the BRPFuture page
        Then the user sees an inline error message displayed on the BRP Page