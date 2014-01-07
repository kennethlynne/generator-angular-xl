'use strict';

angular.module('<%= scriptAppName %>')
    .factory('<%= classedName %>Model', function ($q, $http, $rootScope) {

        //Constructor
        function Blogpost(data) {
            var post = this;
            this.$set(data);

            $rootScope.$watch(function () {
                var copy = angular.copy(post);

                //Remove all properties prefixed with $
                for(var key in copy)
                {
                    //More efficient than indexOf
                    if(key.substr(0,1) === '$') delete copy[key];
                }
                return copy;
            }, function (newVal, oldVal) {
                if(newVal !== oldVal) {
                    post.$isDirty = true;
                    post.$_changeSubscribers.forEach(function (cb) {
                        cb();
                    });
                }
            }, true);
        };

        Blogpost.prototype = {
            $set: function (data, resetDirty) {
                var post = this;

                if(resetDirty) {
                    this.$isDirty = false;
                }

                //Remove all properties not prefixed with $
                for(var key in post)
                {
                    //More efficient than indexOf
                    if(key.substr(0,1) !== '$') delete post[key];
                }

                angular.extend(post, data);
            },
            $delete: function () {
                var post = this;
                return $http.delete('/posts/' + post.id, post).then(function (response) {
                    post.$set(response.data, true);
                    return response;
                });
            },
            $save: function () {
                var post = this;
                return $http.put('/posts/' + post.id, post).then(function (response) {
                    post.$set(response.data, true);
                    return response;
                });
            },
            $_changeSubscribers: [],
            $isDirty: false,
            $onChange: function (cb) {
                var post = this;
                post.$_changeSubscribers.push(cb);
            }
        };

        return Blogpost;
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
                return $http.get('/posts/' + id).then(function (response) {
                    var post = new <%= classedName %>Model(response.data);
                    _pool[id] = post;
                    return post;
                });
            }

        };

        var _getAll = function () {
            //TODO: Max length of pool, to not manage to many instances in memory?
            return $http.get('/posts').then(function (response) {
                if(Array.isArray(response.data))
                {
                    return response.data.map(function (item) {
                        var post = new <%= classedName %>Model(item);
                        _pool[item.id] = post;
                        return post;
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