'use strict';

angular.module('<%= scriptAppName %>')
    .config(function ($routeProvider) {

        var viewDir = 'views/';

        $routeProvider
            .when('/', {
                templateUrl: viewDir + 'main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
