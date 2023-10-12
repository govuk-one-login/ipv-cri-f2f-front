@browser
Feature: Directly navigating Landing page in journey- unhappy path

    Scenario: Direct Navigation to LandingPage
        Given the user navigates directly to prove-identity-post-office page
        Then they should see the unrecoverable error page