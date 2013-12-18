'use strict';

describe('stateFactory', function () {

    var stateFactory;

    beforeEach(function () {

        module('<%= scriptAppName %>');

        inject(function (_stateFactory_) {
            stateFactory = _stateFactory_;
        });

    });

    it('should return a default state', function () {
        expect(stateFactory('example').url).toEqual('/example');
        expect(stateFactory('example').templateUrl).toEqual('pages/example/index/views/index.html');
        expect(stateFactory('example').controller).toEqual('exampleCtrl');
    });

});