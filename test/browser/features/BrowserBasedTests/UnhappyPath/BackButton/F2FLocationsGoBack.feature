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
        Then they should be redirected to the Find a Branch page

        Given the postcode entered is valid
        When the user clicks the continue button on the find Post Office branch page
        Then the user is routed to the Select Location page showing 5 nearest POs

  Scenario: Successful redirect from CMA screen back to PO Finder then back to CMA screen
    Given the user is on the Locations Page and wants to change their postcode
    When the user clicks the Back button
    Then the user is navigated back to the Find Branch page
 
