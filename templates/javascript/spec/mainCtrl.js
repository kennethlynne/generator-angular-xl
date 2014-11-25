'use strict';

describe('Controller: IndexCtrl', function () {

    var IndexCtrl, scope;

    beforeEach(function () {

        module('<%= scriptAppName %>');

       //Make external json used by dev mock available in tests
       module('app/dev/my-test-mock.json');

      inject(function ($controller, $rootScope, _appDevMyTestMock_) {
            scope = $rootScope.$new();
            IndexCtrl = $controller('IndexCtrl', {
                $scope: scope,
                modelPromise: _appDevMyTestMock_
            });
        });
    });

    it('should attach init data to scope', function () {
        expect(scope.message).toEqual('Hello world!');
    });
});
