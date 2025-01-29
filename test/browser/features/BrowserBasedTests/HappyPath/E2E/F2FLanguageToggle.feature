@success @e2e

Feature: F2F Language Toggle

    Scenario: F2F Journey - Language Toggle Validation
        Given A UK Drivers Licence User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page
        And the language toggle is present on the screen

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection
        And the language toggle is present on the screen

        Given the UK passport option is selected
        When the user clicks the PhotoId continue button
        Then the user is routed to the next screen in the journey Passport Details
        And the language toggle is present on the screen

        Given the date entered is within accepted UK Passport expiration window
        When the user clicks the continue button on the UKPassportPage
        Then the user is routed to the next screen in the journey Branch Finder Screen
        And the language toggle is present on the screen
        Then the user enters a valid postcode

        Given the postcode entered is valid
        When the user clicks the continue button on the find Post Office branch page
        Then the user is routed to the Select Location page showing 5 nearest POs
        And the language toggle is present on the screen

        Given a Post Office branch is selected
        When the user clicks continue
        When the user selects an Email only Post Office Letter
        Then the user is navigated to the next step in the journey - Confirm Answer
        And the language toggle is present on the screen
        When the user clicks the Check My Answers Submit button


    Scenario: HTML Tag and Hyperlink updated when Language is changed
        Given A UK Drivers Licence User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page
        And the language toggle is present on the screen
        When the user switches language to "Cymraeg"
        Then The HTML Language Attribute is set to "cy"
        And the language toggle updates the "Cymraeg" hyperlink
        When the user switches language to "English"
        Then The HTML Language Attribute is set to "en"
        And the language toggle updates the "English" hyperlink

