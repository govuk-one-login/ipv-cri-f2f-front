@mock-api:f2f-f2f-success @success @browser
Feature: Non UK Passport E2E Journey. No expiry date and an email only Post Office letter

    Background:
        Given A Non UK Passport User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the Other passport option is selected
        When the user clicks the continue button with Non UK passport selected
        Then the user is routed to the next screen - Non-UKPassportHasExpiryDate

        When the user selects no on the passport expiry date page
        Then the user is routed to the Country of Issue Selector screen

        Given the user is on the Country Code Selection screen
        When the user selects a country
        Then they are routed to the NonUKPassport Branch Finder screen

        Given the postcode entered is valid
        When the user clicks the continue button on the find Post Office branch page
        Then the user is routed to the Select Location page showing 5 nearest POs


    Scenario: Non UK Passport E2E Journey. No expiry date and an email only Post Office letter
        Given a Post Office branch is selected
        When the user clicks continue
        When the user selects an Email only Post Office Letter
        Then the user is navigated to the next step in the journey - Confirm Answer
