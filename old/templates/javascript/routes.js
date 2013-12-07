'use strict';

angular.module('<%= scriptAppName %>')
    .config(function () {

        var viewDir = 'views/';

        //Return controllers init service promise
        function prepare(service, params) {
            return [service, function (instance) {
                return instance.prepare(params);
            }];
        };

//        $routeProvider
//            .when('/', {
//                templateUrl: viewDir + 'main.html',
//                controller: 'MainCtrl',
//                resolve: {
//                    init: prepare('MainCtrlInit')
//                }
//            })
//            .otherwise({
//                redirectTo: '/'
//            });

//        $urlRouterProvider.otherwise("/state1");
//        $stateProvider
//            .state('state1', {
//                url: "/state1",
//                templateUrl: "partials/state1.html"
//            })
//            .state('state1.list', {
//                url: "/list",
//                templateUrl: "partials/state1.list.html",
//                controller: function($scope) {
//                    $scope.items = ["A", "List", "Of", "Items"];
//                }
//            })
//            .state('state2', {
//                url: "/state2",
//                templateUrl: "partials/state2.html"
//            })
//            .state('state2.list', {
//                url: "/list",
//                templateUrl: "partials/state2.list.html",
//                controller: function($scope) {
//                    $scope.things = ["A", "Set", "Of", "Things"];
//                }
//            })
//    });


    });
