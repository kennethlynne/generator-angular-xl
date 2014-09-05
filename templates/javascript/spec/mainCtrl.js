'use strict';

describe('Controller: IndexCtrl', function () {

  var IndexCtrl, scope, $rootScope, deferred, promise, AwesomeModel;

  beforeEach(function () {

    module('<%= scriptAppName %>');

    inject(function ($controller, _$rootScope_, $q) {
      $rootScope = _$rootScope_;

      deferred = $q.defer();
      promise = deferred.promise;

      AwesomeModel = {
        getAll: jasmine.createSpy('AwesomeModel.getAll()').and.callFake(function () {
          return promise;
        })
      };

      scope = $rootScope.$new();
      IndexCtrl = $controller('IndexCtrl', {
        $scope: scope,
        AwesomeModel: AwesomeModel
      });
    });
  });

  it('should attach init data to scope', function () {
    var data = [1, 2, 3];
    deferred.resolve(data);
    $rootScope.$digest();
    expect(scope.awesomeThings).toBe(data);
  });
});
