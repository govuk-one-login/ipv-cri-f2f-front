@mock-api:f2f-f2f-success @success @browser

Feature: Enter NonUK Passport Details  - Expiry Selection Inline Validation

    Background:
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the Other passport option is selected
        When the user clicks the continue button with Non UK passport selected
        Then the user is routed to the next screen - Non-UKPassportHasExpiryDate

    Scenario: NonUK passport- Does your passport have an expiry date - Non Selection
        Given the user clicks the continue button only on the NonUkPassportHasExpiryDatePage
        Then the user sees an inline error message displayed on the NonUkPassportHasExpiryDatePage