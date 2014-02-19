describe('Model Repository: <%= classedName %>Repository', function () {

    var <%= classedName %>Repository, $httpBackend, Model, $rootScope, BaseRepository;

    beforeEach(function () {

        Model = function (p) {
            this.id = p.id;
        };

        Model.$settings = {
            url: 'URL'
        };

        module('<%= scriptAppName %>', function ($provide) {
            $provide.value('<%= classedName %>Model', Model);
        });

        inject(function (_<%= classedName %>Repository_, _$httpBackend_, _$rootScope_, $injector) {
            <%= classedName %>Repository = _<%= classedName %>Repository_;
            $httpBackend = _$httpBackend_;
            BaseRepository = $injector.get('BaseRepository');
            $rootScope = _$rootScope_;
        });

    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be an instance of BaseRepository', function() {
        expect(<%= classedName %>Repository instanceof BaseRepository).toBeTruthy();
    });

    describe('getById', function () {
        it('should return models by id', function() {
            $httpBackend.expectGET(Model.$settings.url + '/5').respond(200, {id: 5});

            var promise = <%= classedName %>Repository.getById(5);

            var response;
            promise.then(function (r) {
                response = r;
            });

            $httpBackend.flush();

            expect(response instanceof Model).toBeTruthy();
            expect(response.id).toEqual(5);
        });

        it('should not do subsequent calls if model already exits in pool', function() {
            $httpBackend.expectGET(Model.$settings.url + '/5').respond(200, {id: 5});
            <%= classedName %>Repository.getById(5);
            $httpBackend.flush();

            var promise = <%= classedName %>Repository.getById(5);

            var response;
            promise.then(function (r) {
                response = r;
            });

            $rootScope.$digest();

            expect(response instanceof Model).toBeTruthy();
            expect(response.id).toEqual(5);
        });

        it('should handle rejects', function() {
            $httpBackend.expectGET(Model.$settings.url + '/5').respond(404, 'No such thang!');

            var promise = <%= classedName %>Repository.getById(5),
                response,
                success = jasmine.createSpy('success'),
                error = jasmine.createSpy('error');

            promise.then(success).catch(error);

            $httpBackend.flush();

            expect(success).not.toHaveBeenCalled();
            expect(error).toHaveBeenCalled();
        });
    });

    describe('getAll', function () {
        it('should return models by id', function() {
            $httpBackend.expectGET(Model.$settings.url).respond(200, [{id: 5},{id: 6}]);

            var promise = <%= classedName %>Repository.getAll();

            var <%= classedName %>5, <%= classedName %>6;
            promise.then(function (r) {
                <%= classedName %>5 = r[0];
                <%= classedName %>6 = r[1];
            });

            $httpBackend.flush();

            expect(<%= classedName %>5 instanceof Model).toBeTruthy();
            expect(<%= classedName %>5.id).toEqual(5);

            expect(<%= classedName %>6 instanceof Model).toBeTruthy();
            expect(<%= classedName %>6.id).toEqual(6);
        });

        it('should handle rejects', function() {
            $httpBackend.expectGET(Model.$settings.url).respond(404, 'No such thang!');

            var promise = <%= classedName %>Repository.getAll(5),
                success = jasmine.createSpy('success'),
                error = jasmine.createSpy('error');

            promise.then(success).catch(error);

            $httpBackend.flush();

            expect(success).not.toHaveBeenCalled();
            expect(error).toHaveBeenCalled();
        });
    });

    describe('attach', function () {

        it('should throw if trying to attach a model that is not of valid type', function() {
            function wrapper() {
                <%= classedName %>Repository.attach({fails: true});
            }
            expect(wrapper).toThrow();
        });

        it('should return the attached model on subsequent requests', function() {

            <%= classedName %>Repository.attach(new Model({id: 5}));

            var <%= classedName %>;

            <%= classedName %>Repository.getById(5).then(function (response) {
                <%= classedName %> = response;
            });

            $rootScope.$digest();

            expect(<%= classedName %> instanceof Model).toBeTruthy();
            expect(<%= classedName %>.id).toEqual(5);
        });
    });

    describe('create', function () {
        it('should return a newed up instance of the <%= classedName %> Model', function() {
            var <%= classedName %> = <%= classedName %>Repository.create({title:'New title'});
            expect(<%= classedName %> instanceof Model).toBeTruthy();
        });
    });

    describe('_cache', function () {
        it('should return a reference to the pool', function() {
            var new<%= classedName %> = {id:19, title:'Yeah!'};
            <%= classedName %>Repository._cache[19] = new<%= classedName %>;

            var <%= classedName %>;
            <%= classedName %>Repository.getById(19).then(function (response) {
                <%= classedName %> = response;
            });
            $rootScope.$digest();

            expect(<%= classedName %>).toBe(new<%= classedName %>);
        });
    });

    describe('saveChanges', function () {
       it('should save all changes in current Repository to the server');
    });
});