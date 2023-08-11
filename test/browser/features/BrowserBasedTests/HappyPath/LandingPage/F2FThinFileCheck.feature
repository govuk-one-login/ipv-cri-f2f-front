@mock-api:f2f-f2f-success @success @browser
Feature: Thin File Routing Validation

    Scenario: Validate a user with a strength score of 3 is shown the thin file identity options
        Given Anitia is using the system as a thin file user
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey choose-photo-id-post-office-biometric
        Then the page only shows thin file idetity options