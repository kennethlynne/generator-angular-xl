'use strict';

describe('Model: <%= classedName %>Model', function () {

  var <%= classedName %>Model;

  beforeEach(function () {

    module('<%= scriptAppName %>');

    inject(function (_<%= classedName %>Model_) {
    <%= classedName %>Model = _<%= classedName %>Model_;
    });

   });


  it('should do something', function () {
    expect(!!<%= classedName %>Model).toBe(true);
  });

});