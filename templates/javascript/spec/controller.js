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
<% if (initService) { %>
describe('Service(<%= stateUrl %>): <%= classedName %>CtrlInit', function () {

  var <%= classedName %>CtrlInit;

  beforeEach(function () {

    module('<%= scriptAppName %>');

    inject(function (_<%= classedName %>CtrlInit_) {
      <%= classedName %>CtrlInit = _<%= classedName %>CtrlInit_;
    });

  });

  it('should have a prepare function', function () {
    expect(typeof <%= classedName %>CtrlInit.prepare).toEqual('function');
  });

  it('should return a promise', function () {
    expect(typeof <%= classedName %>CtrlInit.prepare().then).toEqual('function');
  });

});<% } %>