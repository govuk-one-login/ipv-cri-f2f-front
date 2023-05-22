@mock-api:f2f-f2f-success
Feature: Change Postcode - Unhappy Path

  Background:
    Given Authenticatable Anita is using the system
    When they have provided their details
    Then they should be redirected to the Landing Page

    Given the user wants to progress to the next step of the journey
    When the user clicks the continue button on the Landing Page
    Then the user is routed to the next screen in the journey PhotoId Selection

    Given the UK photocard driving licence option is selected
    When the user clicks the UK DL continue button
    Then the user is routed to the next screen in the journey UKPhotoDL Expiry Date

    Given the date entered is within accepted UKPhotoDL expiration window
    When the user clicks the continue button on the UKPhotoDL Page
    Then the user is successfully routed to the UK DL Address Check screen

    Given the user has selected the 'Yes' option
    When the Continue button is clicked on the UK Photo DL Address page
    Then the user is routed to the next screen in the UKPhotoDL journey - Branch Finder

    Given the postcode entered is valid
    When the user clicks the continue button on the find Post Office branch page
    Then the user is routed to the Select Location page showing 5 nearest POs

    Given a Post Office branch is selected
    When the user clicks continue
    Then the user is navigated to the next step in the journey - Confirm Answer

  Scenario: Successful redirect from CMA screen back to PO Finder screen
    Given the user has navigated to the Check My Answers Page
    When the user clicks the CMA Back button
    Then the user is navigated back to the PO Locations page

