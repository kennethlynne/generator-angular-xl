'use strict';

angular.module('<%= scriptAppName %>')
    .controller('<%= cameledName %>ComponentCtrl', function ($scope) {

    })
    .directive('<%= cameledName %>Component', function (componentFactory, $log) {

        var _linkFn = function link(scope, element, attrs) {
            element.text('this is the <%= _.camelize(name) %> component');
            $log.log('<%= cameledName %> component loaded');
        };

        return componentFactory.createComponent('<%= cameledName %>Component', {
            link: _linkFn,
            controller: '<%= cameledName %>ComponentCtrl'
        });
        
    });
