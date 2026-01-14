@mock-api:f2f-f2f-success @success @browser
Feature: National Identity Card EEA E2E Journey. No expiry date, ID address that matches the user's current address and a posted Post Office letter to a different address 

    Background:
        Given An EEA Identity Card User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the EEA National Identity Card option is selected
        When the user clicks the PhotoId continue button with EEA National Identity Card selected
        Then the user is routed to the EEA Has Expiry Entry Screen

        When the user selects no on the EEA identity expiry date page
        Then the user is routed from NI Card EEA Details to the address check page

        Given the user selects Yes, it has my current address on it for EEA ID
        When the user clicks continue on the EEA Identity Card address check page
        Then they are routed to the EEA ID country code selection screen

        Given the user is on the NI Card EEA Country Code Selection screen
        When the user selects an EEA country code
        Then the user is routed from NI Card EEA Country to Branch Finder Screen

        Given the postcode entered is valid
        When the user clicks the continue button on the find Post Office branch page
        Then the user is routed to the Select Location page showing 5 nearest POs

    Scenario: National Identity Card EEA E2E Journey. No expiry date, ID address that matches the user's current address and a posted Post Office letter to a different address 
        Given a Post Office branch is selected
        When the user clicks continue
        When the user selects an Email and Post Office Letter
        When the user selects that they want to send the letter to a different address
        When the user enters the postcode for the different address
        And the user selects an address from the dropdown list
        Then the user is navigated to the next step in the journey - Confirm Answer