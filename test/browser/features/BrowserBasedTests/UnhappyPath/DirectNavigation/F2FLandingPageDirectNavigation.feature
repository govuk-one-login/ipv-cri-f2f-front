@browser
Feature: Directly navigating Landing page in journey- unhappy path

    Scenario: Direct Navigation to LandingPage
        Given the user navigates directly to prove-identity-post-office page
        Then the user sees an error message displayed on the prove-identity-post-office page