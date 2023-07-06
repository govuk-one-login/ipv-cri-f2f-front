@mock-api:f2f-f2f-success @success @browser
Feature: Enter EU Driving Licence Details  - Unhappy Path

Background:
    Given Authenticatable Anita is using the system
    When they have provided their details
    Then they should be redirected to the Landing Page

    Given the user wants to progress to the next step of the journey
    When the user clicks the continue button on the Landing Page
    Then the user is routed to the next screen in the journey PhotoId Selection

    Given the EU driving licence option is selected
    When the user clicks the EU driving licence button
    Then the user is routed to the EU DL Expiry Entry Screen
 
    Given the EU Driving Licence date entered is within accepted expiration window
    When the user clicks the continue button on the EU Driving Licence details page
    Then the user is routed from EU DL Details to the address check page


    Scenario: User clicks back button on EU DL Address Check page
        Given the user is on the EU DL address check page
        When they click the EU DL address check back button
        Then they are routed back to the EU DL expiry date page