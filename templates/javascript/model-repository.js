'use strict';

angular.module('<%= scriptAppName %>')
    .factory('<%= classedName %>Repository', function ($q, $http, $injector) {

        var _cache = [];

        var $localStorage = $injector.has('$localStorage')?$injector.get('$localStorage'):null;

        //Use local storage to store cache, if available
        if($localStorage)
        {
            $localStorage.repositories = $localStorage.repositories || {};
            $localStorage.repositories['<%= classedName %>'] = $localStorage.repositories['<%= classedName %>'] || [];
            _cache = $localStorage.repositories['category'];
        }

        var _getById = function (id) {
            var <%= classedName %>Model = $injector.get('<%= classedName %>Model');
            var deferred = $q.defer();
            var instance = _cache[id];
            if(instance)
            {
                deferred.resolve(instance);
                return deferred.promise;
            }
            else
            {
                return $http.get(<%= classedName %>Model.$urlBase + '/' + id, {tracker:'<%= classedName %>.getById'}).then(function (response) {
                    var <%= classedName %> = new <%= classedName %>Model(response.data);
                    _cache[id] = <%= classedName %>;
                    return <%= classedName %>;
                });
            }

        };

        var _getAll = function () {
            var <%= classedName %>Model = $injector.get('<%= classedName %>Model');
            //TODO: Max length of pool, to not manage to many instances in memory?
            return $http.get(<%= classedName %>Model.$urlBase, {tracker:'<%= classedName %>.getAll'}).then(function (response) {
                if(Array.isArray(response.data))
                {
                    _cache.length = 0; //empty pool
                    return response.data.map(function (item) {
                        var <%= classedName %> = new <%= classedName %>Model(item);
                        _cache[item.id] = <%= classedName %>;
                        return <%= classedName %>;
                    });
                }
                else {
                    throw new Error('Unexpected response from API. Expected Array, got ' + typeof response.data, response.data);
                }
            });
        };

        //This is to attach new models to the Repository
        var _attach = function (item) {
            var <%= classedName %>Model = $injector.get('<%= classedName %>Model');

            if(!(item instanceof <%= classedName %>Model)) throw new Error('You must provide a valid <%= classedName %>Model');
            _cache[item.id] = item;
        };

        var _create = function (data) {
            var <%= classedName %>Model = $injector.get('<%= classedName %>Model');
            return new <%= classedName %>Model(data);
        };

        return {
            getById: _getById,
            getAll: _getAll,
            attach: _attach,
            create: _create,
            _cache: _cache
        }
    });