@mock-api:f2f-f2f-success @success
Feature: Enter UK driving licence   - Happy Path

    Background:
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the UK photocard driving licence option is selected
        When the user clicks the UK DL continue button
        Then the user is routed to the next screen in the journey UKPhotoDL Expiry Date


    Scenario: UK driving licence expired (UnHappy path)
        Given the date entered is before the accepted UKPhotoDLExpiry expiration window
        When the user clicks the continue button on the UKPhotoDLExpiryPast Page
        Then the user is routed to the Expired Date Error Screen from the UK DL screen