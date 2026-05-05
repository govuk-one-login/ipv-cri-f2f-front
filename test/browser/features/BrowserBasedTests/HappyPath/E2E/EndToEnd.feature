@success @e2e @QualityGateIntegrationTest @QualityGateRegressionTest @QualityGateStackTest

Feature: F2F Journey - E2E

    Scenario: F2F Journey - E2E Happy Path (Email + Posted Letter Original Address) and DB Validation - UK Drivers Licence
        Given A UK Drivers Licence User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the UK photocard driving licence option is selected
        When the user clicks the UK DL continue button
        Then the user is routed to the next screen in the journey UKPhotoDL Expiry Date

        Given the date entered is within accepted UKPhotoDL expiration window
        When the user clicks the continue button on the UKPhotoDL Page
        Then the user is successfully routed to the UK DL Address Check screen

        Given the user has selected the 'Yes' option
        When the Continue button is clicked on the UK Photo DL Address page
        Then the user is routed to the next screen in the UKPhotoDL journey - Branch Finder

        Given the postcode entered is valid
        When the user clicks the continue button on the find Post Office branch page
        Then the user is routed to the Select Location page showing 5 nearest POs

        Given a Post Office branch is selected
        When the user clicks continue
        When the user selects an Email and Post Office Letter
        When the user selects that they want to send the letter to the original address
        Then the user is navigated to the next step in the journey - Confirm Answer
        When the user clicks the Check My Answers Submit button

        Given I have retrieved the sessionTable data for my F2F session using "authCode"
        Then the authSessionState is correctly recorded as "F2F_AUTH_CODE_ISSUED"
        When I sent the request to the callback endpoint
        Then the Verifiable Credential is stored as expected
        When I get 7 TxMA events from Test Harness
        Then the "F2F_CRI_START" event matches the "F2F_CRI_START_SCHEMA" Schema
        And the "F2F_YOTI_START" event matches the "F2F_YOTI_START_UK_DL" Schema
        And the "F2F_CRI_AUTH_CODE_ISSUED" event matches the "F2F_CRI_AUTH_CODE_ISSUED_SCHEMA" Schema
        And the "F2F_CRI_END" event matches the "F2F_CRI_END_SCHEMA" Schema
        And the "F2F_YOTI_PDF_EMAILED" event matches the "F2F_YOTI_PDF_EMAILED_SCHEMA" Schema
        And the "F2F_YOTI_RESPONSE_RECEIVED" event matches the "F2F_YOTI_RESPONSE_RECEIVED_SCHEMA" Schema
        And the "F2F_CRI_VC_ISSUED" event matches the "F2F_CRI_VC_ISSUED_SCHEMA_UK_DL" Schema