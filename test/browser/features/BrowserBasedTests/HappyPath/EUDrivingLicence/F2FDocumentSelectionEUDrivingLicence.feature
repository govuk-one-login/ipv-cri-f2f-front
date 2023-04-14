@mock-api:f2f-f2f-success @success
Feature: Build Document Selection Screen

  Background:
    Given Authenticatable Anita is using the system
    When they have provided their details
    Then they should be redirected to the Landing Page

    Given the user wants to progress to the next step of the journey
    When the user clicks the continue button on the Landing Page
    Then the user is routed to the next screen in the journey PhotoId Selection

  Scenario: Successful redirect on EU driving licence selection (Happy path)
    Given the EU driving licence option is selected
    When the user clicks the EU driving licence button
    Then the user is routed to the EU DL Expiry Entry Screen
