/*global describe, before, it, beforeEach */
'use strict';
var fs = require('fs');
var assert = require('assert');
var path = require('path');
var util = require('util');
var generators = require('yeoman-generator');
var helpers = require('yeoman-generator').test;
var _ = require('underscore.string');

describe('angular-cmelion generator', function () {
    var angular;
    var folderName = 'temp';

    beforeEach(function (done) {
        var deps = [
            '../../app',
            '../../common',
            '../../controller',
            '../../main', [
                helpers.createDummyGenerator(),
                'karma:app'
            ]
        ];
        helpers.testDirectory(path.join(__dirname, folderName), function (err) {
            if (err) {
                done(err);
            }
            angular = helpers.createGenerator('angular-cmelion:app', deps, ['test']);
            angular.options['skip-install'] = true;
            done();
        });
    });

    describe('App', function () {
        it('should use the correct app name', function() {
            angular.run([], function () {
                var index_html = fs.readFileSync('app/index.html', 'utf8');
                var regex_html = new RegExp('ng-app=\"testApp\"');
                assert.ok(regex_html.test(index_html), 'index.html template using a wrong appName');
                done();
            });
        });
    });

    describe('State', function () {
        //TODO: Test that it adds style import to _states.scss
        it('should generate a new state', function (done) {
            var controllerGenerator;
            var deps = [
                '../../controller',
                '../../state',
                '../../state'
            ];
            controllerGenerator = helpers.createGenerator('angular-cmelion:state', deps, ['thing']);

            helpers.mockPrompt(angular, {
                modules: []
            });
            angular.run([], function () {
                controllerGenerator.run([], function () {
                    helpers.assertFiles([
                        ['app/states/thing/index/thing-controller.js'],
                        ['app/states/thing/index/_thing-state.scss'],
                        ['app/states/thing/index/main-view.html'],
                        ['test/unit/spec/states/thing/index/thing-controller.js']
                    ]);

                    var controllerSrc = fs.readFileSync('app/states/thing/index/thing-controller.js', 'utf8');
                    var urlRegex = new RegExp('url: \'/thing\'');
                    assert.ok(urlRegex.test(controllerSrc), 'controller registers on wrong url: ' + controllerSrc);

                    var viewTemplateRegex = new RegExp('templateUrl: \'states/thing/index/main-view.html\'');
                    assert.ok(viewTemplateRegex.test(controllerSrc), 'controller registers wrong template url: ' + controllerSrc);

                    done();
                });
            });
        });

        xit('should generate a new sub-state', function (done) {
            var controllerGenerator;
            var deps = [
                '../../controller',
                '../../state'
            ];
            controllerGenerator = helpers.createGenerator('angular-cmelion:state', deps, ['school/details']);

            helpers.mockPrompt(angular, {
                modules: []
            });
            angular.run([], function () {
                controllerGenerator.run([], function () {
                    helpers.assertFiles([
                        ['app/states/school/details/index/details-controller.js'],
                        ['app/states/school/details/index/_school-details-state.scss'],
                        ['app/states/school/details/index/main-view.html'],
                        ['test/unit/spec/states/school/details/index/details-controller.js']
                    ]);

                    var controllerSrc = fs.readFileSync('app/states/school/details/index/details-controller.js', 'utf8');
                    var regex = new RegExp('url: \'/school/details\'');
                    assert.ok(regex.test(controllerSrc), 'controller registers on wrong url: ' + controllerSrc);

                    var viewTemplateRegex = new RegExp('templateUrl: \'states/school/details/index/main-view.html\'');
                    assert.ok(viewTemplateRegex.test(controllerSrc), 'controller registers wrong template url: ' + controllerSrc);

                    done();
                });
            });
        });

        xit('should generate a new sub-state in a sub-state', function (done) {
            var controllerGenerator;
            var deps = [
                '../../controller',
                '../../state',
                '../../state'
            ];
            controllerGenerator = helpers.createGenerator('angular-cmelion:state', deps, ['school/details/one']);

            helpers.mockPrompt(angular, {
                modules: []
            });
            angular.run([], function () {
                controllerGenerator.run([], function () {
                    helpers.assertFiles([
                        ['app/states/school/details/one/index/one-controller.js'],
                        ['app/states/school/details/one/index/_school-details-one-state.scss'],
                        ['app/states/school/details/one/index/main-view.html'],
                        ['test/unit/spec/states/school/details/one/index/one-controller.js']
                    ]);

                    var controllerSrc = fs.readFileSync('app/states/school/details/one/index/one-controller.js', 'utf8');
                    var regex = new RegExp('url: \'/school/details/one\'');
                    assert.ok(regex.test(controllerSrc), 'controller registers on wrong url: ' + controllerSrc);

                    var viewTemplateRegex = new RegExp('templateUrl: \'states/school/details/one/index/main-view.html\'');
                    assert.ok(viewTemplateRegex.test(controllerSrc), 'controller registers wrong template url: ' + controllerSrc);

                    done();
                });
            });
        });
    });

    describe('Component', function () {
        //TODO: Test that it adds style import to _component.scss
        it('should generate a new component', function (done) {
            var componentGenerator;
            var deps = [
                '../../component'
            ];
            componentGenerator = helpers.createGenerator('angular-cmelion:component', deps, ['thingThing']);

            helpers.mockPrompt(angular, {
                modules: []
            });
            angular.run([], function () {
                componentGenerator.run([], function () {
                    helpers.assertFiles([
                        ['app/components/thing-thing/thing-thing.js'],
                        ['app/components/thing-thing/_thing-thing.scss'],
                        ['app/components/thing-thing/thing-thing.html'],
                        ['test/unit/spec/components/thing-thing.js']
                    ]);
                    done();
                });
            });
        });
    });

    describe('Service', function () {
        it('should generate a new service', function (done) {
            var serviceGenerator;
            var deps = [
                '../../service'
            ];
            serviceGenerator = helpers.createGenerator('angular-cmelion:service', deps, ['serviceThing']);

            helpers.mockPrompt(angular, {
                modules: []
            });
            angular.run([], function () {
                serviceGenerator.run([], function () {
                    helpers.assertFiles([
                        ['app/scripts/services/service-thing.js'],
                        ['test/unit/spec/services/service-thing.js']
                    ]);
                    done();
                });
            });
        });
    });

    describe('Factory', function () {
        it('should generate a new factory', function (done) {
            var factoryGenerator;
            var deps = [
                '../../factory'
            ];
            factoryGenerator = helpers.createGenerator('angular-cmelion:factory', deps, ['factoryThing']);

            helpers.mockPrompt(angular, {
                modules: []
            });
            angular.run([], function () {
                factoryGenerator.run([], function () {
                    helpers.assertFiles([
                        ['app/scripts/factories/factory-thing.js'],
                        ['test/unit/spec/factories/factory-thing.js']
                    ]);
                    done();
                });
            });
        });
    });

    describe('Filter', function () {
        it('should generate a new filter', function (done) {
            var filterGenerator;
            var deps = [
                '../../filter'
            ];
            filterGenerator = helpers.createGenerator('angular-cmelion:filter', deps, ['filterThing']);

            helpers.mockPrompt(angular, {
                modules: []
            });
            angular.run([], function () {
                filterGenerator.run([], function () {
                    helpers.assertFiles([
                        ['app/scripts/filters/filter-thing.js'],
                        ['test/unit/spec/filters/filter-thing.js']
                    ]);
                    done();
                });
            });
        });
    });

    describe('Provider', function () {
        it('should generate a new provider', function (done) {
            var providerGenerator;
            var deps = [
                '../../provider'
            ];
            providerGenerator = helpers.createGenerator('angular-cmelion:provider', deps, ['providerThing']);

            helpers.mockPrompt(angular, {
                modules: []
            });
            angular.run([], function () {
                providerGenerator.run([], function () {
                    helpers.assertFiles([
                        ['app/scripts/providers/provider-thing.js'],
                        ['test/unit/spec/providers/provider-thing.js']
                    ]);
                    done();
                });
            });
        });
    });

    describe('Value', function () {
        it('should generate a new value service', function (done) {
            var valueGenerator;
            var deps = [
                '../../value'
            ];
            valueGenerator = helpers.createGenerator('angular-cmelion:value', deps, ['valueThing']);

            helpers.mockPrompt(angular, {
                modules: []
            });
            angular.run([], function () {
                valueGenerator.run([], function () {
                    helpers.assertFiles([
                        ['app/scripts/values/value-thing.js'],
                        ['test/unit/spec/values/value-thing.js']
                    ]);
                    done();
                });
            });
        });
    });

    describe('Directive', function () {
        it('should generate a new directive', function (done) {
            var directiveGenerator;
            var deps = [
                '../../directive'
            ];
            directiveGenerator = helpers.createGenerator('angular-cmelion:directive', deps, ['superDirective']);

            helpers.mockPrompt(angular, {
                modules: []
            });
            angular.run([], function () {
                directiveGenerator.run([], function () {
                    helpers.assertFiles([
                        ['app/scripts/directives/super-directive.js'],
                        ['test/unit/spec/directives/super-directive.js']
                    ]);
                    done();
                });
            });
        });
    });

    describe('Decorator', function () {
        it('should generate a new decorator', function (done) {
            var decoratorGenerator;
            var deps = [
                '../../decorator'
            ];
            decoratorGenerator = helpers.createGenerator('angular-cmelion:decorator', deps, ['super']);

            helpers.mockPrompt(angular, {
                modules: []
            });
            angular.run([], function () {
                decoratorGenerator.run([], function () {
                    helpers.assertFiles([
                        ['app/scripts/decorators/super-decorator.js']
                    ]);
                    done();
                });
            });
        });
    });

    describe('Repository', function () {
        it('should generate a new repository', function (done) {
            var repositoryGenerator;
            var deps = [
                '../../repository',
                '../../crud-mock'
            ];
            repositoryGenerator = helpers.createGenerator('angular-cmelion:repository', deps, ['superThang']);

            helpers.mockPrompt(angular, {
                modules: []
            });
            angular.run([], function () {
                repositoryGenerator.run([], function () {
                    helpers.assertFiles([
                        ['app/scripts/models/super-thang.js'],
                        ['test/unit/spec/models/super-thang.js'],
                        ['app/scripts/repositories/super-thang-repository.js'],
                        ['test/unit/spec/repositories/super-thang-repository.js']
                    ]);
                    done();
                });
            });
        });
    });


    describe('CRUD mock', function () {
        it('should generate a new CRUD mock', function (done) {
            var crudMockGenerator;
            var deps = [
                '../../crud-mock'
            ];
            crudMockGenerator = helpers.createGenerator('angular-cmelion:crud-mock', deps, ['superMock']);

            helpers.mockPrompt(angular, {
                modules: []
            });
            angular.run([], function () {
                crudMockGenerator.run([], function () {
                    helpers.assertFiles([
                        ['app/dev/super-mock-mock.js']
                    ]);
                    done();
                });
            });
        });
    });

    /*

        // read JS Files
        var module_js = fs.readFileSync('app/scripts/module.js', 'utf8');
        var route_js = fs.readFileSync('app/config/routes.js', 'utf8');
        var main_js = fs.readFileSync('app/scripts/controllers/main.js', 'utf8');
        var main_test_js = fs.readFileSync('test/spec/controllers/main.js', 'utf8');

        // Test JS Files
        var regex_js = new RegExp('module\\(\'' + expectedAppName + '\'');
        assert.ok(regex_js.test(module_js), 'module.js template using a wrong appName');



    */
});
