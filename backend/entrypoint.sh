#!/bin/sh

set -e

echo "Running migrations..."
if [ "$BUILD_ENV" = "production" ]; then
  npm run migrate
else 
  npm run migrate-dev
fi

echo "Starting application..."
if [ "$BUILD_ENV" = "production" ]; then
  npm run start
else
  npm run dev
fi
