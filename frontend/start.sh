#!/bin/sh
set -e

if [ "$BUILD_ENV" = "production" ]; then
  echo "Starting in production mode..."
  npm install -g serve
  serve -s build -l 3000
else
  echo "Starting in development mode..."
  npm start
fi
