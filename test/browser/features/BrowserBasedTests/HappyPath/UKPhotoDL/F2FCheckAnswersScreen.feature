# @mock-api:f2f-f2f-success @success
# Feature: The user enters their date of birth to be used as part of their claimed identity


#     Background:
#         Given Authenticatable Anita is using the system
#         When they have provided their details
#         Then they should be redirected to the landingPage

#         Given the user wants to progress to the next step of the journey
#         When the user clicks the continue button on the LandingPage
#         Then the user is routed to the next screen in the journey PhotoId Selection

#         Given the UK photocard driving licence option is selected
#         When the user clicks the UK DL continue button
#         Then the user is routed to the next screen in the journey UKPhotoDL Expiry Date

#         Given the date entered is within accepted UKPhotoDL expiration window
#         When the user clicks the continue button on the UKPhotoDL Page
#         Then they are routed to the Check My Answers Screen

#     Scenario: Previously provided information successfully rendered on the page
#         Given the user has completed the previous CIC screens
#         When the user clicks the Check My Answers Submit button
#         Then they should be redirected as a success
# #When the page is rendered
# #Then fields for each of the previous screens are pre-populated with the data captured

