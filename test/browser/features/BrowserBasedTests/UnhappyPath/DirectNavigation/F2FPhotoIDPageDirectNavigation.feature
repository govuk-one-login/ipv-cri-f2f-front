Feature: Directly navigating photoID page in journey- unhappy path

Scenario: Direct Navigation to photoIDExpiryPage
Given the user navigates directly to photoID- expiry page
Then the user sees an error message displayed on the photoID- expiry page

Scenario: Direct Navigation to photoIDSelectionPage
Given the user navigates directly to photoID- selection page
Then the user sees an error message displayed on the photoID- selection page

Scenario: Direct Navigation to photoIDSelectionEditPage
Given the user navigates directly to photoID- selection- edit page
Then the user sees an error message displayed on the photoID- selection- edit page