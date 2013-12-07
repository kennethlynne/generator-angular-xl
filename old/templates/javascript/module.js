'use strict';

var components = angular.module('<%= scriptAppName %>.components', []);
angular.componentFactory.moduleDecorator(components);

var app = angular.module('<%= scriptAppName %>', [<%= angularModules %>]);
angular.componentFactory.moduleDecorator(app);