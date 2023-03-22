@mock-api:f2f-f2f-success
Feature: Find Post Office Branch - Unhappy Path

    Background:
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the landingPage

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the LandingPage
        Then the user is routed to the next screen in the journey - Find Branch


    Scenario: Invalid address entered (Happy path)
        Given the postcode entered is invalid
        When the user clicks the continue button on the find Post Office branch invalid page
        Then they are shown an on screen error informing them to enter a valid postcode