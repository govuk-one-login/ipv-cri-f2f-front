@mock-api:f2f-f2f-success
Feature: Change Postcode - Unhappy Path

    Background:
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then they should be redirected to the Find a Branch page

        Given the postcode entered is valid
        When the user clicks the continue button on the find Post Office branch page
        Then the user is routed to the Select Location page showing 5 nearest POs
    
    
    Scenario:
        Given the user wants to change their postcode
        When the user clicks the Change button
        Then the user is navigated back to the Find Branch page
        Then the user enters another postcode and is navigated back to the list of nearest POs
        