'use strict';

angular.module('<%= scriptAppName %>')
    .config(function ($stateProvider, stateFactory) { $stateProvider.state('<%= statifiedPath %>', stateFactory('<%= classedName %>', {url:'<%= pageUrl %>', templateUrl: '<%= viewTemplateUrl %>'})) })
    .service('<%= classedName %>CtrlInit', function ($q, $log) {

        var _prepare = function () {
            $log.log("<%= classedName %>Ctrl loading");

            return $q.all(['Data from service 1', 'Data from service 2']).then(function (data) {
                $log.log("<%= classedName %>Ctrl loaded!");

                var init = {
                    message1: data[0],
                    message2: data[1]
                };

                return init;
            });
        };

        return {
            prepare: _prepare
        }

    })
    .controller('<%= classedName %>Ctrl', function ($scope, init) {
        $scope.data = init;
    });
