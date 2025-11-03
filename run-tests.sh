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
echo "--- Setting Environment Variables ---"
export IPV_STUB_URL=$(remove_quotes "$CFN_F2FIPVStubExecuteURL")
echo "IPV_STUB_URL=${IPV_STUB_URL}"
export F2F_FE_BASE_URL=https://$(remove_quotes "$CFN_F2FCustomDomain")
echo "F2F_FE_BASE_URL=${F2F_FE_BASE_URL}"
export TEST_HARNESS_URL=$(remove_quotes "$CFN_F2FTestHarnessURL")
echo "TEST_HARNESS_URL=${TEST_HARNESS_URL}"
export SESSION_TABLE=$(remove_quotes "$CFN_F2FBackendSessionTableName")
echo "SESSION_TABLE=${SESSION_TABLE}"
export API_BASE_URL=$(remove_quotes "$CFN_F2FBackendURL")
echo "API_BASE_URL=${API_BASE_URL}"
export LANGUAGE_TOGGLE_DISABLED=false
echo "LANGUAGE_TOGGLE_DISABLED=${LANGUAGE_TOGGLE_DISABLED}"
echo "--- Environment Variables Set ---"

declare error_code

# disabling error_check to allow report generation for successful + failed tests
set +e
cd /app; yarn run test:e2e:cd
error_code=$?
cp -rf /app/test/reports $TEST_REPORT_ABSOLUTE_DIR
if [ $error_code -ne 0 ]
then
  exit $error_code
fi

sleep 2m

set -e
apt-get install jq -y
cd /app; npm run test:pii
error_code=$?

exit $error_code