(function(){
  'use strict';

  angular.module('<%= scriptAppName %>')
      .config(configFunction);

    function configFunction ($provide) {
      $provide.decorator('<%= cameledName %>', function ($delegate) {
        return $delegate;
      });
    }

}());
