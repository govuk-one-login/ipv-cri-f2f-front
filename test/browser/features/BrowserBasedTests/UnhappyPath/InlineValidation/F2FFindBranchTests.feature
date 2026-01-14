@mock-api:f2f-f2f-success @browser @QualityGateIntegrationTest @QualityGateRegressionTest   
Feature: Find Post Office Branch - Unhappy Path

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

        Given the date entered is within accepted UKPhotoDL expiration window
        When the user clicks the continue button on the UKPhotoDL Page
        Then the user is successfully routed to the UK DL Address Check screen

        Given the user has selected the 'Yes' option
        When the Continue button is clicked on the UK Photo DL Address page
        Given the user is routed to the next screen in the UKPhotoDL journey - Branch Finder

    Scenario: Invalid address entered (Unhappy path)
        Given the postcode entry box is left empty
        When the user clicks the continue button on the find Post Office branch empty page
        Then they are shown an on-screen error asking them to enter a valid postcode

    Scenario: Invalid address entered 
        Given the postcode entered is invalid
        When the user clicks the continue button on the find Post Office branch invalid page
        Then they are shown an on screen error asking them to enter a valid postcode

    Scenario: Invalid address entered 
         Given a partial postcode is entered
         When the user clicks the continue button on the find Post Office branch partial page
         Then they are then shown an on screen error asking them to enter a valid postcode
