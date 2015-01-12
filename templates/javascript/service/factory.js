(function(){
  'use strict';

  angular.module('<%= scriptAppName %>')
      .factory('<%= cameledName %>', factoryFunction);

    function factoryFunction() {

      var _privateVar = 42;

      var _getMeaningOfLife = function () {
        return _privateVar;
      };

      return {
        getMeaningOfLife: _getMeaningOfLife
      }
    }

}());
