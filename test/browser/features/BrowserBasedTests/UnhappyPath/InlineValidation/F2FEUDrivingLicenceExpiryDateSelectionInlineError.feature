@mock-api:f2f-f2f-success @success @browser

Feature: EU Driving Licence  - Expiry Selection Inline Validation

    Background:
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the EU driving licence option is selected
        When the user clicks the EU driving licence button
        Then the user is routed to the EU DL Has Expiry Entry Screen

    Scenario: EU Driving Licence- Does your driving licence have an expiry date - Non Selection
        When the user clicks the continue button only on the EuDrivingLicenceHasExpiryDatePage
        Then the user sees an inline error message displayed on the EuDrivingLicenceHasExpiryDatePage
 