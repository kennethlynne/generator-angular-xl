'use strict';

describe('Component: socklessComponent', function () {

    var element, scope, $compile;

    beforeEach(function () {

        module('socklessJS.components.sockless');

        inject(function ($rootScope, _$compile_, $templateCache) {
            $templateCache.put('views/components/sockless/sockless.html',
                "<div class=\"sockless-component\">\r" +
                    "\n" +
                    "    <h1>This is a sockless component!</h1>\r" +
                    "\n" +
                    "</div>"
            );

            scope = $rootScope.$new();
            $compile = _$compile_;
        });

    });

    it('should have the sockless-component class', function () {
        element = angular.element('<sockless-component/>');
        element = $compile(element)(scope);
        scope.$digest();
        expect(element.hasClass('sockless-component')).toBeTruthy();
    });
});

describe('Component controller: socklessComponentCtrl', function () {

    var socklessComponentCtrl, scope;

    beforeEach(function () {

        module('socklessJS.components.sockless');

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