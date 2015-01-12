(function(){
  'use strict';

  angular.module('<%= scriptAppName %>')
      .factory('<%= classedName %>Model', factoryFunction);

    function factoryFunction ($q, $http, $rootScope, BaseModel, APIBaseUrl, $injector) {

      var url = APIBaseUrl + '<%= pluralizedName %>';

      function Model(data) {
        data = data || {};
        data.url = url;
        BaseModel.call(this,data);
      }

      Model.$settings = {url:url};
      Model.prototype = Object.create(BaseModel.prototype);

      //Decorate save to attach this item to the Repository on successful save
      var _$save = Model.prototype.$save;
      Model.prototype.$save = function () {
        var self = this;
        return _$save.apply(this, arguments).then(function (response) {
          var Repository = $injector.get('<%= classedName %>Repository');
          Repository.attach(self);
          return response;
        });
      };

      return Model;
    }

}());
