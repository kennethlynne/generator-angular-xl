'use strict';

describe('Controller(<%= pageUrl %>): <%= classedName %>Ctrl', function () {

    var <%= classedName %>, scope;

    beforeEach(function () {

        module('<%= scriptAppName %>');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            <%= classedName %> = $controller('<%= classedName %>Ctrl', {
                $scope: scope
            });
        });
    });

    it('should attach init data to scope', function () {
        expect(scope.foo).toEqual('bar');
    });
});
<% if (initService) { %>
describe('Service(<%= pageUrl %>): <%= classedName %>Init', function () {

    var <%= classedName %>Init;

    beforeEach(function () {

        module('<%= scriptAppName %>');

        inject(function (_<%= classedName %>Init_) {
            <%= classedName %>Init = _<%= classedName %>Init_;
        });

    });

    it('should have a prepare function', function () {
        expect(typeof <%= classedName %>Init.prepare).toEqual('function');
    });

    it('should return a promise', function () {
        expect(typeof <%= classedName %>Init.prepare().then).toEqual('function');
    });

});<% } %>