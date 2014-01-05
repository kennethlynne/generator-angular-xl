#!/bin/sh
cd test/temp
rm -rf .
node ../set-up.js
npm install
bower install
npm install -g grunt-cli
grunt test