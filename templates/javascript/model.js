'use strict';

angular.module('<%= scriptAppName %>')
  .factory('<%= classedName %>', function (_, guid, $http, APIBaseUrl) {

    function parseName(data) {
      return data.name || 'Untitled';
    }

    function Model(data) {
      data = data || {};

      this.$set({
        id: data.id || guid(),
        name: parseName(data)
      });
    }

    Model.Settings = {
      url: APIBaseUrl + '<%= pluralizedName %>'
    };

    // You can create static methods
    Model.getAll = function () {

      var promise = $http.get(Model.Settings.url)
        .then(function (response) {
          if (angular.isArray(response.data)) {
            return response.data.map(function (item) {
              return new Model(item);
            });
          }
          else {
            throw new Error('Unexpected response from API. Expected Array, got ' + typeof response.data, response.data);
          }
        });

      return angular.extend(promise);
    };

    Model.getById = function (id) {
      var instance = new Model();

      var promise = $http.get(Model.Settings.url + '/' + id)
        .then(function (response) {
          instance.$set(response.data);
          return instance;
        });

      return angular.extend(promise, {$value: instance});
    };

    Model.prototype = (function () {
      return {

        $set: function (data) {
          var instance = this;

          //Remove all non $ preficed properties from this instance
          for (var key in instance) {
            if (key.substr(0, 1) !== '$') delete instance[key];
          }

          angular.extend(instance, data);
        }

      };
    })();

    return Model;

  });