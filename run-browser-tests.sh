#!/bin/bash

# Export environment variables
export PORT=5030
export SESSION_SECRET=123456
export NODE_ENV=local
export GA4_DISABLED=false
export UA_DISABLED=false
export UNIVERSAL_ANALYTICS_GTM_CONTAINER_ID="GTM-XXXXXXX"
export GOOGLE_ANALYTICS_4_GTM_CONTAINER_ID="GTM-XXXXXXwX"
export ANALYTICS_DOMAIN="localhost"
export LOG_LEVEL="debug"

# QA Environment variables
export IPV_STUB_URL=https://f2f-ipv-stub-ipvstub.review-o.dev.account.gov.uk/start
export F2F_FE_BASE_URL=http://localhost:5030
export TEST_HARNESS_URL=https://f2f-test-harness-testharness.review-o.dev.account.gov.uk
export SESSION_TABLE=session-f2f-cri-ddb
export API_BASE_URL=https://api-f2f-cri-api.review-o.dev.account.gov.uk
export CUSTOM_FE_URL=http://localhost:5030
export PROXYURL=f2f-cri-outbound-proxy-proxy.review-o.dev.account.gov.uk

check_and_kill_port() {
  if lsof -i:$PORT > /dev/null; then
    echo "Port $PORT is in use. Trying to free the port..."
    PID=$(lsof -t -i:$PORT)
    kill -9 $PID
    sleep 2 # Give some time for the port to be freed
    if lsof -i:$PORT > /dev/null; then
      echo "Failed to free port $PORT. Exiting."
      exit 1
    else
      echo "Port $PORT freed. Retrying script..."
      exec "$0" # Re-execute the script
    fi
  fi
}

# Check if port 5030 is already in use and attempt to kill the process using it
check_and_kill_port

# Function to wait for the server to be ready
waitForServer() {
    echo "Waiting for server to be ready..."
    until curl --output /dev/null --silent --head --fail http://localhost:5030; do
        printf '.'
        sleep 1
    done
    echo "Server is up and running."
}

# Start the application
npm run test:browser:ci