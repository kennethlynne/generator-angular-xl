angular.module('<%= scriptAppName %>')
    .run(function (Config, $httpBackend, $log, APIBaseUrl, regexEscape, guid) {

        var IdRegExp = '[\\d\\w-_]+$';
        //Only load mocks if config says so
        if(!Config.useMocks) return;

        var <%= dasherizedName %> = {};
        <%= dasherizedName %>.data = [{id: guid(), text:'Hello World'}];
        <%= dasherizedName %>.index = {};

        angular.forEach(<%= dasherizedName %>.data, function(item, key) {
            <%= dasherizedName %>.index[item.id] = item; //Index messages to be able to do efficient lookups on id
        });

        //Message should return a list og messages
        $httpBackend.whenGET(APIBaseUrl + '<%= dasherizedName %>').respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to <%= dasherizedName %>', data);
            return [200, <%= dasherizedName %>.data, {/*headers*/}];
        });

        $httpBackend.whenPOST(APIBaseUrl + '<%= dasherizedName %>').respond(function(method, url, data, headers) {
            $log.log('Intercepted POST to <%= dasherizedName %>', data);
            var <%= classedName %> = angular.fromJson(data);

            <%= classedName %>.id = guid();
            <%= dasherizedName %>.data.push(<%= classedName %>);
            <%= dasherizedName %>.index[<%= dasherizedName %>.id] = <%= classedName %>;

            return [200, <%= classedName %>, {/*headers*/}];
        });

        //<%= dasherizedName %>/id should return a message
        $httpBackend.whenGET( new RegExp(regexEscape(APIBaseUrl + '<%= dasherizedName %>/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to <%= dasherizedName %>');
            var id = url.match( new RegExp(IdRegExp) )[0];
            return [200, <%= dasherizedName %>.index[id] || null, {/*headers*/}];
        });

    });


