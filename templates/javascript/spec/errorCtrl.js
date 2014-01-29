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

describe('Service: ErrorCtrlInit', function () {

    var ErrorCtrlInit;

    beforeEach(function () {

        module('<%= scriptAppName %>');

        inject(function (_ErrorCtrlInit_) {
            ErrorCtrlInit = _ErrorCtrlInit_;
        });

    });

    it('should have a prepare function', function () {
        expect(typeof ErrorCtrlInit.prepare).toEqual('function');
    });

});