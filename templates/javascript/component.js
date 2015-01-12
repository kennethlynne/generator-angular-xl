(function(){
  "use strict";

  angular.module('<%= scriptAppName %>.components')
      .controller('<%= cameledName %>ComponentCtrl', controllerFunction)
      .component('<%= cameledName %>', componentFunction);

  function controllerFunction ($scope, $element) {
    $scope.text = 'this is the <%= name %> component';
  }

  function componentFunction () {
    return {
      controller: '<%= cameledName %>ComponentCtrl'
    };
  }

}());

