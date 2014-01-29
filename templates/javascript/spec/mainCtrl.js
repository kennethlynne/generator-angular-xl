'use strict';

describe('Controller: IndexCtrl', function () {

    var IndexCtrl, scope;

    beforeEach(function () {

        module('<%= scriptAppName %>');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            IndexCtrl = $controller('IndexCtrl', {
                $scope: scope
            });
        });
    });

    it('should attach init data to scope', function () {
        expect(scope.message).toEqual('Hello world!');
    });
});
