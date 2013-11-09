'use strict';

describe('Controller: <%= classedName %>Ctrl', function () {

    var <%= classedName %>Ctrl, scope;

    beforeEach(function () {

        module('<%= scriptAppName %>');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            <%= classedName %>Ctrl = $controller('<%= classedName %>Ctrl', {
                $scope: scope,
                init: 'DATA'
            });
        });
    });

    it('should attach a list of awesomeThings to the scope', function () {
        expect(scope.data).toEqual('DATA');
    });
});
