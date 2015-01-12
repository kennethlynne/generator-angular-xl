(function(){
  'use strict';

  angular.module('<%= scriptAppName %>')
      .provider('<%= cameledName %>', providerFunction);

    function providerFunction () {

      // Private variables
      var salutation = 'Hello';

      // Private constructor
      function Greeter() {
        this.greet = function () {
          return salutation;
        };
      }

      // Configuration API
      this.setSalutation = function (s) {
        salutation = s;
      };

      this.$get = function () {
        return new Greeter();
      };
    }

}());

