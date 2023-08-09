@browser
Feature: Directly navigating findBranch page in journey- unhappy path

Scenario: Direct Navigation to findBranchPage
Given the user navigates directly to find-branch page
Then the user sees an error message displayed on the find-branch page

Scenario: Direct Navigation to findBranchEmptyPage
Given the user navigates directly to find-branch-empty page
Then the user sees an error message displayed on the find-branch-empty page

Scenario: Direct Navigation to findBranchInvalidPage
Given the user navigates directly to find-branch-invalid page
Then the user sees an error message displayed on the find-branch-invalid page

Scenario: Direct Navigation to findBranchValidPage
Given the user navigates directly to find-branch-valid page
Then the user sees an error message displayed on the find-branch-valid page

Scenario: Direct Navigation to findBranchValidEditPage
Given the user navigates directly to find-branch-valid-edit page
Then the user sees an error message displayed on the find-branch-valid-edit page