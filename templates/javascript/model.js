'use strict';

angular.module('<%= scriptAppName %>')
    .factory('<%= classedName %>Model', function ($q, $http, $rootScope, ModelFactory) {

        function <%= classedName %>Model(data) {
            data = data || {};
            data.$urlBase = '/test-url';
            ModelFactory.call(this,data);
        };

        <%= classedName %>Model.prototype = Object.create(ModelFactory.prototype);

        return <%= classedName %>Model;
    });