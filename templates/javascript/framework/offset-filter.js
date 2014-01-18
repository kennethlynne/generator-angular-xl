'use strict';

angular.module('<%= scriptAppName %>')
    .filter('offset', function (input, offset) {
        return input.slice(+offset);
    });