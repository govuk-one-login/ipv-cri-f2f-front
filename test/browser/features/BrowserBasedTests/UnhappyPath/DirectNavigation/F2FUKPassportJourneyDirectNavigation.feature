Feature: Directly navigating UK passport pages in journey- unhappy path

Scenario: Direct Navigation to UKPassportExpiryPage
Given the user navigates directly to uk-passport-expire page
Then the user sees an error message displayed on the uk-passport-expire page

Scenario: Direct Navigation to UKPassportDetailsPageInvalidPast
Given the user navigates directly to uk-passport-expire-invalidpast page
Then the user sees an error message displayed on the uk-passport-expire-invalidpast page

Scenario: Direct Navigation to nonUKPassportDetailsPageInvalidFuture
Given the user navigates directly to uk-passport-expire-invalidfuture page
Then the user sees an error message displayed on the uk-passport-expire-invalidfuture page

Scenario: Direct Navigation to UKPassportDetailsValidEdit
Given the user navigates directly to uk-passport-expire-edit page
Then the user sees an error message displayed on the uk-passport-expire-edit page
