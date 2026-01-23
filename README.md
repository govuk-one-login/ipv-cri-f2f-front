# Digital Identity Face To Face (F2F)

# di-ipv-cri-f2f-front

Frontend for the F2F journey.

This is the home for the front end user interface for Face to Face journey as part of the Identity Proofing and Verification (IPV) system within the GDS digital identity platform. Other repositories are used for core services or other credential issuers.

# Installation

Clone this repository and then run:

```bash
yarn install --frozen-lockfile
yarn build
```

## Environment Variables

All the required Environment Variables are inside the .env.sample file. Copy the contents on this file to a .env file in the same location, using the API locations specific for the envrionment you wish to test against.

- `CUSTOM_FE_URL` only needs to be populated if you would like to test against a custom deployed FE stack or if you wish to run browser-test against your local stack in which case set the value to be `http://localhost:5030`
- `API_BASE_URL` - URL to the ipv-cri-f2f-api F2F back-end.
- `PORT` - Default port to run webserver on. (Default to `5030`)
- `SESSION_SECRET` - Secret used when configuring the HMPO session.
- `GOOGLE_ANALYTICS_4_GTM_CONTAINER_ID` - Container ID for GA4 tracking.
- `UNIVERSAL_ANALYTICS_GTM_CONTAINER_ID` - Container ID for UA tracking.
- `GA4_ENABLED` - Feature flag to enable GA4, defaulted to `"true"`
- `UA_ENABLED` - Feature flag to enable UA, defaulted to `"false"`
- `ANALYTICS_DATA_SENSITIVE` - Redacts all form response data, defaulted to `"true"`. Only to be set to `"false"` if a journey section contains no PII in none text based form controls
- `GA4_PAGE_VIEW_ENABLED`- Feature flag to enable GA4 page view tracking, defaulted to `"true"`
- `GA4_FORM_RESPONSE_ENABLED`- Feature flag to enable GA4 form response tracking, defaulted to `"true"`
- `GA4_FORM_ERROR_ENABLED`- Feature flag to enable GA4 form error tracking, defaulted to `"true"`
- `GA4_FORM_CHANGE_ENABLED`- Feature flag to enable GA4 form change tracking, defaulted to `"true"`
- `GA4_NAVIGATION_ENABLED`- Feature flag to enable GA4 navigation tracking, defaulted to `"true"`
- `GA4_SELECT_CONTENT_ENABLED`- Feature flag to enable GA4 select content tracking, defaulted to `"true"`
- `LANGUAGE_TOGGLE_DISABLED` - Feature flag to disable Language Toggle, defaulted to `true`
- `LETTER_LANGUAGE_CHOICE_ENABLED` - Feature flag to enable posted letter language choice page, defaulted to `false`

## Run front-end locally against deployed back-end

- Setup `.env` file as mentioned above
- Run `yarn build` followed by `yarn start`
- Make a `POST` call to the IPV_STUB_URL with the following body payload

```
{
"frontendURL": "http://localhost:5030"
}
```

- Start the journey from the but navigating to the `AuthorizeLocation` in the Stub response

# Browser tests

Browser based tests can be run against a deployed API stack using the CIC-IPV Stub. To run the tests make sure you have urls pointing to the relevant envrionment filled out in your .env file and run `npm run test:browser`

Adding `CUSTOM_FE_URL=http://localhost:5030` will run browser tets against your local changes

These tests are written using [Cucumber](https://cucumber.io/docs/installation/javascript/) as the test runner and [Playwright](https://playwright.dev/) as the automation tool. They also follow the [Page Object Model](https://playwright.dev/docs/test-pom) for separation of concerns.

### Code Owners

This repo has a `CODEOWNERS` file in the root and is configured to require PRs to reviewed by Code Owners.

## Create and upload a custom image to ECR

Execute the following commands to create a custom image locally and push it up to ECR.
You need to have AWS credentials in your shell via `aws-vault` or `gds-cli` or similar.
`YOUR_REPO` needs to refer to an existing repo in ECR, you can create one in console if you don't have one already.

```shell
aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 440208678480.dkr.ecr.eu-west-2.amazonaws.com
docker build -t di-ipv-cri-f2f-front --platform linux/amd64 .
docker tag di-ipv-cri-f2f-front:latest 440208678480.dkr.ecr.eu-west-2.amazonaws.com/YOUR_REPO:YOUR_TAG
docker push 440208678480.dkr.ecr.eu-west-2.amazonaws.com/YOUR_REPO:YOUR_TAG
```

Then to use this new image update the `Image:` tag in the template.yaml and redeploy your template locally in to your own stack in DEV.

## Pre-Commit Checking / Verification

Completely optional, there is a `.pre-commit-config.yaml` configuration setup in this repo, this uses [pre-commit](https://pre-commit.com/) to verify your commit before actually commiting, it runs the following checks:

- Check Json files for formatting issues
- Fixes end of file issues (it will auto correct if it spots an issue - you will need to run the git commit again after it has fixed the issue)
- It automatically removes trailing whitespaces (again will need to run commit again after it detects and fixes the issue)
- Detects aws credentials or private keys accidentally added to the repo
- runs cloud formation linter and detects issues
- runs checkov and checks for any issues.

### Dependency Installation

To use this locally you will first need to install the dependencies, this can be done in 2 ways:

#### Method 1 - Python pip

Run the following in a terminal:

```
sudo -H pip3 install checkov pre-commit cfn-lint
```

this should work across platforms

#### Method 2 - Brew

If you have brew installed please run the following:

```
brew install pre-commit ;\
brew install cfn-lint ;\
brew install checkov
```

### Post Installation Configuration

once installed run:

```
pre-commit install
```

To update the various versions of the pre-commit plugins, this can be done by running:

```
pre-commit autoupdate && pre-commit install
```

This will install / configure the pre-commit git hooks, if it detects an issue while committing it will produce an output like the following:

```
 git commit -a
check json...........................................(no files to check)Skipped
fix end of files.........................................................Passed
trim trailing whitespace.................................................Passed
detect aws credentials...................................................Passed
detect private key.......................................................Passed
AWS CloudFormation Linter................................................Failed
- hook id: cfn-python-lint
- exit code: 4
W3011 Both UpdateReplacePolicy and DeletionPolicy are needed to protect Resources/PublicHostedZone from deletion
core/deploy/dns-zones/template.yaml:20:3
Checkov..............................................(no files to check)Skipped
- hook id: checkov
```
