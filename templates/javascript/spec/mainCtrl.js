'use strict';

describe('Controller: IndexCtrl', function () {

  var IndexCtrl, scope, $rootScope, deferred, promise, AwesomeRepository;

  beforeEach(function () {

    module('<%= scriptAppName %>');

    inject(function ($controller, _$rootScope_, $q) {
      $rootScope = _$rootScope_;

      deferred = $q.defer();
      promise = deferred.promise;

      AwesomeRepository = {
        getAll: jasmine.createSpy('AwesomeRepository.getAll()').and.callFake(function () {
          return promise;
        })
      };

      scope = $rootScope.$new();
      IndexCtrl = $controller('IndexCtrl', {
        $scope: scope,
        AwesomeRepository: AwesomeRepository
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
