@browser
Feature: Directly navigating checkDetails page in journey- unhappy path

    Scenario: Direct Navigation to CheckDetailsPage
        Given the user navigates directly to check-details page
        Then they should see the unrecoverable error page
