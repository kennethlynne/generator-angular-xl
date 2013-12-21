'use strict';

angular.module('<%= scriptAppName %>')
    .config(function ($stateProvider, stateFactoryProvider) {
        $stateProvider.state('Main', stateFactoryProvider.$get()('Main', {url:'/'}))
    })
    .service('MainCtrlInit', function ($q, $log) {

        var _prepare = function () {
            $log.log("MainCtrl loading");

            return $q.all(['Data from service 1', 'Data from service 2']).then(function (data) {
                $log.log("MainCtrl loaded!");

                return {
                    message1: data[0],
                    message2: data[1]
                }
            });
        };

        return {
            prepare: _prepare
        }

    })
    .controller('MainCtrl', function ($scope, init) {
        $scope.data = init;
    });
