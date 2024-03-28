#!/usr/bin/env bash

set -eu

# The CFN variables seem to include quotes when used in tests these quotes must
# be removed before assigning these variable.
remove_quotes () {
  echo "$1" | tr -d '"'
}

# Github actions set to true for tests to run in headless mode
export GITHUB_ACTIONS=true
# shellcheck disable=SC2154
export IPV_STUB_URL=$(remove_quotes $CFN_F2FIPVStubExecuteURL)start
export F2F_FE_BASE_URL=https://$(remove_quotes $CFN_F2FCustomDomain)
export TEST_HARNESS_URL=$(remove_quotes $CFN_F2FTestHarnessURL)
export SESSION_TABLE=$(remove_quotes $CFN_BackendSessionTableName)
export API_BASE_URL=$(remove_quotes "$CFN_F2FBackendURL")

declare error_code

cd /app; yarn run test:e2e:cd
error_code=$?

cp -rf /app/test/reports $TEST_REPORT_ABSOLUTE_DIR

sleep 2m

apt-get install jq -y
cd /app; npm run test:pii
error_code=$?

exit $error_code