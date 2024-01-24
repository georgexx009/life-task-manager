#!/bin/bash

# Find all .html files in the src directory and copy them to the dist directory
find ./src -name "*.html" -exec bash -c 'mkdir -p ./dist/$(dirname ${0#./src/}) && cp $0 ./dist/${0#./src/}' {} \;

# Find all .html files in the dist directory and replace .ts with .js
find ./dist -name "*.html" -exec sed -i '' 's/\.ts/\.js/g' {} \;