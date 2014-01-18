'use strict';

angular.module('<%= scriptAppName %>')
    .filter('offset', function () {
        return function (input, offset) {
            return input.slice(+offset);
        }
    });