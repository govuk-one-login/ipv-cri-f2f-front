# di-ipv-cri-f2f-front

Frontend for the Face to Face (F2F) journey within GOV.UK One Login IPV.

> [!IMPORTANT]
> This repository is **public**. Do **not** commit secrets, credentials, internal URLs, account identifiers, template IDs, or sensitive configuration values.
> Document **names** and **purposes** only and use placeholders in examples. Localhost examples are permitted.

---

## Table of contents
- [Quick links](#quick-links)
- [What this service does](#what-this-service-does)
- [Getting started](#getting-started)
- [Environment file (.env)](#environment-file-env)
- [Running locally against a deployed back end](#running-locally-against-a-deployed-back-end)
- [Browser tests](#browser-tests)
- [Containerised tests against a deployed stack](#containerised-tests-against-a-deployed-stack)
- [Deployment](#deployment)
  - [Deploying a personal stack (exceptional)](#deploying-a-personal-stack-exceptional)
  - [Custom FE image build and push (debugging only)](#custom-fe-image-build-and-push-debugging-only)
- [Code owners](#code-owners)
- [Pre-commit checks](#pre-commit-checks)
- [Licence](#licence)

---

## Quick links
- **Environment sample:** `.env.sample`
- **App source:** `src/`
- **Infra template:** `template.yaml`
- **Code owners:** `CODEOWNERS` (if present)
- **Local test runner:** `./run-tests-locally.sh <stack-name>`

---

## What this service does
This service provides the user interface for the Face to Face (F2F) journey. It:
- Integrates with the corresponding backend API (`di-ipv-cri-f2f-api`) using `API_BASE_URL`.
- Supports browser-based end-to-end testing by starting journeys via an IPV stub (configured via `IPV_STUB_URL`).
- Uses a test harness in some environments (configured via `TEST_HARNESS_URL`).

---

## Getting started

### Prerequisites
- Node.js version per `package.json` / repo tooling
- yarn

### Install and build
```sh
yarn install --frozen-lockfile
yarn build
```

---

## Environment file (.env)
All required environment variables are listed in `.env.sample` (this is the source of truth). Copy it to `.env` and set values for the environment you are testing against.

```sh
cp .env.sample .env
```

> [!IMPORTANT]
> Do not commit `.env` and do not add real environment hostnames, tokens, or secret values to this README.

Common variables (see `.env.sample` for the full list):
- `PORT` – local port (default 5030)
- `SESSION_SECRET` – session secret (treat as sensitive; do not commit)
- `API_BASE_URL` – base URL for the F2F backend API
- `IPV_STUB_URL` – IPV stub URL used to start test journeys
- `F2F_FE_BASE_URL` – base URL for the FE when testing against a deployed environment
- `TEST_HARNESS_URL` – test harness endpoint used by automated journeys/tests (where applicable)
- `SESSION_TABLE` – session table identifier used in test contexts (where applicable)
- `CUSTOM_FE_URL` – optional; set to `http://localhost:5030` to run browser tests against local FE changes
- `PROXYURL` – proxy configuration used in some environments (where applicable)

---

## Running locally against a deployed back end
Set up your `.env` based on `.env.sample` (at minimum set `API_BASE_URL` and `IPV_STUB_URL` for manual journeys).

Build and start the app:
```sh
yarn build
yarn start
```

Start a journey via the IPV stub:
1) Make a POST call to `IPV_STUB_URL` with the following payload:
```json
{
  "frontendURL": "http://localhost:5030"
}
```
2) Navigate to the `AuthorizeLocation` returned in the stub response.

> [!NOTE]
> `AuthorizeLocation` is returned by the IPV stub service, which is implemented/owned in the API repository (not this frontend repo).
> Use your team’s internal documentation for environment-specific URLs and stub behaviour.

---

## Browser tests
Browser-based tests can be run against a deployed backend API stack, starting the journey using an IPV stub.

Ensure `.env` points at the environment you are testing against (do not commit values).

Run:
```sh
yarn test:browser
```

To run browser tests against local FE changes, set:
```sh
CUSTOM_FE_URL=http://localhost:5030
```

Tests use:
- Cucumber as the test runner
- Playwright for browser automation
- A Page Object Model approach

If you use npm rather than yarn in your environment, you can run `npm run test:browser` instead.

---

## Containerised tests against a deployed stack
This repo includes a Docker-based runner to execute tests against a deployed stack:
- `run-tests-locally.sh`
- `Dockerfile.test`

Run:
```sh
./run-tests-locally.sh <stack-name>
```

> [!CAUTION]
> The test runner writes CloudFormation outputs and may write temporary env files for Docker, and passes through AWS credentials from your environment.
> Ensure generated files (for example `docker_vars.env`, `cf-output.txt`, `reports/`) are not committed.

---

## Deployment
The standard deployment route is via the CI/CD pipeline for this repository. Use local deployments only when explicitly required by your team/process.

### Deploying a personal stack (exceptional)
If you must deploy an isolated FE stack (for example for testing an infra change), use a custom stack name (include your initials) to avoid overwriting shared stacks.

> [!IMPORTANT]
> Do not document environment-specific parameter values, account identifiers, or internal hostnames in this public repository.
> Use your organisation’s internal runbooks for those details.

### Custom FE image build and push (debugging only)
This section is expressly for debugging and exceptional scenarios where your team supports testing a custom FE image.
Normal frontend deployments should be via the pipeline.

You need AWS credentials in your shell (for example, via aws-vault or equivalent tooling).

```sh
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws-account-id>.dkr.ecr.<region>.amazonaws.com

docker build --platform linux/amd64 -t di-ipv-cri-f2f-front:<image-tag> .

docker tag di-ipv-cri-f2f-front:<image-tag> <aws-account-id>.dkr.ecr.<region>.amazonaws.com/<ecr-repo>:<image-tag>

docker push <aws-account-id>.dkr.ecr.<region>.amazonaws.com/<ecr-repo>:<image-tag>
```

If deploying a custom image, update the `Image:` reference in `template.yaml` and deploy via your team-approved approach.

---

## Code owners
If a `CODEOWNERS` file is present at the repo root, PRs require review by code owners.

---

## Pre-commit checks
If this repo includes `.pre-commit-config.yaml`, you can enable hooks locally:

```sh
pre-commit install
```

Run hooks manually (optional):

```sh
pre-commit run --all-files
```

---

## Licence
This repository does not currently publish a LICENSE/LICENCE file. If you need reuse/distribution terms, consult the owning organisation’s guidance before redistributing.
