@mock-api:f2f-f2f-success
Feature: Find Post Office Branch - Happy Path

    Background:
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the Find a Branch page


    Scenario: Valid address entered (Happy path)
        Given the postcode entered is valid
        When the user clicks the continue button on the find Post Office branch page
        Then the user is routed to the next screen in the journey - Select Location
        