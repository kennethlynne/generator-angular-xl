(function(){
  'use strict';

  angular.module('<%= scriptAppName %>')
    .config(configFunction)
    .controller('IndexCtrl', controllerFunction);

  function configFunction ($stateProvider, stateFactory) {
    $stateProvider.state('index', stateFactory('Index', {
      url:'/',
      resolve: {
        modelPromise: getAll
      }
    }));
  }

  function controllerFunction (modelPromise) {
    var vm = this;
    vm.message = modelPromise[0].text;
    console.log('first item text from modelPromise', vm.message);
  }

  function getAll (MyTestRepository) {
    return MyTestRepository.getAll();
  }

}());

