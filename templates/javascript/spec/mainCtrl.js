'use strict';

describe('State: Index', function () {

  var IndexCtrl, scope;

  beforeEach(function () {
    module('<%= scriptAppName %>');
  });

  describe('Config: resolve', function () {

    var $rootScope, $state, MyTestRepositoryMock, state = 'index';

    beforeEach(function () {
      module(function($provide) {
        $provide.value('MyTestRepository', MyTestRepositoryMock = {});
      });

      inject(function(_$rootScope_, _$state_) {
        $rootScope = _$rootScope_;
        $state = _$state_;
      })
    });


    it('should respond to URL', function() {
      expect($state.href(state)).toEqual('#/');
    });

    it('should resolve data', function() {
      MyTestRepositoryMock.getAll = jasmine.createSpy('getAll').andReturn('getAll');

      $state.go(state);
      $rootScope.$digest();
      expect($state.current.name).toBe('index');

      // Ensure resolve triggered request for data
      expect( MyTestRepositoryMock.getAll).toHaveBeenCalled();
    });

  });

  describe('Controller: IndexCtrl', function () {


    beforeEach(function () {

      //Make external json used by dev mock available in tests
      module('<%= appPath %>/dev/my-test-mock.json');

      inject(function ($controller, $rootScope, _$state_, _srcDevMyTestMock_) {
        scope = $rootScope.$new();
        IndexCtrl = $controller('IndexCtrl', {
          $scope: scope,
          modelPromise: _srcDevMyTestMock_
        });
      });

    });

    it('should attach init data to scope', function () {
      expect(IndexCtrl.message).toEqual('Hello world!');
    });

  });

});


