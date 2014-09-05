'use strict';

describe('Controller(<%= stateUrl %>): <%= name %>Ctrl', function () {

  var <%= name %>Ctrl, scope;

  beforeEach(function () {

    module('<%= scriptAppName %>');

    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      <%= name %>Ctrl = $controller('<%= name %>Ctrl', {
        $scope: scope
      });
    });
  });

  it('should initialize', function () {
    expect(<%= name %>Ctrl).not.toBeUndefined();
  });
});