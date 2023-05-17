@mock-api:f2f-f2f-success @success
Feature: EU Driving Licence Select Country - Happy Path

    Background:
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the EU driving licence option is selected
        When the user clicks the EU driving licence button
        Then the user is routed to the EU DL Expiry Entry Screen

        Given the EU Driving Licence date entered is within accepted expiration window
        When the user clicks the continue button on the EU Driving Licence details page
        Then the user is routed from EU DL Details to the Country Code selector page

    Scenario: EU Driving Licence - Select a Country Code (Happy path)
        Given the user is on the EU Country Code Selection screen
        When the user selects an EU country code
        Then the user is routed from EU DL Details to Branch Finder Screen