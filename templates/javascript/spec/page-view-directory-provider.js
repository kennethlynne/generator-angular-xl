'use strict';

describe('pageViewDirectory', function () {

    var pageViewDirectory;

    beforeEach(function () {

        module('<%= scriptAppName %>');

        inject(function (_pageViewDirectory_) {
            pageViewDirectory = _pageViewDirectory_;
        });

    });

    it('should return a path', function () {
        expect(pageViewDirectory('example-page')).toEqual('pages/example-page/index/views/index.html');
        expect(pageViewDirectory('example-page', 'action')).toEqual('pages/example-page/index/views/action.html');
        expect(pageViewDirectory('example-page', 'action', 'view')).toEqual('pages/example-page/index/views/view.html');
    });

});