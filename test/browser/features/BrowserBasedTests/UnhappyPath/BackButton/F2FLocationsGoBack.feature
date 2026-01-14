@mock-api:f2f-f2f-success @browser
Feature: Change Postcode - Unhappy Path

  Background:
    Given A UK Drivers Licence User is using the system
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


  Scenario: Successful redirect from CMA screen back to PO Finder then back to CMA screen
    Given the user is on the Locations Page and wants to change their postcode
    When the user clicks the Back button
    Then the user is navigated back to the Find Branch page

