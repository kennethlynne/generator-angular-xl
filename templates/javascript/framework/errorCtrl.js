'use strict';

angular.module('<%= scriptAppName %>')
    .config(function (stateFactoryProvider) {
        stateFactoryProvider.register('Error',{
            url:'/error?code'
        })
    })
    .controller('ErrorCtrl', function ($scope, $stateParams) {
        $scope.errorCode = $stateParams.code;
    });
