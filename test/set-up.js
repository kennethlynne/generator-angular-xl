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
    '../../decorator',
    '../../value',
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
    var decoratorGenerator = helpers.createGenerator('angular-xl:decorator', deps, ['serviceThing']);
    var valueGenerator = helpers.createGenerator('angular-xl:value', deps, ['valueThing']);
    var providerGenerator = helpers.createGenerator('angular-xl:provider', deps, ['providerThing']);
    var filterGenerator = helpers.createGenerator('angular-xl:filter', deps, ['filterThing']);

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
                valueGenerator.run([], function () {
                    serviceGenerator.run([], function () {
                        decoratorGenerator.run([], function () {
                            providerGenerator.run([], function () {
                                filterGenerator.run([], function () {
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});



