'use strict';

describe('Controller: IndexCtrl', function () {

    var IndexCtrl, scope;

    beforeEach(function () {

        module('<%= scriptAppName %>');

       //Make external json used by dev mock available in tests
       module('<%= appPath %>/dev/my-test-mock.json');

      inject(function ($controller, $rootScope, _<%= appPath %>DevMyTestMock_) {
            scope = $rootScope.$new();
            IndexCtrl = $controller('IndexCtrl', {
                $scope: scope,
                modelPromise: _<%= appPath %>DevMyTestMock_
            });
        });
    });

    it('should attach init data to scope', function () {
        expect(scope.message).toEqual('Hello world!');
    });
});
