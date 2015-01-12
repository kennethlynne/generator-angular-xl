(function(){
  'use strict';

  angular.module('<%= scriptAppName %>')
      .service('<%= cameledName %>', <%= cameledName %>);

    function <%= cameledName %>() {

      var _privateVar = 42;

      this.meaningOfLife = function () {
        return _privateVar;
      };

    }

}());

