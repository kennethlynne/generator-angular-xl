'use strict';

angular.module('MockAPI')
    .config(function(Config, $provide) {
        //Decorate backend with awesomesauce
        if(Config.useMocks) $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
    })
    .config(function ($httpProvider, Config) {
        if(!Config.useMocks) return;

        $httpProvider.interceptors.push(function ($q, $timeout, Config, $log) {
            return {
                'request': function (config) {
                    $log.log('Requesting ' + config.url, config);
                    return config;
                },
                'response': function (response) {
                    var deferred = $q.defer();

                    if(response.config.url.indexOf(Config.view_dir) == 0) return response; //Let through views immideately

                    //Fake delay on response from APIs and other urls
                    $log.log('Delaying response with ' + Config.API.fakeDelay + 'ms');
                    $timeout(function () {
                        deferred.resolve(response);
                    }, Config.API.fakeDelay);

                    return deferred.promise;
                }

            }
        })

    })
    .run(function (Config, $httpBackend, $log, APIBase, $timeout) {

        //Only load mocks if config says so
        if(!Config.useMocks) return;

        var messages = {};
        messages.data = [{id: 1, text:'Hello World'}];
        messages.index = {};

        angular.forEach(messages.data, function(item, key) {
            messages.index[item.id] = item; //Index messages to be able to do efficient lookups on id
        });

        //Escape string to be able to use it in a regular expression
        function regEsc(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }

        //When backend receives a request to the views folder, pass it through
        $httpBackend.whenGET( RegExp( regEsc( Config.view_dir ) ) ).passThrough();

        //Message should return a list og messages
        $httpBackend.whenGET(APIBase + 'messages').respond(function(method, url, data, headers) {
            return [200, messages.data, {/*headers*/}];
        });

        $httpBackend.whenPOST(APIBase + 'messages').respond(function(method, url, data, headers) {
            var message = angular.fromJson(data);

            messages.data.push(message);
            //You should consider having the back-end being responsible for creating new id tho!
            messages.index[message.id] = message;

            return [200, message, {/*headers*/}];
        });

        //Message/id should return a message
        $httpBackend.whenGET( new RegExp(regEsc(APIBase + 'messages/') + '\\d+$' ) ).respond(function(method, url, data, headers) {
            var id = url.match(/\d+$/)[0];
            return [200, messages.index[id] || null, {/*headers*/}];
        });

    });