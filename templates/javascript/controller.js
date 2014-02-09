'use strict';

angular.module('<%= scriptAppName %>')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('<%= cameledName %>', stateFactory('<%= classedName %>', {
            url: '<%= pageUrl %>',
            templateUrl: '<%= viewTemplateUrl %>'
        }));
    })<% if (initService) { %>
    .service('<%= classedName %>CtrlInit', function ($q, $log) {

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
                $log.log('<%= classedName %>Ctrl loaded. Data:', response);
                return {};
            };

        return {
            prepare: function () {
                $log.log('<%= classedName %>Ctrl loading');
                return $q.all(dependancies).then(finishedCb);
            }
        }

    })<% } %>
    .controller('<%= classedName %>Ctrl', function ($scope<% if (initService) { %>, init<% } %>) {
        $scope.foo = 'bar';
    });
