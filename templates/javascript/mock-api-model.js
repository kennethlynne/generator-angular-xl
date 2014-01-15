angular.module('<%= scriptAppName %>')
    .run(function (Config, $httpBackend, $log, APIBaseUrl, regexEscape, guid) {

        var IdRegExp = '[\\d\\w-_]+$';
        //Only load mocks if config says so
        if(!Config.useMocks) return;

        console.log('Stubbing <%= dasherizedName %> API');
        console.log('************');

        var <%= classedName %> = {};
        <%= classedName %>Repo.data = [{id: guid(), text:'Hello World'}];
        <%= classedName %>Repo.index = {};

        angular.forEach(<%= classedName %>.data, function(item, key) {
            <%= classedName %>Repo.index[item.id] = item; //Index messages to be able to do efficient lookups on id
        });

        //GET <%= dasherizedName %>/ should return a list og messages
        $httpBackend.whenGET(APIBaseUrl + '<%= dasherizedName %>').respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to <%= dasherizedName %>', data);
            return [200, <%= classedName %>Repo.data, {/*headers*/}];
        });

        //POST <%= dasherizedName %>/ should save a message and return the message with an id
        $httpBackend.whenPOST(APIBaseUrl + '<%= dasherizedName %>').respond(function(method, url, data, headers) {
            $log.log('Intercepted POST to <%= dasherizedName %>', data);
            var <%= classedName %> = angular.fromJson(data);

            <%= classedName %>.id = guid();
            <%= classedName %>Repo.data.push(<%= classedName %>);
            <%= classedName %>Repo.index[<%= dasherizedName %>.id] = <%= classedName %>;

            return [200, <%= classedName %>, {/*headers*/}];
        });

        //GET <%= dasherizedName %>/id should return a message
        $httpBackend.whenGET( new RegExp(regexEscape(APIBaseUrl + '<%= dasherizedName %>/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to <%= dasherizedName %>');
            var id = url.match( new RegExp(IdRegExp) )[0];
            return [200, <%= classedName %>Repo.index[id] || null, {/*headers*/}];
        });

    });


