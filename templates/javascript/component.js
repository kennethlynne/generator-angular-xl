'use strict';

angular.module('<%= scriptAppName %>.components')
    .controller('<%= cameledName %>ComponentCtrl', function ($scope, $element) {
        $element.text('this is the <%= _.camelize(name) %> component');
    })
    .directive('<%= cameledName %>Component', function (componentFactory) {
        return componentFactory.createComponent('<%= cameledName %>Component', {
            controller: '<%= cameledName %>ComponentCtrl'
        });
    });
