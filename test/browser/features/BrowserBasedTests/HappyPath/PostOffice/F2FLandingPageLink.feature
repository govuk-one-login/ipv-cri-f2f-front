@mock-api:f2f-f2f-success @success @browser
Feature: Happy path

 E2E journey for Face-to-Face path Landing Page start

  Background:
    Given Authenticatable Anita is using the system
    When they have provided their details
    Then they should be redirected to the Landing Page


  Scenario: Continue button redirect successful
    Given the user wants to view their nearest post office that offers ID verification
    When the user clicks on the hyperlink
    Then they are redirected to the PO's own branch checking page
