@mock-api:f2f-f2f-success @success @browser
Feature: NonUK Passport Find Nearest PO Branch - Happy Path

Background:
    Given Authenticatable Anita is using the system
    When they have provided their details
    Then they should be redirected to the Landing Page

    Given the user wants to progress to the next step of the journey
    When the user clicks the continue button on the Landing Page
    Then the user is routed to the next screen in the journey PhotoId Selection

    Given the Other passport option is selected
    When the user clicks the continue button with Non UK passport selected
    Then the user is routed to the next screen - OtherPassport Details

    Given the date entered is within accepted Non UK expiration window
    When the user clicks the continue button on the Non UK passport page
    Then the user is routed to the Country of Issue Selector screen

    Given the user is on the Country Code Selection screen
    When the user selects a country
    Then they are routed to the NonUKPassport Branch Finder screen


Scenario: Find Nearest PO Branch - NonUK Passport (Happy path)
    Given the postcode entered is valid
    When the user clicks the continue button on the find Post Office branch page
    Then the user is routed to the Select Location page showing 5 nearest POs