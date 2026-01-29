@mock-api:f2f-f2f-success @success @browser @QualityGateIntegrationTest @QualityGateRegressionTest
Feature: Navigate to Post Office Website - Happy Path

 E2E journey for Face-to-Face path Landing Page start

  Background:
    Given A UK Drivers Licence User is using the system
    When they have provided their details
    Then they should be redirected to the Landing Page


  Scenario: Click on Post Office URL
    Given the user wants to view their nearest post office that offers ID verification
    When the user clicks on the hyperlink
    Then they are redirected to the PO's own branch checking page
