'use strict';

describe('Filter: <%= cameledName %>', function () {

  var <%= cameledName %>;

  beforeEach(function () {

    module('<%= scriptAppName %>');

    inject(function ($filter) {
      <%= cameledName %> = $filter('<%= cameledName %>');
    });

  });

  it('should return the input prefixed with "<%= cameledName %> filter:"', function () {
    var text = 'angularjs';
    expect(<%= cameledName %>(text)).toBe('<%= cameledName %> filter: ' + text);
  });

});