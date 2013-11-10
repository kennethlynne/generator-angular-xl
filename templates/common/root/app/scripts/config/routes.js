'use strict';

angular.module('<%= scriptAppName %>')
    .config(function ($routeProvider) {

        var viewDir = 'views/';

        //Return controllers init service promise
        function prepare(service, params) {
            return [service, function (instance) {
                return instance.prepare(params);
            }];
        };

        $routeProvider
            .when('/', {
                templateUrl: viewDir + 'main.html',
                controller: 'MainCtrl',
                resolve: {
                    init: prepare('MainCtrlInit')
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    });
