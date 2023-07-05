@mock-api:f2f-f2f-success @success @browser
Feature: UK Passport Find Nearest PO Branch - Happy Path

Background:
    Given Authenticatable Anita is using the system
    When they have provided their details
    Then they should be redirected to the Landing Page

    Given the user wants to progress to the next step of the journey
    When the user clicks the continue button on the Landing Page
    Then the user is routed to the next screen in the journey PhotoId Selection

    Given the BRP option is selected
    When the user clicks the BRP continue button
    Then the user is routed to the next screen in the journey BRP Expiry Date

    Given the date entered is within accepted BRP expiration window
    When the user clicks the continue button on the BRP Page
    Then they should be redirected to the Find a Branch page

    Given the postcode entered is valid
    When the user clicks the continue button on the find Post Office branch page
    Then the user is routed to the Select Location page showing 5 nearest POs

Scenario: Find Nearest PO Branch - UK passport (Happy path)
        Given a Post Office branch is selected
        When the user clicks continue
        Then the user is navigated to the next step in the journey - Confirm Answer