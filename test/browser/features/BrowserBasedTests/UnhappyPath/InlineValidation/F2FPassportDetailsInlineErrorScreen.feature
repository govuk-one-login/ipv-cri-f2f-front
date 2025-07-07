@mock-api:f2f-f2f-success @success @browser
Feature: Enter UK Passport Details  - Happy Path

Background:
    Given A UK Drivers Licence User is using the system
    When they have provided their details
    Then they should be redirected to the Landing Page

    Given the user wants to progress to the next step of the journey
    When the user clicks the continue button on the Landing Page
    Then the user is routed to the next screen in the journey PhotoId Selection

    Given the UK passport option is selected
    When the user clicks the PhotoId continue button
    Then the user is routed to the next screen in the journey Passport Details

Scenario: UK passport not expired 
    Given the user clicks the continue button only on the UKPassportPage
    Then the user sees an inline error message displayed
