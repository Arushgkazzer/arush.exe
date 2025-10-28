#!/bin/bash
set -e

echo "Starting build process..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building project..."
npm run build

echo "Build completed successfully!"
echo "Output directory: ./dist"
ls -la ./dist
