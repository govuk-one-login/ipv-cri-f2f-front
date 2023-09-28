@mock-api:f2f-f2f-success @browser
Feature: Find Post Office Branch - Unhappy Path

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

    Scenario: Invalid address entered (Unhappy path)
        Given the postcode entry box is left empty
        When the user clicks the continue button on the find Post Office branch empty page
        Then they are shown an on-screen error asking them to enter a valid postcode

    Scenario: Invalid address entered (Happy path)
        Given the postcode entered is invalid
        When the user clicks the continue button on the find Post Office branch invalid page
        Then they are shown an on screen error asking them to enter a valid postcode

    Scenario: Invalid address entered (Happy path)
         Given a partial postcode is entered
         When the user clicks the continue button on the find Post Office branch partial page
         Then they are then shown an on screen error asking them to enter a valid postcode