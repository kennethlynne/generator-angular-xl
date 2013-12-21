'use strict';

describe('Controller: MainCtrl', function () {

    var MainCtrl, scope;

    beforeEach(function () {

        module('<%= scriptAppName %>');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            MainCtrl = $controller('MainCtrl', {
                $scope: scope,
                init: 'DATA'
            });
        });
    });

    it('should attach init data to scope', function () {
        expect(scope.data).toEqual('DATA');
    });
});

describe('Service: MainCtrlInit', function () {

    var MainCtrlInit;

    beforeEach(function () {

        module('<%= scriptAppName %>');

        inject(function (_MainCtrlInit_) {
            MainCtrlInit = _MainCtrlInit_;
        });

    });


    it('should have a prepare function', function () {
        expect(typeof MainCtrlInit.prepare).toEqual('function');
    });

});