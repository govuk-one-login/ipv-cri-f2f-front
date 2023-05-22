@mock-api:f2f-f2f-success
Feature: Navigate Back from Find Branch screen - Unhappy Path

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

  Scenario: Successful redirect from Find Branch screen back to the Address Check Screen
    Given the postcode entered is valid
    When the user clicks the FindBranch Back button
    Then the user is navigated back to the UK DL Address Check screen

