@success @e2e

Feature: F2F Language Toggle

    Scenario: F2F Journey - Language Toggle Validation
        Given A UK Drivers Licence User is using the system
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
    
        When they enter the postcode "KW15 1DD" and click Continue
        And they see exactly 2 Post Office branches to choose from
        
        When the user clicks the Back button
        When they enter the postcode "IM1 1AD" and click Continue
        Then they should see the unrecoverable error page

