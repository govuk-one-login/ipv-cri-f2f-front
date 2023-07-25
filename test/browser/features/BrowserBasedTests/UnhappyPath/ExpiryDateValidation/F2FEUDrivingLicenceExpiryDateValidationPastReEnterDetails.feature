@mock-api:f2f-f2f-success @success @browser
Feature: Expired Date Error Screen - Unhappy Path

    Background:
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the EU driving licence option is selected
        When the user clicks the EU driving licence button
        Then the user is routed to the EU DL Has Expiry Entry Screen
        
        When the user selects yes on the eu driving licence expiry date page
        Then the user is routed to the EU DL Expiry Entry Screen

        Given the date entered is before the accepted EU driving licence expiration window
        When the user clicks the continue button on the EU Driving Licence Past page
        Then the user is routed to the Expired Date Error Screen from the EU Driving Licence screen

    Scenario: User chooses to re-enter ID expiry date details (UnHappy path)
        Given the ReEnterEUDLDetails option is selected
        When the user clicks EUDL Expired Date Error Screen continue button
        Then the user is routed back to the EU Driving Licence Expiry Date screen