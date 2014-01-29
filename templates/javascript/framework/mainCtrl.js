'use strict';

angular.module('<%= scriptAppName %>')
    .config(function (stateFactoryProvider) {
        stateFactoryProvider.register('Index', {
            url: '/'
        })
    })
    .controller('IndexCtrl', function ($scope) {
        $scope.message = 'Hello world!';
    });
