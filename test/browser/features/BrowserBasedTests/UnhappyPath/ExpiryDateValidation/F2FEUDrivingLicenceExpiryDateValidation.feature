@mock-api:f2f-f2f-success @success @browser @QualityGateIntegrationTest @QualityGateRegressionTest
Feature: European Union Driving Licence Expiry Date Validation - Unhappy Path

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

    
    Scenario: EUDL expired date in the past (UnHappy path)
        Given the date entered is before the accepted EU driving licence expiration window
        When the user clicks the continue button on the EU Driving Licence Past page
        Then the user is routed to the Expired Date Error Screen from the EU Driving Licence screen


    Scenario: EUDL expired date in the future (UnHappy path)
        Given the date entered is beyond the accepted EU driving licence expiration window
        When the user clicks the continue button on the EU driving licence Future page
        Then the user sees an inline error message displayed on the EU DL Page    
        