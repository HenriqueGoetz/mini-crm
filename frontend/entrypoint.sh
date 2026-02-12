#!/bin/sh

set -e

if [ "$BUILD_ENV" = "production" ]; then
  echo "Serving application..."
  npm install -g serve && serve -s build -l 3000
else
  echo "Starting application..."
  npm start
fi
