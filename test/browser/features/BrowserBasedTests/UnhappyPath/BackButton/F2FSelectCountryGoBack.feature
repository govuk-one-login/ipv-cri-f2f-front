@mock-api:f2f-f2f-success
Feature: Navigate Back from Find Branch screen - Unhappy Path

    Background:
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the Other passport option is selected
        When the user clicks the continue button with Non UK passport selected
        Then the user is routed to the next screen - OtherPassport Details

        Given the date entered is within accepted UKPhotoDL expiration window
        When the user clicks the continue button on the UKPhotoDL Page
        Then they should be redirected to the Find a Branch page

  Scenario: Successful redirect from Find Branch screen back to the PhotoId Expiry Detail Screen
    Given the postcode entered is valid
    When the user clicks the FindBranch Back button
    Then the user clicks the back button on the UKPhotoDL Page
 
