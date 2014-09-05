'use strict';

angular.module('<%= scriptAppName %>')
  .factory('<%= classedName %>Model', function (_, guid) {

    function parseName(data) {
      return data.name || 'Untitled';
    }

    function <%= classedName %>Model(data) {
      data = data || {};

      this.$set({
        id: data.id || guid(),
        name: parseName(data)
      });
    }

    <%= classedName %>Model.prototype = (function () {
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

    return <%= classedName %>Model;

  });