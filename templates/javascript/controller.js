(function(){
  "use strict";

  angular.module('<%= scriptAppName %>')
      .config(configFunction)<% if (initService) { %>
      .service('<%= classedName %>Init', serviceFunction)<% } %>
      .controller('<%= classedName %>Ctrl', controllerFunction);

    function configFunction ($stateProvider, stateFactory) {
      $stateProvider.state('<%= cameledName %>', stateFactory('<%= classedName %>', {
        url: '<%= stateUrl %>',
        templateUrl: '<%= viewTemplateUrl %>'
      }));
    }

      <% if (initService) { %>function serviceFunction ($q, $log) {

    /**
     * An array of functions that return either a value or a promise.
     * For example:
     *      UserReposiitory.getAll()
     *      'Hello world'
     */
    var dependancies = [],

      /**
       * Callback that is called when all promises and values are resolved.
       * It is called with an array with the resolved values corresponding to the dependancy array.
       * The data returned from this function is injected into the controller as 'init'
       */
      finishedCb = function (reponse) {
        $log.log('<%= classedName %> loaded. Data:', response);
        return {};
      };

    return {
      prepare: function () {
        $log.log('<%= classedName %> loading');
        return $q.all(dependancies).then(finishedCb);
      }
    }
  }<% } %>
    function controllerFunction ($scope<% if (initService) { %>, init<% } %>) {
      $scope.foo = 'bar';
    }

}());

