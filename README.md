# Digital Identity Face To Face (F2F)

# di-ipv-cri-f2f-front

Frontend for the F2F journey.

This is the home for the front end user interface for Face to Face journey as part of the Identity Proofing and Verification (IPV) system within the GDS digital identity platform. Other repositories are used for core services or other credential issuers.

# Installation

Clone this repository and then run:

```bash
yarn install
yarn build
```

## Environment Variables

- `API_BASE_URL`: Externally accessible base url of the webserver. Used to generate the callback url as part of credential issuer oauth flows. See below to set this.
- `PORT` - Default port to run webserver on. (Default to `5030`)
- `PROXYURL` - The url for the HTTP Proxy API. See below to set this.

```bash
export API_BASE_URL=https://api-f2f-cri-api.review-o.dev.account.gov.uk
export PROXYURL=f2f-cri-outbound-proxy-proxy.review-o.dev.account.gov.uk
```

## Run front-end locally against deployed back-end

- Set `API_BASE_URL` as described above.
- Replace all instances of `x-govuk-signin-session-id` with a valid session ID from the dev environment
- Run `yarn build` followed by `yarn start`

# Mock Data

[Wiremock](https://wiremock.org/) has been used to create a [stateful mock](https://wiremock.org/docs/stateful-behaviour/) of the API, through the use of scenarios. These configuration files are stored as JSON files in the [./test/mocks/mappings](./test/mocks/mappings) directory.

This can be run by using:

`yarn run mocks`

The frontend can be configured to use this mock server through two environment variables:

- `NODE_ENV=development` - this enables a middleware that passes the `x-scenario-id` header from web requests through to the API
- `API_BASE_URL=http://localhost:8090` - this points the frontend at the Wiremock instance

A browser extension, such as [Mod Header](https://modheader.com/), can be used to set the value of this header in a web browser.

# Request properties

In order to support consistent use of headers for API requests, [middleware](./src/lib/axios) is applied to add an instance of
[axios](https://axios-http.com/) on each request onto `req.axios`. This is then reused in any code that uses the API.

# Browser tests

Browser based tests can be run against:

- a local FE and a mock server
- a local FE pointed to a deployed API
- a deployed FE pointed to a deployed API

These tests are written using [Cucumber](https://cucumber.io/docs/installation/javascript/) as the test runner and [Playwright](https://playwright.dev/) as the automation tool. They also follow the [Page Object Model](https://playwright.dev/docs/test-pom) for separation of concerns.

They can be run by using:

`yarn run test:browser`

When run against an instance of the FE deployed in the cloud, which in turn connects to a deployed API, however currently the mocks also need to be running (`yarn run mocks`) as the test runner makes calls to a `GET /__reset/{scenario}` endpoint which is not present in a deployed API.
However the actual test will run against cloud-deployed code and not utilise the mock. In a future PR this needs to be refactored so that the mocks do not need to run when executing browser tests against a deployed FE.

## Using mocked scenario data

Any cucumber feature or scenario with a tag prefixed with `@mock-api:`

e.g.
```
  @mock-api:question-error
  Scenario: API error
...
```

This scenario will be configured to send a `scenario-id` header of `question-error` on every web browser request.

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
