'use strict';

describe('Service: dasherize', function () {

    var dasherize;

    beforeEach(function () {

        module('<%= scriptAppName %>');

        inject(function (_dasherize_) {
            dasherize = _dasherize_;
        });

    });

    it('should do something', function () {
        expect(!!dasherize).toBe(true);
    });

    it('should apply snake-case to component name - ex. snakeCase -> snake-case', function () {
        expect(dasherize('snakeCase')).toBe('snake-case');
        expect(dasherize('snakeCaseCase')).toBe('snake-case-case');
        expect(dasherize('snakeCaseCaseSnake')).toBe('snake-case-case-snake');
    });

    it('should not split multiple capital letters into camelCase (i.e. NameXML -> name-xml', function () {
        expect(dasherize('nameXML')).toBe('name-xml');
    });

    it('should not snake case the first letter', function () {
        expect(dasherize('NameXML')).toBe('name-xml');
    });

});