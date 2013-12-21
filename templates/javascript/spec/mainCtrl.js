'use strict';

describe('Controller: IndexCtrl', function () {

    var IndexCtrl, scope;

    beforeEach(function () {

        module('<%= scriptAppName %>');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            IndexCtrl = $controller('IndexCtrl', {
                $scope: scope,
                init: 'DATA'
            });
        });
    });

    it('should attach init data to scope', function () {
        expect(scope.data).toEqual('DATA');
    });
});

describe('Service: IndexCtrlInit', function () {

    var IndexCtrlInit;

    beforeEach(function () {

        module('<%= scriptAppName %>');

        inject(function (_IndexCtrlInit_) {
            IndexCtrlInit = _IndexCtrlInit_;
        });

    });


    it('should have a prepare function', function () {
        expect(typeof IndexCtrlInit.prepare).toEqual('function');
    });

});