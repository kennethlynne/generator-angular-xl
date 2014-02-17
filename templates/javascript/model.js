'use strict';

angular.module('<%= scriptAppName %>')
    .factory('<%= classedName %>Model', function ($q, $http, $rootScope, BaseModel, APIBaseUrl, <%= classedName %>Repository) {

        var url = APIBaseUrl + '<%= pluralizedName %>';

        function <%= classedName %>Model(data) {
            data = data || {};
            data.url = url;
            BaseModel.call(this,data);
        };

        <%= classedName %>Model.$settings = {url:url};
        <%= classedName %>Model.prototype = Object.create(BaseModel.prototype);

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