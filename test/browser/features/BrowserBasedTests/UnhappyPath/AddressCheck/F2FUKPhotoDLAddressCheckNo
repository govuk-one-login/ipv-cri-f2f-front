@mock-api:f2f-f2f-success @success @browser
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

        Given the date entered is within accepted UKPhotoDL expiration window
        When the user clicks the continue button on the UKPhotoDL Page
        Then the user is successfully routed to the UK DL Address Check screen
      
    Scenario: User routed to Document Selection screen when “No” selected
        Given the user has selected the 'No' option
        When the Continue button is clicked on the UKPhotoDL Address page
        Then the user is routed back to the previous screen - Document Selection