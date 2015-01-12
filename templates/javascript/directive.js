(function(){
  'use strict';

  angular.module('<%= scriptAppName %>')
      .directive('<%= cameledName %>', directiveFunction);

    function directiveFunction () {

      var _linkFn = function link(scope, element, attrs) {
        element.text('this is the <%= cameledName %> directive');
      };

      return {
        restrict: 'A',
        link: _linkFn
      };

    }

}());

