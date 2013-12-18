'use strict';

angular.module('<%= scriptAppName %>')
    .config(function ($stateProvider, stateFactory) { $stateProvider.state('<%= classedName %>', stateFactory('<%= name %>')) })
    .service('<%= classedName %>CtrlInit', function ($q, $log) {

        var _prepare = function () {
            $log.log("<%= classedName %>Ctrl loading");

            return $q.all(['Data from service 1', 'Data from service 2']).then(function (data) {
                $log.log("<%= classedName %>Ctrl loaded!");

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
    .controller('<%= classedName %>Ctrl', function ($scope, init) {
        $scope.data = init;  //Now init.message1 is 'Data from service 1', and init.message2 is 'Data from service 2'
    });
