@browser @QualityGateIntegrationTest @QualityGateRegressionTest
Feature: Directly navigating photoID page in journey- unhappy path

    Scenario: Direct Navigation to photoIDExpiryPage
        Given the user navigates directly to photoID- expiry page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to photoIDSelectionPage
        Given the user navigates directly to photoID- selection page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to photoIDSelectionEditPage
        Given the user navigates directly to photoID- selection- edit page
        Then they should see the unrecoverable error page