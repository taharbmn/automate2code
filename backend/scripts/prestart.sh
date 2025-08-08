#!/bin/bash

# Pre-launch script for the application
echo "Starting pre-launch script..."

# Wait for the database to be available (if necessary)
echo "Checking database..."

# Run migrations
echo "Running migrations..."
python scripts/migrate.py migrate

# Other pre-launch tasks if necessary
echo "Preparation completed!"

echo "The application is ready to be launched."
