@success @browser @QualityGateAccessibilityTest @QualityGateIntegrationTest @QualityGateRegressionTest @QualityGateStackTest

Feature: F2F Journey - Accessibility

    Scenario: F2F Journey (Email + Posted Letter Original Address) - Accessibility Validation - UK Drivers Licence
        Given A UK Drivers Licence User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the UK photocard driving licence option is selected
        When the user clicks the UK DL continue button
        Then the user is routed to the next screen in the journey UKPhotoDL Expiry Date
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the date entered is within accepted UKPhotoDL expiration window
        When the user clicks the continue button on the UKPhotoDL Page
        Then the user is successfully routed to the UK DL Address Check screen
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the user has selected the 'Yes' option
        When the Continue button is clicked on the UK Photo DL Address page
        Then the user is routed to the next screen in the UKPhotoDL journey - Branch Finder
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the postcode entered is valid
        When the user clicks the continue button on the find Post Office branch page
        Then the user is routed to the Select Location page showing 5 nearest POs
        Then the page should conform to WCAG 2.2 AA guidelines

        Given a Post Office branch is selected
        When the user clicks continue
        Then the page should conform to WCAG 2.2 AA guidelines
        When the user selects an Email and Post Office Letter
        Then the page should conform to WCAG 2.2 AA guidelines
        When the user selects that they want to send the letter to the original address
        Then the user is navigated to the next step in the journey - Confirm Answer
        Then the page should conform to WCAG 2.2 AA guidelines

    Scenario: F2F Journey (Email + Posted Letter Different Address) - Accessibility Validation UK Passport
        Given A UK Passport User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the UK passport option is selected
        When the user clicks the PhotoId continue button
        Then the user is routed to the next screen in the journey Passport Details
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the date entered is in the future
        When the user clicks the continue button on the UKPassportPage
        Then the user is routed to the next screen in the journey Branch Finder Screen
        Then the page should conform to WCAG 2.2 AA guidelines
        Then the user enters a valid postcode

        Given the postcode entered is valid
        When the user clicks the continue button on the find Post Office branch page
        Then the user is routed to the Select Location page showing 5 nearest POs
        Then the page should conform to WCAG 2.2 AA guidelines

        Given a Post Office branch is selected
        When the user clicks continue
        When the user selects an Email and Post Office Letter
        Then the page should conform to WCAG 2.2 AA guidelines
        When the user selects that they want to send the letter to a different address
        Then the page should conform to WCAG 2.2 AA guidelines
        When the user enters the postcode for the different address
        And the user selects an address from the dropdown list
        Then the user is navigated to the next step in the journey - Confirm Answer
        Then the page should conform to WCAG 2.2 AA guidelines

    Scenario: F2F Journey - Accessibility Validation - Non UK Passport
        Given A Non UK Passport User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection
        Then the page should conform to WCAG 2.2 AA guidelines

        Given A Non UK Passport User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the Other passport option is selected
        When the user clicks the continue button with Non UK passport selected
        Then the user is routed to the next screen - Non-UKPassportHasExpiryDate
        Then the page should conform to WCAG 2.2 AA guidelines

        When the user selects yes on the passport expiry date page
        Then the user is routed to the next screen - OtherPassport Details
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the date entered is within accepted Non UK expiration window
        When the user clicks the continue button on the Non UK passport page
        Then the user is routed to the Country of Issue Selector screen
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the user is on the Country Code Selection screen
        When the user selects a country
        Then they are routed to the NonUKPassport Branch Finder screen
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the postcode entered is valid
        When the user clicks the continue button on the find Post Office branch page
        Then the user is routed to the Select Location page showing 5 nearest POs
        Then the page should conform to WCAG 2.2 AA guidelines

        Given a Post Office branch is selected
        When the user clicks continue
        When the user selects an Email only Post Office Letter
        Then the user is navigated to the next step in the journey - Confirm Answer
        Then the page should conform to WCAG 2.2 AA guidelines

    Scenario: F2F Journey - Accessibility Validation - EU Drivers Licence
        Given An EU Drivers Licence User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the EU driving licence option is selected
        When the user clicks the EU driving licence button
        Then the user is routed to the EU DL Has Expiry Entry Screen
        Then the page should conform to WCAG 2.2 AA guidelines

        When the user selects yes on the eu driving licence expiry date page
        Then the user is routed to the EU DL Expiry Entry Screen
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the EU Driving Licence date entered is within accepted expiration window
        When the user clicks the continue button on the EU Driving Licence details page
        Then the user is routed from EU DL Details to the address check page
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the user selects Yes, it has my current address on it
        When the user clicks continue on the EU Driving Licence address check page
        Then they are routed to the country code selection screen
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the user selects a country from the drop down menu
        When the user clicks the continue button on the EU country code page
        Then the user is routed from EU DL country code to Branch Finder Screen
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the postcode entered is valid
        When the user clicks the continue button on the find Post Office branch page
        Then the user is routed to the Select Location page showing 5 nearest POs
        Then the page should conform to WCAG 2.2 AA guidelines

        Given a Post Office branch is selected
        When the user clicks continue
        When the user selects an Email only Post Office Letter
        Then the user is navigated to the next step in the journey - Confirm Answer
        Then the page should conform to WCAG 2.2 AA guidelines

    Scenario: F2F Journey - Accessibility Validation - EEA National Identity Card
        Given An EEA Identity Card User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the EEA National Identity Card option is selected
        When the user clicks the PhotoId continue button with EEA National Identity Card selected
        Then the user is routed to the EEA Has Expiry Entry Screen
        Then the page should conform to WCAG 2.2 AA guidelines

        When the user selects yes on the EEA identity expiry date page
        Then the user is routed to the next screen in the EEA National Identity journey - EEA National Identity Card details
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the date entered is within accepted National Identity Card EEA expiration window
        When the user clicks the continue button on the National Identity Card EEA Page
        Then the user is routed from NI Card EEA Details to the address check page
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the user selects Yes, it has my current address on it for EEA ID
        When the user clicks continue on the EEA Identity Card address check page
        Then they are routed to the EEA ID country code selection screen
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the user is on the NI Card EEA Country Code Selection screen
        When the user selects an EEA country code
        Then the user is routed from NI Card EEA Country to Branch Finder Screen
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the postcode entered is valid
        When the user clicks the continue button on the find Post Office branch page
        Then the user is routed to the Select Location page showing 5 nearest POs
        Then the page should conform to WCAG 2.2 AA guidelines

        Given a Post Office branch is selected
        When the user clicks continue
        When the user selects an Email only Post Office Letter
        Then the user is navigated to the next step in the journey - Confirm Answer
        Then the page should conform to WCAG 2.2 AA guidelines

    Scenario: F2F Journey - Accessibility Validation - Abort Journey
        Given A UK Drivers Licence User is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page
        Then the page should conform to WCAG 2.2 AA guidelines

        Given the user wants to progress to the next step of the journey
        When the user clicks the continue button on the Landing Page
        Then the user is routed to the next screen in the journey PhotoId Selection
        When the user selects I do not have any of these documents
        Then the page should conform to WCAG 2.2 AA guidelines