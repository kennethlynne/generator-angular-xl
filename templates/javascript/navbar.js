'use strict';

angular.module('<%= scriptAppName %>.components')
    .controller('navbarComponentCtrl', function ($scope, $element) {
    })
    .component('navbar', function () {
        return {
            controller: 'navbarComponentCtrl'
        };
    });
