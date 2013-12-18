'use strict';

angular.module('<%= scriptAppName %>')
    .config(function ($urlRouterProvider, $stateProvider, pageViewDirectoryFactory) {

        //Return controllers init service promise
        function prepare(service, params) {
            return [service, function (instance) {
                return instance.prepare(params);
            }];
        };

        $urlRouterProvider.otherwise("/error?type=404");

        $stateProvider
            .state('error', {
                url: "/error",
                templateUrl: pageViewDirectoryFactory('error'),
                controller: function () {}
            });
    });
