@browser
Feature: Directly navigating BRP pages in journey- unhappy path

Scenario: Direct Navigation to BRPDetailsPageInvalidFuture
Given the user navigates directly to brp-invalid-future-expiry page
Then the user sees an error message displayed on the brp-invalid-future-expiry page

Scenario: Direct Navigation to BRPDetailsPageInvalidPast
Given the user navigates directly to brp-invalid-past-expiry page
Then the user sees an error message displayed on the brp-invalid-past-expiry page

Scenario: Direct Navigation to BRPDetailsPageValid
Given the user navigates directly to brp-valid page
Then the user sees an error message displayed on the brp-valid page