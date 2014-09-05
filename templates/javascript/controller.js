'use strict';

angular.module('<%= scriptAppName %>')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('<%= stateName %>', stateFactory('<%= name %>', {
      url: '<%= stateUrl %>',
      templateUrl: '<%= viewTemplateUrl %>'
    }));
  })
  .controller('<%= name %>Ctrl', function ($scope) {
  });
