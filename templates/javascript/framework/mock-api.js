'use strict';

angular.module('<%= scriptAppName %>')
    .config(function ($httpProvider, Config, $provide) {
        if(!Config.API.useMocks) return;

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

                    if(response.config.url.indexOf(APIUrl) != 0) return response; //Only handle calls to the API

                    //Fake delay on response from APIs and other urls
                    log('Delaying response with _' + Config.API.fakeDelay + 'ms_');

                    $timeout(function () {
                        deferred.resolve(response);
                    }, Config.API.fakeDelay);

                    return deferred.promise;
                }

            }
        }]);

    })
    .run(function (Config, $httpBackend, $log, APIBaseUrl, regexEscape) {
        if(!Config.API.useMocks) return;

        function passThrough(url) {
            $httpBackend.whenGET( new RegExp( regexEscape( url ) ) ).passThrough();
        }

        passThrough(Config.viewsDir);
        passThrough(Config.componentsDir);
        passThrough(Config.pagesDir);

     });