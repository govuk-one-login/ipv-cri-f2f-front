@mock-api:f2f-f2f-success @success @browser
Feature: Build Document Selection Screen

  Background:
    Given A UK Drivers Licence User is using the system
    When they have provided their details
    Then they should be redirected to the Landing Page

    Given the user wants to progress to the next step of the journey
    When the user clicks the continue button on the Landing Page
    Then the user is routed to the next screen in the journey PhotoId Selection

Scenario: Successful redirect from Document Selection screen back to Landing page
  Given the user has navigated to the Document Selection page
  When the Back link is clicked on the Document Selection page
  Then the user is navigated back to the previous screen - the Landing page
