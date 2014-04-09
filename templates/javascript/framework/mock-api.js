'use strict';

angular.module('<%= scriptAppName %>')
  .config(function ($httpProvider, Config, $provide) {
    if (!Config.API.useMocks) return;

    $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);

    var log = window.log;

    var APIUrl = (Config.API.protocol + '://' + Config.API.host + ':' + Config.API.port + Config.API.path + '/');

    $httpProvider.interceptors.push(['$q', '$timeout', 'Config', '$log', function ($q, $timeout, Config, $log) {
      return {
        'request': function (config) {
          log('Requesting `' + config.url + '`', config);
          return config;
        },
        'response': function (response) {
          var deferred = $q.defer();

          if (response.config.url.indexOf(APIUrl) != 0) return response; //Only handle calls to the API

          //Fake delay on response from APIs and other urls
          log('Delaying response with _' + Config.API.fakeDelay + 'ms_');

          $timeout(function () {
            deferred.resolve(response);
          }, Config.API.fakeDelay);

          return deferred.promise;
        }

      };
    }]);

  })
  .factory('mockRepository', function (guid) {

    function repository() {
      this.data = [];
      this.index = {};
    }

    repository.prototype.insert = function (id, item) {
      item.id = id;

      if (this.index[id] ) {
          this.delete(id);
      }

      this.data.push(item);
      this.index[id] = item;
      return item;
    };

    repository.prototype.remove = function (id) {
      for(var prop in this.data) if(this.data[prop].id === id) delete this.data[prop];
      delete this.index[id];
    };

    repository.prototype.push = function (item) {
      item.id = guid();
      this.insert(item.id, item);
      return item;
    };

    repository.prototype.getAll = function () {
      return this.data;
    };

    repository.prototype.getById = function (id) {
      return this.index[id];
    };

    return {
      create: function () {
        return new repository();
      }
    };
  })
  .run(function (Config, $httpBackend, $log, APIBaseUrl, regexEscape) {
    if (!Config.API.useMocks) return;

    function passThrough(url) {
      $httpBackend.whenGET(new RegExp(regexEscape(url))).passThrough();
    }

    passThrough(Config.viewsDir);
    passThrough(Config.componentsDir);
    passThrough(Config.statesDir);

  });
