'use strict';

angular.module('<%= scriptAppName %>')
    .config(function ($stateProvider, stateFactoryProvider) { $stateProvider.state('<%= statifiedPath %>', stateFactoryProvider.$get()('<%= classedName %>', {url:'<%= pageUrl %>'})) })
    .service('<%= classedName %>CtrlInit', function ($q, $log) {

        var _prepare = function () {
            $log.log("<%= classedName %>Ctrl loading");

            return $q.all(['Data from service 1', 'Data from service 2']).then(function (data) {
                $log.log("<%= classedName %>Ctrl loaded!");

                var init = {
                    message1: data[0],
                    message2: data[1]
                };

                return init;  //This is the same init that is sent to the controller when it is initialized
            });
        };

        return {
            prepare: _prepare
        }

    })
    .controller('<%= classedName %>Ctrl', function ($scope, init) {
        $scope.data = init;
    });
