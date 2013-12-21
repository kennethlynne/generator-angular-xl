'use strict';

describe('Service: camelize', function () {

    var camelize;

    beforeEach(function () {

        module('<%= scriptAppName %>');

        inject(function (_camelize_) {
            camelize = _camelize_;
        });

    });

    it('should do something', function () {
        expect(!!camelize).toBe(true);
    });

    it('should apply snake-case to component name - ex. snakeCase -> snake-case', function () {
        expect(camelize('snakeCase')).toBe('snake-case');
        expect(camelize('snakeCaseCase')).toBe('snake-case-case');
        expect(camelize('snakeCaseCaseSnake')).toBe('snake-case-case-snake');
    });

    it('should not split multiple capital letters into camelCase (i.e. NameXML -> name-xml', function () {
        expect(camelize('nameXML')).toBe('name-xml');
    });

    it('should not snake case the first letter', function () {
        expect(camelize('NameXML')).toBe('name-xml');
    });

});