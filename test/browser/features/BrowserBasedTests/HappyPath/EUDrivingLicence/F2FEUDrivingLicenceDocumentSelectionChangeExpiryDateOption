@mock-api:f2f-f2f-success @success @browser
Feature: Change Document Expiry Presence option  - Happy Path

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

    Given the EU Driving Licence date entered is within accepted expiration window
    When the user clicks the continue button on the EU Driving Licence details page
    Then the user is routed from EU DL Details to the address check page

    Given the user selects Yes, it has my current address on it
    When the user clicks continue on the EU Driving Licence address check page
    Then they are routed to the country code selection screen

    Given the user selects a country from the drop down menu
    When the user clicks the continue button on the EU country code page
    Then the user is routed from EU DL country code to Branch Finder Screen

    Given the postcode entered is valid
    When the user clicks the continue button on the find Post Office branch page
    Then the user is routed to the Select Location page showing 5 nearest POs

    Given a Post Office branch is selected
    When the user clicks continue
    Then the user is navigated to the next step in the journey - Confirm Answer

    Scenario: User change the selectionson the EEA identity expiry date page
    Given the user has navigated to the Check My Answers Page
    And Does your photo ID have an expiry date option is displayed as Yes
    And Expiry date is displayed
    And the user clicks the EUDLHASSExpiryDate Change button
    And the user is routed to the EU DL edit Has Expiry Entry Screen

    When the user selects no on the eu driving licence expiry date page
    Then the user has navigated to the Check My Answers Page
    And Does your photo ID have an expiry date option is displayed as No
    And Expiry date is not displayed
    And the user clicks the EUDLHASSExpiryDate Change button
    And the user is routed to the EU DL edit Has Expiry Entry Screen
    
    When the user selects yes on the eu driving licence expiry date page
    Then the user has navigated to the Check My Answers Page
    And Does your photo ID have an expiry date option is displayed as Yes
    And Expiry date is displayed