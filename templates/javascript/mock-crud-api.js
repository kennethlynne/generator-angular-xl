angular.module('<%= scriptAppName %>')
  .run(function (Config, $httpBackend, $log, APIBaseUrl, regexEscape, guid, mockRepository) {
    if (!Config.API.useMocks) return;

    var collectionUrl = APIBaseUrl + '<%= pluralizedName %>';
    var IdRegExp = /[\d\w-_]+$/.toString().slice(1, -1);

    var <%= pluralizedName %> = collectionUrl;
    var <%= classedNameById %> = new RegExp(regexEscape(collectionUrl + '/') + IdRegExp);

    $log.log('***************************************************************************************************************');
    $log.log('Overriding all calls to `' + collectionUrl + '` with mocks defined in *dev/<%= dasherizedName %>-mocks.js*');
    $log.log('***************************************************************************************************************');

    var seed = [
      {id: guid(), text: 'AngularJS'},
      {id: guid(), text: 'Karma'},
      {id: guid(), text: 'Yeoman'},
      {id: guid(), text: 'Generator-angular-xl'}
    ];

    var classedNameRepo = mockRepository.create();

    angular.forEach(seed, function (item, key) {
      classedNameRepo.insert(item.id, item);
    });

    //GET <%= pluralizedName %>/
    $httpBackend.whenGET(<%= pluralizedName %>).respond(function (method, url, data, headers) {
      $log.debug('Intercepted GET to `' + url + '`', data);
      return [200, classedNameRepo.getAll(), {/*headers*/}];
    });

    //POST <%= pluralizedName %>/
    $httpBackend.whenPOST(<%= pluralizedName %>).respond(function (method, url, data, headers) {
      $log.debug('Intercepted POST to `' + url + '`', data);

      var classedName = classedNameRepo.push(angular.fromJson(data));

      return [200, classedName, {/*headers*/}];
    });

    //GET <%= pluralizedName %>/<id>
    $httpBackend.whenGET(<%= classedNameById %>).respond(function (method, url, data, headers) {
      $log.debug('Intercepted GET to `' + url + '`');
      var id = url.match(new RegExp(IdRegExp))[0];
      var item = classedNameRepo.getById(id);
      return [item ? 200 : 404, item || null, {/*headers*/}];
    });

    //PUT <%= pluralizedName %>/<id>
    $httpBackend.whenPUT(<%= classedNameById %>).respond(function (method, url, data, headers) {
      $log.debug('Intercepted PUT to `' + url + '`');
      var id = url.match(new RegExp(IdRegExp))[0];

      if (!classedNameRepo.getById(id)) {
        return [404, {} , {/*headers*/}];
      }

      var classedName = classedNameRepo.insert(id, angular.fromJson(data));

      return [200, classedName, {/*headers*/}];
    });

    //DELETE <%= pluralizedName %>/<id>
    $httpBackend.whenDELETE(new RegExp(regexEscape(collectionUrl + '/') + IdRegExp)).respond(function (method, url, data, headers) {
      $log.debug('Intercepted DELETE to `' + url + '`');
      var id = url.match(new RegExp(IdRegExp))[0];

      var classedName = classedNameRepo.getById(id);
      if (!classedName) {
        return [404, {} , {/*headers*/}];
      }
      classedNameRepo.remove(classedName.id);

      return [200, classedName , {/*headers*/}];
    });

  });


