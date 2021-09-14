#!/bin/zsh

echo "Deploy to dev"
rm -rf ./build
export NODE_ENV=production
echo "Build project..."
yarn build:dev

echo "Deploy project"
firebase deploy