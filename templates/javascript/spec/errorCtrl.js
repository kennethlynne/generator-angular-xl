'use strict';

describe('Controller: ErrorCtrl', function () {

    var ErrorCtrl, scope;

    beforeEach(function () {

        module('<%= scriptAppName %>', function ($provide) {
            $provide.value('$stateParams', {code:1337});
        });

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            ErrorCtrl = $controller('ErrorCtrl', {
                $scope: scope
            });
        });
    });

    it('should attach error code', function() {
        expect(scope.errorCode).toEqual(1337);
    });
});