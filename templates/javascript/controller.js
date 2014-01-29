'use strict';

angular.module('<%= scriptAppName %>')
    .config(function (stateFactoryProvider) {
        stateFactoryProvider.register('<%= classedName %>', {
            url:'<%= pageUrl %>',
            templateUrl: '<%= viewTemplateUrl %>'
        })
    })
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
                $log.log("<%= classedName %>Ctrl loaded!");
                return {};
            };

        return {
            prepare: function () {
                $log.log("<%= classedName %>Ctrl loading");
                return $q.all(dependancies).then(finishedCb);
            }
        }

    })
    .controller('<%= classedName %>Ctrl', function ($scope, init) {
        $scope.data = init;
    });
