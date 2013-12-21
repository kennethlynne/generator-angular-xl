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
        expect(stateFactory('Example').url).toEqual('/example');
        expect(stateFactory('Example').templateUrl).toEqual('pages/example/index/views/index.html');
        expect(stateFactory('Example').controller).toEqual('ExampleCtrl');
    });

    it('should override defaults', function() {
        expect(stateFactory('Example', {url:'/something'}).url).toEqual('/something');
        expect(stateFactory('Example', {templateUrl:'/something'}).templateUrl).toEqual('/something');
        expect(stateFactory('Example', {controller:'something'}).controller).toEqual('something');
    });

    it('should attach init service if found', function() {
        var state = stateFactory('Example');
        var $injector = {
            has: function has(t) {
                expect(t).toBe('ExampleCtrlInit');
                return true;
            },
            get: function () {
                return {prepare: function () {
                    return 'test';
                }};
            }
        }
        expect(state.resolve.init($injector)).toEqual('test');
    });
});