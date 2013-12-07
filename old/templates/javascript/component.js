'use strict';

angular.module('<%= scriptAppName %>.components')
    .controller('<%= cameledName %>ComponentCtrl', function ($scope, $element) {
        $element.text('this is the <%= _.camelize(name) %> component');
    })
    .component('<%= cameledName %>', function () {
        return {
            controller: '<%= cameledName %>ComponentCtrl'
        };
    });
