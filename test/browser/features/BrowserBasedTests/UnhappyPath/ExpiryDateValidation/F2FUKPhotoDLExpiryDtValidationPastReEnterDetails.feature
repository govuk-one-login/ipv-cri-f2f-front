@mock-api:f2f-f2f-success @success @browser @QualityGateIntegrationTest @QualityGateRegressionTest
Feature: UK Photo DL Re-enter Date In Error Screen - Unhappy Path

    Background:
        Given A UK Drivers Licence User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the UK photocard driving licence option is selected
        When the user clicks the UK DL continue button
        Then the user is routed to the next screen in the journey UKPhotoDL Expiry Date

        Given the date entered is before the accepted UKPhotoDLExpiry expiration window
        When the user clicks the continue button on the UKPhotoDLExpiryPast Page
        Then the user is routed to the Expired Date Error Screen from the UK DL screen

    Scenario: UK Photo DL User chooses to re-enter ID expiry date details (UnHappy path)
        Given the ReEnterUKPhotoDLDetails option is selected
        When the user clicks Expired Date Error Screen continue button
        Then the user is routed back to the UKPhotoDL Expiry Date screen

    Scenario: UK Photo DL User chooses to use a different ID (UnHappy path)
        Given the ChooseDifferentPhotoId option is selected
        When the user clicks the Expired Date Error Screen continue button
        Then the user is routed back to the PhotoId Selection screen    