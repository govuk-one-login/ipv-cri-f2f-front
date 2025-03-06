@mock-api:f2f-f2f-success @browser
Feature: Change Postcode - Unhappy Path

    Background:
        Given A UK Drivers Licence User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page
        And the user should see they have 15 days to visit the Post Office

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the UK photocard driving licence option is selected
        When the user clicks the UK DL continue button
        Then the user is routed to the next screen in the journey UKPhotoDL Expiry Date

        Given the date entered is within accepted UKPhotoDL expiration window
        When the user clicks the continue button on the UKPhotoDL Page
        Then the user is successfully routed to the UK DL Address Check screen

        Given the user has selected the 'Yes' option
        When the Continue button is clicked on the UK Photo DL Address page
        Given the user is routed to the next screen in the UKPhotoDL journey - Branch Finder

        Given the postcode entered is valid
        When the user clicks the continue button on the find Post Office branch page
        Then the user is routed to the Select Location page showing 5 nearest POs

        Given a Post Office branch is selected
        When the user clicks continue
        When the user selects an Email only Post Office Letter
        Then the user is navigated to the next step in the journey - Confirm Answer

    Scenario: Successful redirect from CMA screen back to PO Finder then back to CMA screen
        Given the user has navigated to the Check My Answers Page
        When the user clicks the PO Location Change button
        Then the user is navigated back to the FindBranchEdit page
        Then the user changes the Post Code and is navigated back to the list of nearest POs
        Then the user selects a record and continues to the CMA page
