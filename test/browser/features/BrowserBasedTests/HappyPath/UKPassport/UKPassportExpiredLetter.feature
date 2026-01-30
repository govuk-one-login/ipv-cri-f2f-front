@mock-api:f2f-f2f-success @success @browser @QualityGateIntegrationTest @QualityGateRegressionTest
Feature: Expired within last 18 months UK Passport E2E Journey. Post Office letter to the same address 

    Background:
        Given A UK Passport User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the UK passport option is selected
        When the user clicks the PhotoId continue button
        Then the user is routed to the next screen in the journey Passport Details

        Given the date entered is within the last 18 months
        When the user clicks the continue button on the UKPassportPage
        Then the user is routed to the next screen in the journey Branch Finder Screen
        Then the user enters a valid postcode

        Given the postcode entered is valid
        When the user clicks the continue button on the find Post Office branch page
        Then the user is routed to the Select Location page showing 5 nearest POs

    Scenario: Expired within last 18 months UK Passport E2E Journey. Post Office letter to the same address 
        Given a Post Office branch is selected
        When the user clicks continue
        When the user selects an Email and Post Office Letter
        When the user selects that they want to send the letter to the original address
        Then the user is navigated to the next step in the journey - Confirm Answer