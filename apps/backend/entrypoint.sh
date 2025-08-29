#!/bin/sh
set -e

echo "Running database migrations..."
npx sequelize-cli db:migrate

if [ "$RUN_SEED" = "true" ]; then
  echo "Running seeders..."
  npx sequelize-cli db:seed:all
else
  echo "Skipping seeders (set RUN_SEED=true to enable)."
fi

echo "Starting application..."
exec node dist/server.js
