@browserSS
Feature: Directly navigating BRP pages in journey- unhappy path

    Scenario: Direct Navigation to BRPDetailsPageInvalidFuture
        Given the user navigates directly to brp-invalid-future-expiry page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to BRPDetailsPageInvalidPast
        Given the user navigates directly to brp-invalid-past-expiry page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to BRPDetailsPageValid
        Given the user navigates directly to brp-valid page
        Then they should see the unrecoverable error page