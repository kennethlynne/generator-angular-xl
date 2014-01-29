'use strict';

angular.module('<%= scriptAppName %>')
    .config(function (stateFactory) {
        stateFactory.register('Index', {
            url: '/'
        })
    })
    .controller('IndexCtrl', function ($scope) {
    });
