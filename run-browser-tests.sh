#!/bin/bash

# QA Environment variables
export IPV_STUB_URL=https://f2f-ipv-stub-ipvstub.review-o.dev.account.gov.uk/start
export F2F_FE_BASE_URL=http://localhost:5030
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

# Start server and run tests
npm run test:browser:ci