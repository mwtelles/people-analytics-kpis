#!/bin/sh
set -e

echo "Running database migrations..."
pnpm migrate

if [ "$RUN_SEED" = "true" ]; then
  echo "Running seeders..."
  pnpm seed
else
  echo "Skipping seeders (set RUN_SEED=true to enable)."
fi

echo "Starting application..."
exec node dist/server.js
