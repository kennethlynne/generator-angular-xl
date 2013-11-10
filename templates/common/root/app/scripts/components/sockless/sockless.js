'use strict';

angular.module('socklessJS.components')
    .controller('socklessComponentCtrl', function ($scope) {

    })
    .directive('socklessComponent', function (componentFactory, $log) {

        var _linkFn = function link(scope, element, attrs) {

            $log.log('sockless component loaded');
        };

        return componentFactory.createComponent('socklessComponent', {
            link: _linkFn,
            controller: 'socklessComponentCtrl'
        });

    });
