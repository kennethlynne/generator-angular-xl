'use strict';

describe('Component: <%= cameledName %>Component', function () {

    describe('Directive: <%= cameledName %>Component', function () {
        var element, scope, $compile;

        beforeEach(function () {

            module('<%= scriptAppName %>');

            inject(function ($rootScope, _$compile_) {
                scope = $rootScope.$new();
                $compile = _$compile_;
            });

        });

        it('should have the component class', function() {
            element = angular.element('<<%= _.dasherize(name) %>-component></<%= _.dasherize(name) %>-component>');
            element = $compile(element)(scope);
            scope.$digest();
            expect(element).toHaveClass('<%= _.dasherize(name) %>-component');
        });

        it('should render text', function() {
            element = angular.element('<<%= _.dasherize(name) %>-component></<%= _.dasherize(name) %>-component>');
            element = $compile(element)(scope);
            scope.$digest();
            expect(element.text()).toContain('<%= name %>');
        });

    });

    describe('Controller: <%= cameledName %>ComponentCtrl', function () {

        var Ctrl, scope, element;

        beforeEach(function () {

            module('<%= scriptAppName %>');

            inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                element = angular.element('<<%= _.dasherize(name) %>-component></<%= _.dasherize(name) %>-component>');
                Ctrl = $controller('<%= cameledName %>ComponentCtrl', {
                    $scope: scope,
                    $element: element
                });
            });
        });

        it('should render a message', function () {
            expect(scope.text).toEqual('this is the <%= _.camelize(name) %> component');
        });
    });

});