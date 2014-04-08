'use strict';

angular.module('<%= scriptAppName %>.components')
    .controller('<%= cameledName %>ComponentCtrl', function ($scope, $element) {
        $scope.text = '<%= name %> component';
    })
    .component('<%= cameledName %>', function () {
        return {
            controller: '<%= cameledName %>ComponentCtrl'
        };
    });
