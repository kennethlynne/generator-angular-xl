(function(){
'use strict';

  angular.module('<%= scriptAppName %>')
    .config(configFunction)
    .controller('IndexCtrl', controllerFunction);

  function configFunction ($stateProvider, stateFactory) {
    $stateProvider.state('index', stateFactory('Index', {
      url:'/',
      resolve: {
        //help ng-min & ng-annotate out
        modelPromise: ['MyTestRepository',function(MyTestRepository){
          return MyTestRepository.getAll();
        }]
      }
    }));
  }

  function controllerFunction ($scope, modelPromise) {
    $scope.message = modelPromise[0].text;
    console.log('first item text from modelPromise', $scope.message);
  }

}());

