'use strict';

describe('Directive: <%= cameledName %>', function () {

    var element, scope, $compile;

    beforeEach(function () {

        module('<%= scriptAppName %>');

        inject(function ($rootScope, _$compile_) {
            scope = $rootScope.$new();
            $compile = _$compile_;
        });

    });

    it('should set text', function () {
        element = angular.element('<p <%= _.dasherize(name) %>></p>');
        element = $compile(element)(scope);
        scope.$digest();
        expect(element.text()).toBe('this is the <%= cameledName %> directive');
    });
});
