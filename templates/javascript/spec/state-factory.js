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
        expect(state.resolve.init[1]($injector)).toEqual('test');
    });

    it('should throw an error if init service is not found', function() {
        var state = stateFactory('Example');

        function wrapper1() {
            var $injector = {
                has: jasmine.createSpy('has').andReturn(false),
                get: jasmine.createSpy('get')
            }
            state.resolve.init[1]($injector)
        }
        expect(wrapper1).toThrow('Serious error occurred trying to load controller. No such service: ExampleCtrlInit');

        function wrapper2() {
            var $injector = {
                has: jasmine.createSpy('has').andReturn(true),
                get: jasmine.createSpy('get').andReturn({})
            }
            state.resolve.init[1]($injector)
        }
        expect(wrapper2).toThrow('ExampleCtrlInit has no prepare method.');
    });
});