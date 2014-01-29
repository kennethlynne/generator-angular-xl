'use strict';

describe('stateFactory', function () {

    var stateFactoryProvider, $stateProvider;

    beforeEach(function () {

        $stateProvider = {
            state: jasmine.createSpy('$stateProvider.state')
        };

        module('<%= scriptAppName %>', function ($provide) {
            $provide.value('$stateProvider', $stateProvider);
        });

        module('<%= scriptAppName %>', function (_stateFactoryProvider_) {
            stateFactoryProvider = _stateFactoryProvider_;
        });

        inject(function (_stateFactory_) {});

    });

    it('should register a default state', function () {
        stateFactoryProvider.register('Example');
        var name = $stateProvider.state.mostRecentCall.args[1];
        var callArgs = $stateProvider.state.mostRecentCall.args[1];

        expect(name).toEqual('example');
        expect(callArgs.url).toEqual('/example');
        expect(callArgs.templateUrl).toEqual('pages/example/index/views/main-view.html');
        expect(callArgs.controller).toEqual('ExampleCtrl');
    });

    it('should override defaults', function() {
        stateFactoryProvider.register('Example', {url:'/something'});
        expect($stateProvider.state.mostRecentCall.args[1].url).toEqual('/something');

        stateFactoryProvider.register('Example', {templateUrl:'/something'});
        expect($stateProvider.state.mostRecentCall.args[1].templateUrl).toEqual('/something');

        stateFactoryProvider.register('Example', {controller:'something'});
        expect($stateProvider.state.mostRecentCall.args[1].controller).toEqual('something');
    });

    it('should attach init service if found');

    it('should throw an error if init service is not found');
});