(function(){
  'use strict';

  angular.module('<%= scriptAppName %>.components')
      .controller('navbarComponentCtrl', controllerFunction)
      .component('navbar', componentFunction);

    function controllerFunction($scope, $element) {
      var vm = this;
      vm.text = 'this is the navbar component';
    }

    function componentFunction() {
      return {
        controller: 'navbarComponentCtrl',
        controllerAs: 'vm'
      };
    }

}());
