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
    '../../factory',
    '../../provider',
    '../../model',
    '../../filter',
    '../../main', [
        helpers.createDummyGenerator(),
        'karma:app'
    ]
];

helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
    var angular = helpers.createGenerator('angular-xl:app', deps);

    angular.options['skip-install'] = true;

    helpers.mockPrompt(angular, {
        modules: [
            'resourceModule',
            'cookiesModule',
            'sanitizeModule',
            'restangularModule',
            'touchModule',
            'xeditableModule',
            'angularUIBootstrapModule',
            'ngStorageModule'
        ]
    });

    var generators = {};
    var names = [
        'page',
        'component',
        'service',
        'factory',
        'value',
        'provider',
        'filter',
        'model'
    ];

    names.forEach(function (name) {
        generators[name] = helpers.createGenerator('angular-xl:' + name, deps, [ name + 'Test' ]);
    });

    var queue = names.slice(0); //Clone list of names

    //Recursively do all tests
    function testNext() {
        if (queue.length == 0) {
            return;
        }

        generators[queue.pop()].run([], function () {
            //Do the next test in queue
            testNext();
        });

    }

    //Run tests
    angular.run([], function () {
        testNext(); //Test all generators in queue recursively
    });
});



