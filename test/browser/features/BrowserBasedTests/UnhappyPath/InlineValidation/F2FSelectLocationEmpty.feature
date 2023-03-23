@mock-api:f2f-f2f-success
Feature: Select Post Office Branch - Happy Path

    Background:
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the Find a Branch page

        Given the postcode entered is valid
        When the user clicks the continue button on the find Post Office branch page
        Then the user is routed to the next screen in the journey - Select Location
    
    @test
    Scenario:
        Given no Post Office branch is selected
        When the user clicks Continue
        Then they are shown an on screen error asking them to select a branch