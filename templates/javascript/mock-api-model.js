angular.module('<%= scriptAppName %>')
    .run(function (Config, $httpBackend, $log, APIBaseUrl, regexEscape, guid) {

        //Only load mocks if config says so
        if(!Config.useMocks) return;

        var collectionUrl = APIBaseUrl + '<%= dasherizedName %>';
        var IdRegExp = /[\d\w-_]+$/.toString().slice(1, -1);

        console.log('Stubbing <%= dasherizedName %> API - ' + collectionUrl);
        console.log('************');

        var <%= classedName %>Repo = {};
        <%= classedName %>Repo.data = [{id: guid(), text:'Hello World'}];
        <%= classedName %>Repo.index = {};

        angular.forEach(<%= classedName %>Repo.data, function(item, key) {
            <%= classedName %>Repo.index[item.id] = item;
        });

        //GET <%= dasherizedName %>/ should return a list
        $httpBackend.whenGET(collectionUrl).respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to <%= dasherizedName %>', data);
            return [200, <%= classedName %>Repo.data, {/*headers*/}];
        });

        //POST <%= dasherizedName %>/ should save
        $httpBackend.whenPOST(collectionUrl).respond(function(method, url, data, headers) {
            $log.log('Intercepted POST to <%= dasherizedName %>', data);
            var <%= classedName %> = angular.fromJson(data);

            <%= classedName %>.id = guid();
            <%= classedName %>Repo.data.push(<%= classedName %>);
            <%= classedName %>Repo.index[<%= classedName %>.id] = <%= classedName %>;

            return [200, <%= classedName %>, {/*headers*/}];
        });

        //GET <%= dasherizedName %>/id should return one
        $httpBackend.whenGET( new RegExp(regexEscape(collectionUrl + '/') + IdRegExp ) ).respond(function(method, url, data, headers) {
            $log.log('Intercepted GET to <%= dasherizedName %>');
            var id = url.match( new RegExp(IdRegExp) )[0];
            return [200, <%= classedName %>Repo.index[id] || null, {/*headers*/}];
        });

    });


