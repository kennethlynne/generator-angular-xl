'use strict';

angular.module('<%= scriptAppName %>')
    .factory('ModelFactory', function ($q, $http, $rootScope) {

        function ModelFactory(data) {
            var model = this;

            if (!data.$urlBase) {
                throw new Error('You must specify an $urlBase property');
            };

            this.$urlBase = data.$urlBase;

            this.$set(data);

            $rootScope.$watch(function () {
                var copy = angular.copy(model);

                //Remove all properties prefixed with $
                for(var key in copy)
                {
                    //More efficient than indexOf
                    if(key.substr(0,1) === '$') delete copy[key];
                }
                return copy;
            }, function (newVal, oldVal) {
                if(newVal !== oldVal) {
                    model.$isDirty = true;
                    model.$_changeSubscribers.forEach(function (cb) {
                        cb();
                    });
                }
            }, true);
        };

        ModelFactory.prototype = {
            $set: function (data, resetDirty) {
                var model = this;

                if (resetDirty) {
                    model.$isDirty = false;
                }

                //Remove all properties not prefixed with $
                for(var key in model)
                {
                    //More efficient than indexOf
                    if(key.substr(0,1) !== '$') delete model[key];
                }

                angular.extend(model, data);
            },
            $delete: function () {
                var model = this;
                return $http.delete(model.$urlBase + '/' + model.id, model).then(function (response) {
                    model.$set(response.data, true);
                    return response;
                });
            },
            $save: function () {
                var model = this;
                return $http.put(model.$urlBase + '/' + model.id, model).then(function (response) {
                    model.$set(response.data, true);
                    return response;
                });
            },
            $_changeSubscribers: [],
            $isDirty: false,
            $onChange: function (cb) {
                var model = this;
                model.$_changeSubscribers.push(cb);
            }
        };

        return ModelFactory;
    });