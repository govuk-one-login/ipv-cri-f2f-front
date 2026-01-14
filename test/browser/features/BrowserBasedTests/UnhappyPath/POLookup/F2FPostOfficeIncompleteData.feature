@mock-api:f2f-f2f-success @browser @QualityGateIntegrationTest @QualityGateRegressionTest
Feature: Handle Incomplete Data from Post Office API

    Scenario: User is successfully shown an error page when PO API returns incomplete data
        Given A UK Passport User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the UK passport option is selected
        When the user clicks the PhotoId continue button
        Then the user is routed to the next screen in the journey Passport Details

        Given the date entered is in the future
        When the user clicks the continue button on the UKPassportPage
        Then the user is routed to the next screen in the journey Branch Finder Screen
        When the user enters a postcode that returns incomplete data
        And the user clicks the continue button on the find Post Office branch page
        Then they should see the IPV Core error page
