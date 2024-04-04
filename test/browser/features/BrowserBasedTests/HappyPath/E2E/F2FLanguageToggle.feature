@success @e2e

Feature: F2F Language Toggle

    Scenario: HTML Tag and Hyperlink updated when Language is changed
        Given Authenticatable Anita is using the system
        When they have provided their details
        Then they should be redirected to the Landing Page
        And the language toggle is present on the screen
        When the user switches language to "Cymraeg"
        Then The HTML Language Attribute is set to "cy"
        And the language toggle updates the "Cymraeg" hyperlink
        When the user switches language to "English"
        Then The HTML Language Attribute is set to "en"
        And the language toggle updates the "English" hyperlink