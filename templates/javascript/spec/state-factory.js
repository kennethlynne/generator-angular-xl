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
        stateFactory('Example');
        var name = $stateProvider.state.mostRecentCall.args[1];
        var callArgs = $stateProvider.state.mostRecentCall.args[1];

        expect(name).toEqual('example');
        expect(callArgs.url).toEqual('/example');
        expect(callArgs.templateUrl).toEqual('pages/example/index/views/main-view.html');
        expect(callArgs.controller).toEqual('ExampleCtrl');
    });

    it('should override defaults', function() {
        stateFactory('Example', {url:'/something'});
        expect($stateProvider.state.mostRecentCall.args[1].url).toEqual('/something');

        stateFactory('Example', {templateUrl:'/something'});
        expect($stateProvider.state.mostRecentCall.args[1].templateUrl).toEqual('/something');

        stateFactory('Example', {controller:'something'});
        expect($stateProvider.state.mostRecentCall.args[1].controller).toEqual('something');
    });

    it('should attach init service if found');

    it('should throw an error if init service is not found');
});