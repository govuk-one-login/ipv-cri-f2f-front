@mock-api:f2f-f2f-success @success
Feature: Enter NonUK Passport Details  - Happy Path

    Background:
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the Other passport option is selected
        When the user clicks the continue button with Non UK passport selected
        Then the user is routed to the next screen - OtherPassport Details

        Given the date entered is within accepted Non UK expiration window
        When the user clicks the continue button on the Non UK passport page
        Then the user is routed to the Country of Issue Selector screen
@test
    Scenario: NonUK passport not expired (Happy path)
        Given the user is on the Country Code Selection screen
        When the user clicks continue without selecting a country
        Then an inline error message is displayed