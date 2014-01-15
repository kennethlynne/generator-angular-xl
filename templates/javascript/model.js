'use strict';

angular.module('<%= scriptAppName %>')
    .factory('<%= classedName %>Model', function ($q, $http, $rootScope, ModelFactory, APIBaseUrl, <%= classedName %>Context) {

        function <%= classedName %>Model(data) {
            data = data || {};
            data.$urlBase = APIBaseUrl + '<%= dasherizedName %>';
            ModelFactory.call(this,data);
        };

        <%= classedName %>Model.$urlBase = APIBaseUrl + '<%= dasherizedName %>';
        <%= classedName %>Model.prototype = Object.create(ModelFactory.prototype);

        //Decorate save to attach this item to the context on successful save
        var _$save = <%= classedName %>Model.prototype.$save;
        <%= classedName %>Model.prototype.$save = function () {
            var <%= classedName %> = this;
            return _$save.apply(this, arguments).then(function (response) {
                <%= classedName %>Context.attach(<%= classedName %>);
                return response;
            });
        };

        return <%= classedName %>Model;
    });