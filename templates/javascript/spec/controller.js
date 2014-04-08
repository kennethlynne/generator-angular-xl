'use strict';

describe('Controller(<%= stateUrl %>): <%= classedName %>Ctrl', function () {

  var <%= classedName %>Ctrl, scope;

  beforeEach(function () {

    module('<%= scriptAppName %>');

    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      <%= classedName %>Ctrl = $controller('<%= classedName %>Ctrl', {
        $scope: scope
      });
    });
  });

  it('should attach init data to scope', function () {
    expect(scope.foo).toEqual('bar');
  });
});