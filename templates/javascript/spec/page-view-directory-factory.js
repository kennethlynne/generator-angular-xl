'use strict';

describe('pageViewDirectoryFactory', function () {

    var pageViewDirectoryFactory;

    beforeEach(function () {

        module('<%= scriptAppName %>');

        inject(function (_<%= cameledName %>_) {
            pageViewDirectoryFactory = _pageViewDirectoryFactory_;
        });

    });

    it('should return a path', function () {
        expect(pageViewDirectoryFactory('example-page')).toEqual('pages/example-page/index/views/index.html');
        expect(pageViewDirectoryFactory('example-page', 'action')).toEqual('pages/example-page/index/views/action.html');
        expect(pageViewDirectoryFactory('example-page', 'action', 'view')).toEqual('pages/example-page/index/views/view.html');
    });

});