@browser @QualityGateIntegrationTest @QualityGateRegressionTest
Feature: Directly navigating findBranch page in journey- unhappy path

    Scenario: Direct Navigation to findBranchPage
        Given the user navigates directly to find-branch page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to findBranchEmptyPage
        Given the user navigates directly to find-branch-empty page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to findBranchInvalidPage
        Given the user navigates directly to find-branch-invalid page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to findBranchValidPage
        Given the user navigates directly to find-branch-valid page
        Then they should see the unrecoverable error page

    Scenario: Direct Navigation to findBranchValidEditPage
        Given the user navigates directly to find-branch-valid-edit page
        Then they should see the unrecoverable error page