'use strict';

describe('Component: <%= cameledName %>Component', function () {

    var element, scope;

    beforeEach(function () {

        module('<%= scriptAppName %>');

        inject(function ($rootScope) {
            scope = $rootScope.$new();
        });

    });

    it('should have the <%= _.dasherize(name) %>-component class', inject(function ($compile) {
        element = angular.element('<<%= _.dasherize(name) %>-component></<%= _.dasherize(name) %>-component>');
        element = $compile(element)(scope);
        expect(element.hasClass('<%= _.dasherize(name) %>-component')).toBeTruthy();
    }));
});

describe('Component controller: <%= cameledName %>ComponentCtrl', function () {

    var <%= cameledName %>ComponentCtrl, scope;

    beforeEach(function () {

        module('<%= scriptAppName %>');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            <%= cameledName %>ComponentCtrl = $controller('<%= cameledName %>ComponentCtrl', {
                $scope: scope
            });
        });
    });

    it('should be tested!', function () {
        expect(true).toBeTruthy();
    });
});