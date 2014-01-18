'use strict';

describe('Filter: offset', function () {

    var offset;

    beforeEach(function () {

        module('<%= scriptAppName %>');

        inject(function ($filter) {
            offset = $filter('offset');
        });

    });

    it('should remove the number of items specified:"', function () {
        expect(offset('angularjs', 3)).toBe('ularjs');
        expect(offset([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([4, 5, 6, 7]);
    });

});