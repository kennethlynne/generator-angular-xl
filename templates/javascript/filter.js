(function(){
  'use strict';

  angular.module('<%= scriptAppName %>')
    .filter('<%= cameledName %>', filterFunction);

    function filterFunction () {
      return function (input) {
        return '<%= cameledName %> filter: ' + input;
      };
    }

}());
