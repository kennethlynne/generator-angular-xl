'use strict';

describe('Directive: <%= cameledName %>', function () {

    var element, scope;

    beforeEach(function () {

        module('<%= scriptAppName %>');

        inject(function ($rootScope) {
            scope = $rootScope.$new();
        });

    });

    it('should make hidden element visible', function () {
        element = angular.element('<<%= _.dasherize(name) %>></<%= _.dasherize(name) %>>');
        element = $compile(element)(scope);
        expect(element.text()).toBe('this is the <%= cameledName %> directive');
    });
});
