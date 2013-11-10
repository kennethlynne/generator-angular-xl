'use strict';

describe('Component: socklessComponent', function () {

    var element, scope;

    beforeEach(function () {

        module('socklessJS.components');

        inject(function ($rootScope) {
            scope = $rootScope.$new();
        });

    });

    it('should have the sockless-component class', inject(function ($compile) {
        element = angular.element('<sockless-component></sockless-component>');
        element = $compile(element)(scope);
        expect(element.hasClass('sockless-component')).toBeTruthy();
    }));
});

describe('Component controller: socklessComponentCtrl', function () {

    var socklessComponentCtrl, scope;

    beforeEach(function () {

        module('socklessJS.components');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            socklessComponentCtrl = $controller('socklessComponentCtrl', {
                $scope: scope
            });
        });
    });

    it('should be tested!', function () {
        expect(true).toBeTruthy();
    });
});