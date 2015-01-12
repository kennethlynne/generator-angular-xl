(function(){
  'use strict';

  angular.module('<%= scriptAppName %>')
      .config(configFunction)
      .controller('ErrorCtrl', controllerFunction);

  function configFunction ($stateProvider, stateFactory) {
    $stateProvider.state('error', stateFactory('Error', {
      url:'/error?code'
    }));
  }

  function controllerFunction ($scope, $stateParams) {
    $scope.errorCode = $stateParams.code;
  }

}());
