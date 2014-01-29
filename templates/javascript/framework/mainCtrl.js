'use strict';

angular.module('<%= scriptAppName %>')
    .config(function (stateFactory) {
        stateFactory('Index', {
            url: '/'
        })
    })
    .controller('IndexCtrl', function ($scope) {
    });
