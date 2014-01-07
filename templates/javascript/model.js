'use strict';

angular.module('<%= scriptAppName %>')
    .factory('<%= classedName %>Model', function ($q, $http, $rootScope) {

        //Constructor
        function <%= classedName %>Model(data) {
            var <%= cameledName %> = this;
            this.$set(data);

            $rootScope.$watch(function () {
                var copy = angular.copy(<%= cameledName %>);

                //Remove all properties prefixed with $
                for(var key in copy)
                {
                    //More efficient than indexOf
                    if(key.substr(0,1) === '$') delete copy[key];
                }
                return copy;
            }, function (newVal, oldVal) {
                if(newVal !== oldVal) {
                    <%= cameledName %>.$isDirty = true;
                    <%= cameledName %>.$_changeSubscribers.forEach(function (cb) {
                        cb();
                    });
                }
            }, true);
        };

        <%= classedName %>Model.prototype = {
            $set: function (data, resetDirty) {
                var <%= cameledName %> = this;

                if(resetDirty) {
                    <%= cameledName %>.$isDirty = false;
                }

                //Remove all properties not prefixed with $
                for(var key in <%= cameledName %>)
                {
                    //More efficient than indexOf
                    if(key.substr(0,1) !== '$') delete <%= cameledName %>[key];
                }

                angular.extend(<%= cameledName %>, data);
            },
            $delete: function () {
                var <%= cameledName %> = this;
                return $http.delete('/<%= classedName %>/' + <%= cameledName %>.id, <%= cameledName %>).then(function (response) {
                    <%= cameledName %>.$set(response.data, true);
                    return response;
                });
            },
            $save: function () {
                var <%= cameledName %> = this;
                return $http.put('/<%= classedName %>/' + <%= cameledName %>.id, <%= cameledName %>).then(function (response) {
                    <%= cameledName %>.$set(response.data, true);
                    return response;
                });
            },
            $_changeSubscribers: [],
            $isDirty: false,
            $onChange: function (cb) {
                var <%= cameledName %> = this;
                <%= cameledName %>.$_changeSubscribers.push(cb);
            }
        };

        return <%= classedName %>Model;
    })
    .factory('<%= classedName %>ModelContext', function (<%= classedName %>Model, $q, $http) {

        var _pool = {};

        var _getById = function (id) {
            var deferred = $q.defer();
            var instance = _pool[id];
            if(instance)
            {
                deferred.resolve(instance);
                return deferred.promise;
            }
            else
            {
                return $http.get('/<%= classedName %>/' + id).then(function (response) {
                    var <%= cameledName %> = new <%= classedName %>Model(response.data);
                    _pool[id] = <%= cameledName %>;
                    return <%= cameledName %>;
                });
            }

        };

        var _getAll = function () {
            //TODO: Max length of pool, to not manage to many instances in memory?
            return $http.get('/<%= classedName %>').then(function (response) {
                if(Array.isArray(response.data))
                {
                    return response.data.map(function (item) {
                        var <%= cameledName %> = new <%= classedName %>Model(item);
                        _pool[item.id] = <%= cameledName %>;
                        return <%= cameledName %>;
                    });
                }
            });
        };

        //This is to attach new models to the context
        var _attach = function (item) {
            if(!(item instanceof <%= classedName %>Model)) throw new Error('You must provide a valid <%= classedName %>Model');
            _pool[item.id] = item;
        }

        return {
            getById: _getById,
            getAll: _getAll,
            attach: _attach
        }
    });