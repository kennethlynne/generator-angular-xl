'use strict';

angular.module('<%= scriptAppName %>')
    .config(function (stateFactory) {
        stateFactory.register('Error',{
            url:'/error?code'
        })
    })
    .controller('ErrorCtrl', function ($scope, $stateParams) {
        $scope.errorCode = $stateParams.code;
    });
