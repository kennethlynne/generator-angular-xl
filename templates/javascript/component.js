'use strict';

angular.module('<%= scriptAppName %>.components')
    .controller('<%= cameledName %>ComponentCtrl', function ($scope, $element) {
        $scope.text = 'this is the <%= _.camelize(name) %> component';
    })
    .component('<%= cameledName %>', function () {
        return {
            controller: '<%= cameledName %>ComponentCtrl'
        };
    });
