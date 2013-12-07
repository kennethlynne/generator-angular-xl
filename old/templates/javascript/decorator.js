'use strict';

angular.module('<%= scriptAppName %>')
    .config(function ($provide) {
        $provide.decorator('<%= cameledName %>', function ($delegate) {
            return $delegate;
        });
    });
