@mock-api:f2f-f2f-success @success @browser @QualityGateIntegrationTest @QualityGateRegressionTest
Feature: Enter EU Driving Licence Details  - Unhappy Path

Background:
    Given A UK Drivers Licence User is using the system
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
 
    Given the EU Driving Licence date entered is within accepted expiration window
    When the user clicks the continue button on the EU Driving Licence details page
    Then the user is routed from EU DL Details to the address check page


    Scenario: User cannot progress without selecting an option
        Given no option has been chosen on the EU DL Address Check screen
        When the user clicks continue on the EU Driving Licence address check page
        Then the user sees an inline error message displayed on the EU DL address check page