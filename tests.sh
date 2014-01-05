#!/bin/sh
cd test/temp
npm install
bower install
npm install -g grunt-cli
grunt test