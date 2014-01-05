'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var helpers = require('yeoman-generator').test;
var _ = require('underscore.string');

var deps = [
    '../../app',
    '../../common',
    '../../controller',
    '../../view',
    '../../page',
    '../../component',
    '../../service',
    '../../main', [
        helpers.createDummyGenerator(),
        'karma:app'
    ]
];

helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
    var angular = helpers.createGenerator('angular-xl:app', deps);
    var pageGenerator = helpers.createGenerator('angular-xl:page', deps, ['thingThing']);
    var componentGenerator = helpers.createGenerator('angular-xl:component', deps, ['thingThing']);
    var serviceGenerator = helpers.createGenerator('angular-xl:service', deps, ['serviceThing']);

    angular.options['skip-install'] = true;

    helpers.mockPrompt(angular, {
        modules: [
            'resourceModule',
            'cookiesModule',
            'sanitizeModule',
            'restangularModule',
            'touchModule'
        ]
    });

    angular.run([], function () {
        pageGenerator.run([], function () {
            componentGenerator.run([], function () {
                serviceGenerator.run([], function () {}
                );}
            );
        });
    });
});



