'use strict';

angular.module('<%= scriptAppName %>')
  .config(function ($stateProvider, stateFactory) {
    $stateProvider.state('<%= stateName %>', stateFactory('<%= classedName %>', {
      url: '<%= stateUrl %>',
      templateUrl: '<%= viewTemplateUrl %>'
    }));
  })
  .controller('<%= classedName %>Ctrl', function ($scope) {
    $scope.foo = 'bar';
  });
