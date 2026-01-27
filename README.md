# di-ipv-cri-f2f-front

Frontend for the Face to Face (F2F) journey within GOV.UK One Login IPV.

> Public repository: do not commit secrets, credentials, internal URLs, account identifiers, template IDs, or sensitive configuration values. Use placeholders for environment-specific values. Localhost examples are permitted.

---

## Table of contents
- [Quick links](#quick-links)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Run front-end locally against deployed back-end](#run-front-end-locally-against-deployed-back-end)
- [Browser tests](#browser-tests)
- [Code Owners](#code-owners)
- [Create and upload a custom image to ECR](#create-and-upload-a-custom-image-to-ecr)
- [Pre-Commit Checking / Verification](#pre-commit-checking--verification)
- [Dependency Installation](#dependency-installation)
- [Post Installation Configuration](#post-installation-configuration)
- [Licence](#licence)

---

## Quick links
- **Environment sample:** `.env.sample`
- **App source:** `src/`
- **Infra template:** `template.yaml`
- **IPV stub:** configured via `IPV_STUB_URL` in `.env.sample` (use placeholders; do not add real URLs)
- **Code owners:** `CODEOWNERS` (if present)

---

## Installation

Clone this repository and then run:

```bash
yarn install --frozen-lockfile
yarn build
```

## Environment Variables

All required environment variables are listed in `.env.sample`. Copy the contents of that file to a local `.env` in the same location and set values for the environment you are testing against. Do not commit `.env`, and do not add real values to this README.

- `CUSTOM_FE_URL` only needs to be populated if you would like to test against a custom deployed FE stack or if you wish to run browser tests against your local stack (for local, use `http://localhost:5030`).
- `API_BASE_URL` - URL to the ipv-cri-f2f-api F2F back-end.
- `PORT` - Default port to run the web server on. (Default to `5030`)
- `SESSION_SECRET` - Secret used when configuring the HMPO session.
- `GOOGLE_ANALYTICS_4_GTM_CONTAINER_ID` - Container ID for GA4 tracking.
- `UNIVERSAL_ANALYTICS_GTM_CONTAINER_ID` - Container ID for UA tracking.
- `GA4_ENABLED` - Feature flag to enable GA4, defaulted to `"true"`
- `UA_ENABLED` - Feature flag to enable UA, defaulted to `"false"`
- `ANALYTICS_DATA_SENSITIVE` - Redacts all form response data, defaulted to `"true"`. Only set to `"false"` if a journey section contains no PII in non-text-based form controls.
- `GA4_PAGE_VIEW_ENABLED` - Feature flag to enable GA4 page view tracking, defaulted to `"true"`
- `GA4_FORM_RESPONSE_ENABLED` - Feature flag to enable GA4 form response tracking, defaulted to `"true"`
- `GA4_FORM_ERROR_ENABLED` - Feature flag to enable GA4 form error tracking, defaulted to `"true"`
- `GA4_FORM_CHANGE_ENABLED` - Feature flag to enable GA4 form change tracking, defaulted to `"true"`
- `GA4_NAVIGATION_ENABLED` - Feature flag to enable GA4 navigation tracking, defaulted to `"true"`
- `GA4_SELECT_CONTENT_ENABLED` - Feature flag to enable GA4 select content tracking, defaulted to `"true"`
- `LANGUAGE_TOGGLE_DISABLED` - Feature flag to disable Language Toggle, defaulted to `true`
- `IPV_STUB_URL` - URL of the IPV stub used to start journeys (test-only).

## Run front-end locally against deployed back-end

- Set up `.env` as mentioned above
- Run `yarn build` followed by `yarn start`
- Make a `POST` call to the `IPV_STUB_URL` (from `.env`) with the following body payload:

```json
{
  "frontendURL": "http://localhost:5030"
}
```

- Start the journey by navigating to the `AuthorizeLocation` in the stub response

## Browser tests

Browser-based tests can be run against a deployed API stack using an IPV stub. To run the tests, make sure your `.env` points at the environment you are testing against. Do not commit `.env` values and do not add real values to this README. Then run `npm run test:browser`.

Adding `CUSTOM_FE_URL=http://localhost:5030` will run browser tests against your local changes.

These tests are written using [Cucumber](https://cucumber.io/docs/installation/javascript/) as the test runner and [Playwright](https://playwright.dev/) as the automation tool. They also follow the [Page Object Model](https://playwright.dev/docs/test-pom) for separation of concerns.

### Code Owners

This repo has a `CODEOWNERS` file in the root and is configured to require PRs to be reviewed by Code Owners.

## Create and upload a custom image to ECR

Execute the following commands to create a custom image locally and push it up to ECR.
You need to have AWS credentials in your shell via `aws-vault` or `gds-cli` or similar.
`YOUR_REPO` needs to refer to an existing repo in ECR, you can create one in the console if you do not have one already. Only follow this if your team supports deploying a custom FE image; otherwise deployments are via the pipeline.

```shell
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws-account-id>.dkr.ecr.<region>.amazonaws.com
docker build -t di-ipv-cri-f2f-front --platform linux/amd64 .
docker tag di-ipv-cri-f2f-front:latest <aws-account-id>.dkr.ecr.<region>.amazonaws.com/YOUR_REPO:YOUR_TAG
docker push <aws-account-id>.dkr.ecr.<region>.amazonaws.com/YOUR_REPO:YOUR_TAG
```

Then to use this new image update the `Image:` tag in `template.yaml` and redeploy your template locally into your own stack in DEV.

## Pre-Commit Checking / Verification

Completely optional, there is a `.pre-commit-config.yaml` configuration setup in this repo. This uses [pre-commit](https://pre-commit.com/) to verify your commit before actually committing. It runs the following checks:

- Check Json files for formatting issues
- Fixes end of file issues (it will auto-correct if it spots an issue - you will need to re-run the git commit after it has fixed the issue)
- It automatically removes trailing whitespace (again, you will need to re-run the commit after it detects and fixes the issue)
- Detects AWS credentials or private keys accidentally added to the repo
- Runs CloudFormation linter and detects issues
- Runs checkov and checks for any issues.

### Dependency Installation

To use this locally you will first need to install the dependencies. This can be done in two ways:

#### Method 1 - Python pip

Run the following in a terminal:

```
sudo -H pip3 install checkov pre-commit cfn-lint
```

This should work across platforms.

#### Method 2 - Brew

If you have brew installed please run the following:

```
brew install pre-commit ;\
brew install cfn-lint ;\
brew install checkov
```

### Post Installation Configuration

Once installed run:

```
pre-commit install
```

To update the various versions of the pre-commit plugins, this can be done by running:

```
pre-commit autoupdate && pre-commit install
```

This will install / configure the pre-commit git hooks. If it detects an issue while committing it will produce an output like the following:

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

## Licence

This repository does not currently publish a LICENSE/LICENCE file.
