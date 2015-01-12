(function(){
  'use strict';

  angular.module('<%= scriptAppName %>')
      .config(configFunction);

    function configFunction ($urlRouterProvider) {
      $urlRouterProvider.when('', '/');
      $urlRouterProvider.otherwise("/error?code=404");
    }

}());
