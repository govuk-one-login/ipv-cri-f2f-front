@success @e2e

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

    Scenario: F2F Journey - E2E Happy Path (Email + Posted Letter Different Address) and DB Validation UK Passport
        Given A UK Passport User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the UK passport option is selected
        When the user clicks the PhotoId continue button
        Then the user is routed to the next screen in the journey Passport Details

        Given the date entered is in the future
        When the user clicks the continue button on the UKPassportPage
        Then the user is routed to the next screen in the journey Branch Finder Screen
        Then the user enters a valid postcode

        Given the postcode entered is valid
        When the user clicks the continue button on the find Post Office branch page
        Then the user is routed to the Select Location page showing 5 nearest POs

        Given a Post Office branch is selected
        When the user clicks continue
        When the user selects an Email and Post Office Letter
        When the user selects that they want to send the letter to a different address
        When the user enters the postcode for the different address
        And the user selects an address from the dropdown list
        Then the user is navigated to the next step in the journey - Confirm Answer
        When the user clicks the Check My Answers Submit button

        Given I have retrieved the sessionTable data for my F2F session using "authCode"
        Then the authSessionState is correctly recorded as "F2F_AUTH_CODE_ISSUED"
        When I sent the request to the callback endpoint
        Then the Verifiable Credential is stored as expected
        When I get 7 TxMA events from Test Harness
        Then the "F2F_CRI_START" event matches the "F2F_CRI_START_SCHEMA" Schema
        And the "F2F_YOTI_START" event matches the "F2F_YOTI_START_UK_PP" Schema
        And the "F2F_CRI_AUTH_CODE_ISSUED" event matches the "F2F_CRI_AUTH_CODE_ISSUED_SCHEMA" Schema
        And the "F2F_CRI_END" event matches the "F2F_CRI_END_SCHEMA" Schema
        And the "F2F_YOTI_PDF_EMAILED" event matches the "F2F_YOTI_PDF_EMAILED_SCHEMA" Schema
        And the "F2F_YOTI_RESPONSE_RECEIVED" event matches the "F2F_YOTI_RESPONSE_RECEIVED_SCHEMA" Schema
        And the "F2F_CRI_VC_ISSUED" event matches the "F2F_CRI_VC_ISSUED_SCHEMA_UK_PP" Schema

    Scenario: F2F Journey - E2E Happy Path and DB Validation - Non UK Passport
        Given A Non UK Passport User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the Other passport option is selected
        When the user clicks the continue button with Non UK passport selected
        Then the user is routed to the next screen - Non-UKPassportHasExpiryDate

        When the user selects yes on the passport expiry date page
        Then the user is routed to the next screen - OtherPassport Details

        Given the date entered is within accepted Non UK expiration window
        When the user clicks the continue button on the Non UK passport page
        Then the user is routed to the Country of Issue Selector screen

        Given the user is on the Country Code Selection screen
        When the user selects a country
        Then they are routed to the NonUKPassport Branch Finder screen

        Given the postcode entered is valid
        When the user clicks the continue button on the find Post Office branch page
        Then the user is routed to the Select Location page showing 5 nearest POs

        Given a Post Office branch is selected
        When the user clicks continue
        When the user selects an Email only Post Office Letter
        Then the user is navigated to the next step in the journey - Confirm Answer
        When the user clicks the Check My Answers Submit button

        Given I have retrieved the sessionTable data for my F2F session using "authCode"
        Then the authSessionState is correctly recorded as "F2F_AUTH_CODE_ISSUED"
        When I sent the request to the callback endpoint
        Then the Verifiable Credential is stored as expected
        When I get 7 TxMA events from Test Harness
        Then the "F2F_CRI_START" event matches the "F2F_CRI_START_SCHEMA" Schema
        And the "F2F_YOTI_START" event matches the "F2F_YOTI_START_NON_UK_PP" Schema
        And the "F2F_CRI_AUTH_CODE_ISSUED" event matches the "F2F_CRI_AUTH_CODE_ISSUED_SCHEMA" Schema
        And the "F2F_CRI_END" event matches the "F2F_CRI_END_SCHEMA" Schema
        And the "F2F_YOTI_PDF_EMAILED" event matches the "F2F_YOTI_PDF_EMAILED_SCHEMA" Schema
        And the "F2F_YOTI_RESPONSE_RECEIVED" event matches the "F2F_YOTI_RESPONSE_RECEIVED_SCHEMA" Schema
        And the "F2F_CRI_VC_ISSUED" event matches the "F2F_CRI_VC_ISSUED_SCHEMA_NON_UK_PP" Schema

    Scenario: F2F Journey - E2E Happy Path and DB Validation - EU Drivers Licence
        Given An EU Drivers Licence User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the EU driving licence option is selected
        When the user clicks the EU driving licence button
        Then the user is routed to the EU DL Has Expiry Entry Screen

        When the user selects yes on the eu driving licence expiry date page
        Then the user is routed to the EU DL Expiry Entry Screen

        Given the EU Driving Licence date entered is within accepted expiration window
        When the user clicks the continue button on the EU Driving Licence details page
        Then the user is routed from EU DL Details to the address check page

        Given the user selects Yes, it has my current address on it
        When the user clicks continue on the EU Driving Licence address check page
        Then they are routed to the country code selection screen

        Given the user selects a country from the drop down menu
        When the user clicks the continue button on the EU country code page
        Then the user is routed from EU DL country code to Branch Finder Screen

        Given the postcode entered is valid
        When the user clicks the continue button on the find Post Office branch page
        Then the user is routed to the Select Location page showing 5 nearest POs

        Given a Post Office branch is selected
        When the user clicks continue
        When the user selects an Email only Post Office Letter
        Then the user is navigated to the next step in the journey - Confirm Answer
        When the user clicks the Check My Answers Submit button

        Given I have retrieved the sessionTable data for my F2F session using "authCode"
        Then the authSessionState is correctly recorded as "F2F_AUTH_CODE_ISSUED"
        When I sent the request to the callback endpoint
        Then the Verifiable Credential is stored as expected
        When I get 7 TxMA events from Test Harness
        Then the "F2F_CRI_START" event matches the "F2F_CRI_START_SCHEMA" Schema
        And the "F2F_YOTI_START" event matches the "F2F_YOTI_START_EU_DL" Schema
        And the "F2F_CRI_AUTH_CODE_ISSUED" event matches the "F2F_CRI_AUTH_CODE_ISSUED_SCHEMA" Schema
        And the "F2F_CRI_END" event matches the "F2F_CRI_END_SCHEMA" Schema
        And the "F2F_YOTI_PDF_EMAILED" event matches the "F2F_YOTI_PDF_EMAILED_SCHEMA" Schema
        And the "F2F_YOTI_RESPONSE_RECEIVED" event matches the "F2F_YOTI_RESPONSE_RECEIVED_SCHEMA" Schema
        And the "F2F_CRI_VC_ISSUED" event matches the "F2F_CRI_VC_ISSUED_SCHEMA_EU_DL" Schema

    Scenario: F2F Journey - E2E Happy Path and DB Validation - EEA National Identity Card
        Given An EEA Identity Card User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection

        Given the EEA National Identity Card option is selected
        When the user clicks the PhotoId continue button with EEA National Identity Card selected
        Then the user is routed to the EEA Has Expiry Entry Screen

        When the user selects yes on the EEA identity expiry date page
        Then the user is routed to the next screen in the EEA National Identity journey - EEA National Identity Card details

        Given the date entered is within accepted National Identity Card EEA expiration window
        When the user clicks the continue button on the National Identity Card EEA Page
        Then the user is routed from NI Card EEA Details to the address check page

        Given the user selects Yes, it has my current address on it for EEA ID
        When the user clicks continue on the EEA Identity Card address check page
        Then they are routed to the EEA ID country code selection screen

        Given the user is on the NI Card EEA Country Code Selection screen
        When the user selects an EEA country code
        Then the user is routed from NI Card EEA Country to Branch Finder Screen

        Given the postcode entered is valid
        When the user clicks the continue button on the find Post Office branch page
        Then the user is routed to the Select Location page showing 5 nearest POs

        Given a Post Office branch is selected
        When the user clicks continue
        When the user selects an Email only Post Office Letter
        Then the user is navigated to the next step in the journey - Confirm Answer
        When the user clicks the Check My Answers Submit button

        Given I have retrieved the sessionTable data for my F2F session using "authCode"
        Then the authSessionState is correctly recorded as "F2F_AUTH_CODE_ISSUED"
        When I sent the request to the callback endpoint
        Then the Verifiable Credential is stored as expected
        When I get 7 TxMA events from Test Harness
        Then the "F2F_CRI_START" event matches the "F2F_CRI_START_SCHEMA" Schema
        And the "F2F_YOTI_START" event matches the "F2F_YOTI_START_EEA_ID_CARD" Schema
        And the "F2F_CRI_AUTH_CODE_ISSUED" event matches the "F2F_CRI_AUTH_CODE_ISSUED_SCHEMA" Schema
        And the "F2F_CRI_END" event matches the "F2F_CRI_END_SCHEMA" Schema
        And the "F2F_YOTI_PDF_EMAILED" event matches the "F2F_YOTI_PDF_EMAILED_SCHEMA" Schema
        And the "F2F_YOTI_RESPONSE_RECEIVED" event matches the "F2F_YOTI_RESPONSE_RECEIVED_SCHEMA" Schema
        And the "F2F_CRI_VC_ISSUED" event matches the "F2F_CRI_VC_ISSUED_SCHEMA_EEA_ID_CARD" Schema

    Scenario: F2F Journey - E2E Abort and DB Validation
        Given A UK Drivers Licence User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection
        When the user selects I do not have any of these documents

        Given I have retrieved the sessionTable data for my F2F session using "state"
        Then the authSessionState is correctly recorded as "F2F_CRI_SESSION_ABORTED"
        When I get 2 TxMA events from Test Harness
        Then the "F2F_CRI_START" event matches the "F2F_CRI_START_SCHEMA" Schema
        And the "F2F_CRI_SESSION_ABORTED" event matches the "F2F_CRI_SESSION_ABORTED_SCHEMA" Schema

    Scenario: F2F Journey - E2E Happy Path Thin File (Email + Posted Letter Original Address) and DB Validation
        Given A user with evidence requested - strength score 4 is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the Thin File journey - Do You Have UK Passport

        Given the Thin File UK passport option is selected
        When the user clicks the continue button on the Do You Have UK Passport page
        Then the user is routed to the next screen in the Thin File journey - Passport Details

        Given the date entered is in the future
        When the user clicks the continue button on the UKPassportPage
        Then the user is routed to the next screen in the journey Branch Finder Screen
        Then the user enters a valid postcode

        Given the postcode entered is valid
        When the user clicks the continue button on the find Post Office branch page
        Then the user is routed to the Select Location page showing 5 nearest POs

        Given a Post Office branch is selected
        When the user clicks continue
        When the user selects an Email and Post Office Letter
        When the user selects that they want to send the letter to a different address
        When the user enters the postcode for the different address
        And the user selects an address from the dropdown list
        Then the user is navigated to the next step in the journey - Confirm Answer
        When the user clicks the Check My Answers Submit button

        Given I have retrieved the sessionTable data for my F2F session using "authCode"
        Then the authSessionState is correctly recorded as "F2F_AUTH_CODE_ISSUED"
        When I sent the request to the callback endpoint
        Then the Verifiable Credential is stored as expected
        When I get 7 TxMA events from Test Harness
        Then the "F2F_CRI_START" event matches the "F2F_CRI_START_SCHEMA" Schema
        And the "F2F_YOTI_START" event matches the "F2F_YOTI_START_UK_PP" Schema
        And the "F2F_CRI_AUTH_CODE_ISSUED" event matches the "F2F_CRI_AUTH_CODE_ISSUED_SCHEMA" Schema
        And the "F2F_CRI_END" event matches the "F2F_CRI_END_SCHEMA" Schema
        And the "F2F_YOTI_PDF_EMAILED" event matches the "F2F_YOTI_PDF_EMAILED_SCHEMA" Schema
        And the "F2F_YOTI_RESPONSE_RECEIVED" event matches the "F2F_YOTI_RESPONSE_RECEIVED_SCHEMA" Schema
        And the "F2F_CRI_VC_ISSUED" event matches the "F2F_CRI_VC_ISSUED_SCHEMA_UK_PP" Schema