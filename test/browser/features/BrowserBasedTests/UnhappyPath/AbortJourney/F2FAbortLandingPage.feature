@mock-api:f2f-f2f-success @success @browser
Feature: Abort Journey - Landing Page   
    
    Scenario: Abort Journey - I want to prove my identity another way
        Given Authenticatable Anita is using the system
        And they have provided their details
        And they should be redirected to the Landing Page    
        When the user click on I want to prove my identity another way
        Then the session is aborted