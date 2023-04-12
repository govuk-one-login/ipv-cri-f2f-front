# @mock-api:f2f-f2f-success @success @nonUK
# Feature: Enter CitizenCard Details  - Happy Path

#     Background:
#         Given Authenticatable Anita is using the system
#         When they have provided their details
#         Then they should be redirected to the landingPage

#         Given the user wants to progress to the next step of the journey
#         When the user clicks the continue button on the LandingPage
#         Then the user is routed to the next screen in the journey PhotoId Selection

#         Given the EU driving licence option is selected
#         When the user clicks the continue button with EU driving licence selected
#         Then the user is routed to the next screen in the EU driving licence journey - EU driving licenec details

#     Scenario: Successful redirect from Citizen Card Expiry screen back to Document Selection screen
#     Given the user has navigated to the EU driving licence Expiry page
#     When the Back link is clicked on the EU driving licence Expiry page
#     Then the user is navigated back to the Document Selection page
