@mock-api:f2f-f2f-success @success @browser @language-choice-feature
@QualityGateNewFeatureTest
Feature: Post Office Customer Letter Language Choice

    Background:
        Given A UK Passport User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page
        When featureSet "letterLanguageChoice" is set new functionality is enabled

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the UK passport option is selected
        When the user clicks the PhotoId continue button
        Then the user is routed to the next screen in the journey Passport Details

        Given the date entered is in the future
        When the user clicks the continue button on the UKPassportPage
        Then the user is routed to the next screen in the journey Branch Finder Screen
        Then the user enters a valid postcode

        Given the postcode entered is valid
        When the user clicks the continue button on the find Post Office branch page
        Then the user is routed to the Select Location page showing 5 nearest POs

        Given a Post Office branch is selected
        When the user clicks continue
        When the user selects an Email and Post Office Letter
        Then the user is on the language selection page


    Scenario: Language choice - English language selected
        When the user selects English language
        When the user selects that they want to send the letter to the original address
        Then the user is navigated to the next step in the journey - Confirm Answer

    Scenario: Language choice - Welsh language selected
        When the user selects Welsh language
        When the user selects that they want to send the letter to the original address
        Then the user is navigated to the next step in the journey - Confirm Answer

    Scenario: Language choice - Both languages selected
        When the user selects Both English and Welsh languages
        When the user selects that they want to send the letter to the original address
        Then the user is navigated to the next step in the journey - Confirm Answer