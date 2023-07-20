@mock-api:f2f-f2f-success @success @browser @test
Feature: Build Document Selection Screen

  Background:
    Given Authenticatable Anita is using the system
    When they have provided their details
    Then they should be redirected to the Landing Page

    Given the user wants to progress to the next step of the journey
    When the user clicks the continue button on the Landing Page
    Then the user is routed to the next screen in the journey PhotoId Selection

  Scenario: Successful redirect on EU driving licence selection with an expiry date (Happy path)
    Given the EU driving licence option is selected
    When the user clicks the EU driving licence button
    Then the user is routed to the EU DL Has Expiry Entry Screen
    
    When the user selects yes on the eu driving licence expiry date page
    Then the user is routed to the EU DL Expiry Entry Screen

  Scenario: Successful redirect on EU driving licence selection without an expiry date (Happy path)
    Given the EU driving licence option is selected
    When the user clicks the EU driving licence button
    Then the user is routed to the EU DL Has Expiry Entry Screen
    When the user selects no on the eu driving licence expiry date page
    Then the user is routed from EU DL Details to the address check page
