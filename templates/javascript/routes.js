'use strict';

angular.module('<%= scriptAppName %>')
    .config(function ($urlRouterProvider, $stateProvider) {

        var viewDir = 'views/';

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
                templateUrl: "partials/state1.html"
            })
            .state('state1.list', {
                url: "/list",
                templateUrl: "partials/state1.list.html",
                controller: 'Ctrl'
            });


    });
