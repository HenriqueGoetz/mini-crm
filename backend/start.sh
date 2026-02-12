#!/bin/bash
set -e

echo "Running database migrations..."
npm run migrate

echo "Starting application..."
if [ "$BUILD_ENV" = "production" ]; then
  npm run start
else
  npm run dev
fi
