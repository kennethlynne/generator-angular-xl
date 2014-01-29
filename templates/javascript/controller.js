'use strict';

angular.module('<%= scriptAppName %>')
    .config(function ($stateProvider, stateFactory) { $stateProvider.state('<%= statifiedPath %>', stateFactory('<%= classedName %>', {url:'<%= pageUrl %>', templateUrl: '<%= viewTemplateUrl %>'})) })
    .service('<%= classedName %>CtrlInit', function ($q, $log) {

        /**
         * An array of functions that return either a value or a promise.
         * For example:
         * UserReposiitory.getAll()
         * 'Hello world'
         */
        var dependancies = [],

            /**
             * Callback that is called when all promises and values are resolved
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
