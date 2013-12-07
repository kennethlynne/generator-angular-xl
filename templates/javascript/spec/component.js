'use strict';

describe('Component: <%= cameledName %>Component', function () {

    var element, outerScope, <%= cameledName %>ComponentCtrl, scope;

    beforeEach(function () {

        module('<%= scriptAppName %>.components');

        inject(function ($rootScope, $controller, $compile) {
            outerScope = $rootScope;
            scope = $rootScope.$new();
            element = angular.element('<<%= _.dasherize(name) %>-component />');
            element = $compile(element)(outerScope);
            outerScope.$digest();

            <%= cameledName %>ComponentCtrl = $controller('<%= cameledName %>ComponentCtrl', {
                $scope: scope,
                $element: element
            });
        });

    });

    it('should have the <%= _.dasherize(name) %>-component class', function () {
        expect(element.hasClass('<%= _.dasherize(name) %>-component')).toBeTruthy();
    });

    it('should render a message', function() {
        expect(element.text()).toContain('this is');
    });
});