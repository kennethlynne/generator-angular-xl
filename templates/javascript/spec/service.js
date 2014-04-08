'use strict';

describe('Service: <%= cameledName %>', function () {

  var <%= cameledName %>;

  beforeEach(function () {

    module('<%= scriptAppName %>');

    inject(function (_<%= cameledName %>_) {
      <%= cameledName %> = _<%= cameledName %>_;
    });

  });


  it('should do something', function () {
    expect(!!<%= cameledName %>).toBe(true);
  });

});