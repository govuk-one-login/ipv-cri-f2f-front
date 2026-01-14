@mock-api:f2f-f2f-success @success @browser
Feature: National Identity Card EEA change address check - Unhappy Path

Background:
    Given A UK Drivers Licence User is using the system
    When they have provided their details
    Then they should be redirected to the Landing Page

    Given the user wants to progress to the next step of the journey
    When the user clicks the continue button on the Landing Page
    Then the user is routed to the next screen in the journey PhotoId Selection

    Given the EEA National Identity Card option is selected
    When the user clicks the PhotoId continue button with EEA National Identity Card selected
    Then the user is routed to the EEA Has Expiry Entry Screen

    When the user selects yes on the EEA identity expiry date page
    Then the user is routed to the next screen in the EEA National Identity journey - EEA National Identity Card details

    Given the date entered is within accepted National Identity Card EEA expiration window
    When the user clicks the continue button on the National Identity Card EEA Page
    Then the user is routed from NI Card EEA Details to the address check page

    Given the user selects Yes, it has my current address on it for EEA ID
    When the user clicks continue on the EEA Identity Card address check page
    Then they are routed to the EEA ID country code selection screen

    Given the user is on the NI Card EEA Country Code Selection screen
    When the user selects an EEA country code
    Then the user is routed from NI Card EEA Country to Branch Finder Screen

    Given the postcode entered is valid
    When the user clicks the continue button on the find Post Office branch page
    Then the user is routed to the Select Location page showing 5 nearest POs

    Given a Post Office branch is selected
    When the user clicks continue
    When the user selects an Email only Post Office Letter
    Then the user is navigated to the next step in the journey - Confirm Answer

    Scenario: NIC EEA Successful redirect from CMA screen back to address check then back to CMA screen
        Given the user has navigated to the Check My Answers Page
        When the user clicks the Address Check Change button
        Then the user is navigated back to the Address Check Page
        Then the user changes the address selection to "My identity card does not have my address on it"
        Then the user continues to the CMA page from the Address Check page

    Scenario: NIC EEA Successful redirect from CMA screen back to country of issue then back to CMA screen
        Given the user has navigated to the Check My Answers Page
        When the user clicks the Country Change button
        Then the user is navigated back to the Country Selector Page
        Then the user changes the country of issue
        Then the user continues to the CMA page from the Country Selector page