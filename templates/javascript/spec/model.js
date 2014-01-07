'use strict';

describe('Model: <%= classedName %>Model', function () {

    var <%= classedName %>Model, $httpBackend, $rootScope;

    beforeEach(function () {

        module('<%= scriptAppName %>');

        inject(function (_<%= classedName %>Model_, _$httpBackend_, _$rootScope_) {
            <%= classedName %>Model = _<%= classedName %>Model_;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
        });

    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('$save', function () {
        it('should send its data on $save', function() {
            $httpBackend.expectPUT('/<%= classedName %>/5', {title:'New title', id:5}).respond(200, {id: 5, title:'New title from server'});
            var model = new <%= classedName %>Model();

            model.title = 'New title';
            model.id = 5;

            var promise = model.$save();
            $httpBackend.flush();

            expect(model.title).toBe('New title from server');
            expect(typeof promise.then).toBe('function');
        });
    });

    describe('$set', function () {
        it('should load instance and override with new data', function() {
            var model = new <%= classedName %>Model();

            model.title = 'New title';
            model.id = 5;

            model.$set({id:1});

            expect(model.id).toBe(1);
            expect(model instanceof <%= classedName %>Model).toBeTruthy();
        });

        it('should remove properties missing in new object', function() {
            var model = new <%= classedName %>Model();

            model.title = 'New title';
            model.id = 5;

            model.$set({id:1});

            expect(model.id).toBe(1);
            expect(model.title).toBeUndefined();
        });
    });

    describe('$delete', function () {
        it('should delete on $delete', function() {
            $httpBackend.expectDELETE('/<%= classedName %>/5').respond(200, {});

            var model = new <%= classedName %>Model();
            model.id = 5;

            var promise = model.$delete();
            $httpBackend.flush();

            expect(typeof promise.then).toBe('function');
        });
    });

    describe('$isDirty', function () {
        it('should return false if object is not changed since last save or delete ', function() {
            var model = new <%= classedName %>Model({id:1});
            expect(model.$isDirty).toBeFalsy();
        });

        it('should not be dirty initially', function() {
            var model = new <%= classedName %>Model({id:5});
            expect(model.$isDirty).toBeFalsy();
            $rootScope.$digest();
            expect(model.$isDirty).toBeFalsy();
        });

        it('should be dirty on change', function() {
            var model = new <%= classedName %>Model({id:5});
            $rootScope.$digest();
            model.thing = 'Data';
            $rootScope.$digest();
            expect(model.$isDirty).toBeTruthy();
        });

        it('should not be dirty after save', function() {
            var model = new <%= classedName %>Model({id:5});
            $rootScope.$digest();
            model.thing = 'Data';

            $httpBackend.expectPUT('/<%= classedName %>/5', {thing:'Data', id:5}).respond(200, {id: 5, thing:'Data'});
            model.$save();

            $httpBackend.flush();
            expect(model.$isDirty).toBeFalsy();
        });
    });

    describe('$onChange', function () {
        it('should call all registered callbacks on change', function() {
            var cb = jasmine.createSpy('callback1');

            var model = new <%= classedName %>Model({id:5});
            model.$onChange(cb);
            $rootScope.$digest();
            expect(cb).not.toHaveBeenCalled();

            model.thing = 'Data';
            $rootScope.$digest();
            expect(cb).toHaveBeenCalled();
        });
    });
});

describe('Model Context: <%= classedName %>ModelContext', function () {

    var <%= classedName %>ModelContext, $httpBackend, <%= classedName %>Model, $rootScope;

    beforeEach(function () {

        module('<%= scriptAppName %>');

        inject(function (_<%= classedName %>ModelContext_, _$httpBackend_, _<%= classedName %>Model_, _$rootScope_) {
            <%= classedName %>ModelContext = _<%= classedName %>ModelContext_;
            $httpBackend = _$httpBackend_;
            <%= classedName %>Model = _<%= classedName %>Model_;
            $rootScope = _$rootScope_;
        });

    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getById', function () {
        it('should return models by id', function() {
            $httpBackend.expectGET('/<%= classedName %>/5').respond(200, {id: 5, title:'Post title'});

            var promise = <%= classedName %>ModelContext.getById(5);

            var response;
            promise.then(function (r) {
                response = r;
            });

            $httpBackend.flush();

            expect(response instanceof <%= classedName %>Model).toBe(true);
            expect(response.id).toEqual(5);
            expect(response.title).toEqual('Post title');
        });

        it('should not do subsequent calls if model already exits in pool', function() {
            $httpBackend.expectGET('/<%= classedName %>/5').respond(200, {id: 5, title:'Post title'});
            <%= classedName %>ModelContext.getById(5);
            $httpBackend.flush();

            var promise = <%= classedName %>ModelContext.getById(5);

            var response;
            promise.then(function (r) {
                response = r;
            });

            $rootScope.$digest();

            expect(response instanceof <%= classedName %>Model).toBe(true);
            expect(response.id).toEqual(5);
            expect(response.title).toEqual('Post title');
        });

        it('should handle rejects', function() {
            $httpBackend.expectGET('/<%= classedName %>/5').respond(404, 'No such thang!');

            var promise = <%= classedName %>ModelContext.getById(5),
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
            $httpBackend.expectGET('/<%= classedName %>').respond(200, [{id: 5, title:'Post title'},{id: 6, title:'Post title'}]);

            var promise = <%= classedName %>ModelContext.getAll();

            var <%= classedName %>5, <%= classedName %>6;
            promise.then(function (r) {
                <%= classedName %>5 = r[0];
                <%= classedName %>6 = r[1];
            });

            $httpBackend.flush();

            expect(<%= classedName %>5 instanceof <%= classedName %>Model).toBe(true);
            expect(<%= classedName %>5.id).toEqual(5);
            expect(<%= classedName %>5.title).toEqual('Post title');

            expect(<%= classedName %>6 instanceof <%= classedName %>Model).toBe(true);
            expect(<%= classedName %>6.id).toEqual(6);
            expect(<%= classedName %>6.title).toEqual('Post title');
        });

        it('should handle rejects', function() {
            $httpBackend.expectGET('/<%= classedName %>').respond(404, 'No such thang!');

            var promise = <%= classedName %>ModelContext.getAll(5),
                success = jasmine.createSpy('success'),
                error = jasmine.createSpy('error');

            promise.then(success).catch(error);

            $httpBackend.flush();

            expect(success).not.toHaveBeenCalled();
            expect(error).toHaveBeenCalled();
        });
    });

    describe('attach', function () {

        var <%= classedName %>Model;

        beforeEach(function () {
            inject(function (_<%= classedName %>Model_) {
                <%= classedName %>Model = _<%= classedName %>Model_;
            });
        });

        it('should throw if trying to attach a model that is not of valid type', function() {
            function wrapper() {
                <%= classedName %>ModelContext.attach({fails: true});
            }
            expect(wrapper).toThrow();
        });

        it('should return the attached model on subsequent requests', function() {

            <%= classedName %>ModelContext.attach(new <%= classedName %>Model({id: 5, title:'Post title'}));

            var <%= classedName %>;

            <%= classedName %>ModelContext.getById(5).then(function (response) {
                <%= classedName %> = response;
            });

            $rootScope.$digest();

            expect(<%= classedName %> instanceof <%= classedName %>Model).toBe(true);
            expect(<%= classedName %>.id).toEqual(5);
            expect(<%= classedName %>.title).toEqual('<%= classedName %> title');
        });
    })
});