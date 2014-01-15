'use strict';

angular.module('<%= scriptAppName %>')
    .factory('<%= classedName %>Model', function ($q, $http, $rootScope, ModelFactory, APIBaseUrl) {

        function <%= classedName %>Model(data) {
            data = data || {};
            data.$urlBase = APIBaseUrl + '/test-url';
            ModelFactory.call(this,data);
        };

        <%= classedName %>Model.prototype = Object.create(ModelFactory.prototype);

        return <%= classedName %>Model;
    });