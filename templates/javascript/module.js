'use strict';

var components = angular.module('<%= scriptAppName %>.components', []);
angular.componentFacyory.moduleDecorator(components);

var app = angular.module('<%= scriptAppName %>', [<%= angularModules %>]);
angular.componentFacyory.moduleDecorator(app);