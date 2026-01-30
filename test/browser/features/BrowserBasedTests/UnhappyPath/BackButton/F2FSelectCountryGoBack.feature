@mock-api:f2f-f2f-success @browser @QualityGateIntegrationTest @QualityGateRegressionTest
Feature: Navigate Back from Find Branch screen - Unhappy Path

    Background:
        Given A UK Drivers Licence User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the Other passport option is selected
        When the user clicks the continue button with Non UK passport selected
        Then the user is routed to the next screen - Non-UKPassportHasExpiryDate

        When the user selects yes on the passport expiry date page
        Then the user is routed to the next screen - OtherPassport Details

        Given the date entered is within accepted Non UK expiration window
        When the user clicks the continue button on the Non UK passport page
        Then the user is routed to the Country of Issue Selector screen 

  Scenario: Successful redirect from Country selection screen back to the PhotoId Expiry Detail Screen
    Given the user is on the Country Code Selection screen
    When the Back link is clicked on the NonUKPassport Country selection page
    Then the user is navigated back to the previous screen - the Photo ID Expiry page
 
