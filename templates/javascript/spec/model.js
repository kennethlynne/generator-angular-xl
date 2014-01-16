'use strict';

describe('Model: <%= classedName %>Model', function () {

    var <%= classedName %>Model, $httpBackend, $rootScope, APIBaseUrl, <%= classedName %>Context;

    beforeEach(function () {

        <%= classedName %>Context = jasmine.createSpy('<%= classedName %>Context');
        <%= classedName %>Context.attach = jasmine.createSpy('<%= classedName %>Context.attach');

        module('<%= scriptAppName %>', function ($provide) {
            $provide.value('<%= classedName %>Context', <%= classedName %>Context);
        });

        inject(function (_<%= classedName %>Model_, _$httpBackend_, _$rootScope_, _APIBaseUrl_) {
            <%= classedName %>Model = _<%= classedName %>Model_;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            APIBaseUrl = _APIBaseUrl_;
        });

    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should have the $urlBase property set', function() {
        expect(<%= classedName %>Model.$urlBase).toBe(APIBaseUrl + '<%= dasherizedName %>');
    });

    describe('$save', function () {
        it('should PUT its data on $save when it has an ID (update existing)', function() {
            $httpBackend.expectPUT( APIBaseUrl + '<%= dasherizedName %>/5', {title:'New title', id:5}).respond(200, {id: 5, title:'New title from server'});
            var model = new <%= classedName %>Model({title: 'New title', id: 5});

            var promise = model.$save();
            $httpBackend.flush();

            expect(model.title).toBe('New title from server');
            expect(typeof promise.then).toBe('function');
        });

        it('should POST its data on $save if does not have an ID (new)', function() {
            $httpBackend.expectPOST( APIBaseUrl + '<%= dasherizedName %>', {title:'New title'}).respond(200, {id: 5, title:'New title from server'});
            var model = new <%= classedName %>Model({title: 'New title'});

            var promise = model.$save();
            $httpBackend.flush();

            expect(model.title).toBe('New title from server');
            expect(typeof promise.then).toBe('function');
        });

        it('should attach itself to the context on save', function() {
            $httpBackend.expectPUT( APIBaseUrl + '<%= dasherizedName %>/5', {title:'New title', id:5}).respond(200, {id: 5, title:'New title from server'});
            var model = new <%= classedName %>Model({title: 'New title', id: 5});
            expect(<%= classedName %>Context.attach).not.toHaveBeenCalled();
            var promise = model.$save();
            $httpBackend.flush();
            expect(<%= classedName %>Context.attach).toHaveBeenCalledWith(model);
        });
    });

    describe('$set', function () {
        it('should load instance and override with new data', function() {
            var model = new <%= classedName %>Model({title: 'New title', id: 5});

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
            $httpBackend.expectDELETE( APIBaseUrl + '<%= dasherizedName %>/5').respond(200, {});

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

            $httpBackend.expectPUT( APIBaseUrl + '<%= dasherizedName %>/5', {thing:'Data', id:5}).respond(200, {id: 5, thing:'Data'});
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
