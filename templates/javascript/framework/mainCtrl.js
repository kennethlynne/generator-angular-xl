'use strict';

angular.module('<%= scriptAppName %>')
    .config(function ($stateProvider, stateFactory) {
        $stateProvider.state('index', stateFactory('Index', {
            url:'/'
        }));
    })
    .controller('IndexCtrl', function ($scope, AwesomeRepository) {
        AwesomeRepository.getAll().then(function (awesomeThings) {
            $scope.awesomeThings = awesomeThings;
        });
    });
