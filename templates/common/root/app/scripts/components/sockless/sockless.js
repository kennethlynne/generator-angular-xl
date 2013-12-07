'use strict';

angular.module('socklessJS.components.sockless', ['componentFactory'])
    .controller('socklessComponentCtrl', function ($scope) {

    })
    .component('sockless', function () {
        return {
            controller: 'socklessComponentCtrl'
        };
    });
