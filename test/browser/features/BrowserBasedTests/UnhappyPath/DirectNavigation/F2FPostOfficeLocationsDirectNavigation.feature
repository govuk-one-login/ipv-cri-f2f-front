@browser
Feature: Directly navigating postOfficeLocations page in journey- unhappy path

    Scenario: Direct Navigation to postOfficeLocationsPage
        Given the user navigates directly to choose-post-office page
        Then they should see the unrecoverable error page