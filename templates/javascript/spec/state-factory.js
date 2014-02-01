'use strict';

describe('stateFactory', function () {

    var stateFactory;

    beforeEach(function () {

        module('<%= scriptAppName %>', function (_stateFactory_) {
            stateFactory = _stateFactory_;
        });

        inject(function (_stateFactory_) {});

    });

    it('should register a default state', function () {
        var state = stateFactory('Example');

        expect(state.url).toEqual('/example');
        expect(state.templateUrl).toEqual('pages/example/index/views/main-view.html');
        expect(state.controller).toEqual('ExampleCtrl');
    });

    it('should override defaults', function() {
        expect(stateFactory('Example', {url:'/something'}).url).toEqual('/something');
        expect(stateFactory('Example', {templateUrl:'/something'}).templateUrl).toEqual('/something');
        expect(stateFactory('Example', {controller:'something'}).controller).toEqual('something');
    });

    it('should attach init service if found');

    it('should throw an error if init service is not found');
});