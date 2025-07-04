@mock-api:f2f-f2f-success @success @browser
Feature: Change PhotoId - UnHappy Path


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

        When the user selects yes on the passport expiry date page
        Then the user is routed to the next screen - OtherPassport Details

        Given the date entered is within accepted Non UK expiration window
        When the user clicks the continue button on the Non UK passport page
        Then the user is routed to the Country of Issue Selector screen

        Given the user is on the Country Code Selection screen
        When the user selects a country
        Then they are routed to the NonUKPassport Branch Finder screen

        Given the postcode entered is valid
        When the user clicks the continue button on the find Post Office branch page
        Then the user is routed to the Select Location page showing 5 nearest POs

        Given a Post Office branch is selected
        When the user clicks continue
        When the user selects an Email only Post Office Letter
        Then the user is navigated to the next step in the journey - Confirm Answer

     Scenario: Successful redirect from CMA screen back to the Doc Selection screen and back to CMA again
        Given the user has navigated to the Check My Answers Page
        When the user clicks the PhotoIdChange button
        Then the user is navigated back to the PhotoIdSelection page
        Then the user selects a new PhotoId Document 
        Then the user is routed to the EU DL edit Has Expiry Entry Screen
        When the user selects yes on the eu driving licence expiry date page
        Then the user enters the PhotoId Expiry Date page 
        Then the user clicks continue on the PhotoId Expiry Date page
        Then the user is on the EU DL address check page editing
        When the user selects Yes, it has my current address on it
        Then the user clicks continue on the EU Driving Licence address check page
        Then they are routed to the edit country code selection screen
        Then the user selects a country from the drop down menu
        When the user clicks the continue button on the EU country code page
        Then the user is navigated to the next step in the journey - Confirm Answer