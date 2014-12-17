'use strict';

angular.module('<%= scriptAppName %>')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('index', stateFactory('Index', {
      url:'/',
      resolve: {
        //help ng-min & ng-annotate out
        modelPromise: ['MyTestRepository',function(MyTestRepository){
          return MyTestRepository.getAll();
        }]
      }
    }));
  })
  .controller('IndexCtrl', function ($scope, modelPromise) {
    $scope.message = modelPromise[0].text;
    console.log('first item text from modelPromise', $scope.message);
  });
