'use strict';

angular.module('<%= scriptAppName %>')
    .factory('<%= classedName %>Model', function ($q, $http, $rootScope, ModelFactory, APIBaseUrl, <%= classedName %>Repository) {

        var url = APIBaseUrl + '<%= dasherizedName %>';

        function <%= classedName %>Model(data) {
            data = data || {};
            data.url = url;
            ModelFactory.call(this,data);
        };

        <%= classedName %>Model.$settings = {url:url};
        <%= classedName %>Model.prototype = Object.create(ModelFactory.prototype);

        //Decorate save to attach this item to the Repository on successful save
        var _$save = <%= classedName %>Model.prototype.$save;
        <%= classedName %>Model.prototype.$save = function () {
            var <%= classedName %> = this;
            return _$save.apply(this, arguments).then(function (response) {
                <%= classedName %>Repository.attach(<%= classedName %>);
                return response;
            });
        };

        return <%= classedName %>Model;
    });