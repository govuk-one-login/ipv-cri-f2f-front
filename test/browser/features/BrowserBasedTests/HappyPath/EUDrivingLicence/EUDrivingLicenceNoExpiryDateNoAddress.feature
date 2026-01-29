@mock-api:f2f-f2f-success @success @browser @QualityGateIntegrationTest @QualityGateRegressionTest
Feature: EU Driving Licence E2E Journey. No expiry date,no address on ID and an email only Post Office letter 

    Background:
        Given An EU Drivers Licence User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the EU driving licence option is selected
        When the user clicks the EU driving licence button
        Then the user is routed to the EU DL Has Expiry Entry Screen

        When the user selects no on the eu driving licence expiry date page
        Then the user is routed from EU DL Details to the address check page

        Given the user selects My driving licence does not have my address on it
        When the user clicks continue on the EU Driving Licence address check page
        Then they are routed to the country code selection screen

        Given the user selects a country from the drop down menu
        When the user clicks the continue button on the EU country code page
        Then the user is routed from EU DL country code to Branch Finder Screen

        Given the postcode entered is valid
        When the user clicks the continue button on the find Post Office branch page
        Then the user is routed to the Select Location page showing 5 nearest POs

    Scenario: EU Driving Licence E2E Journey. No expiry date,no address on ID and an email only Post Office letter 
        Given a Post Office branch is selected
        When the user clicks continue
        When the user selects an Email only Post Office Letter
        Then the user is navigated to the next step in the journey - Confirm Answer