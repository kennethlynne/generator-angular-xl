'use strict';

describe('Model: ModelFactory', function () {

    var ModelFactory, $httpBackend, $rootScope;

    beforeEach(function () {

        module('<%= scriptAppName %>');

        inject(function (_ModelFactory_, _$httpBackend_, _$rootScope_) {
            ModelFactory = _ModelFactory_;
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
            $httpBackend.expectPUT('test-url/5', {title:'New title', id:5}).respond(200, {id: 5, title:'New title from server'});
            var model = new ModelFactory({$urlBase:'test-url'});

            model.title = 'New title';
            model.id = 5;

            var promise = model.$save();
            $httpBackend.flush();

            expect(model.title).toBe('New title from server');
            expect(typeof promise.then).toBe('function');
        });
    });

    describe('$set', function () {
        it('should throw if url is not specified', function() {
            function wrapper() {
                new ModelFactory();
            }
            expect(wrapper).toThrow();
        });

        it('should load instance and override with new data', function() {
            var model = new ModelFactory({$urlBase:'url'});

            model.title = 'New title';
            model.id = 5;

            model.$set({id:1});

            expect(model.id).toBe(1);
            expect(model instanceof ModelFactory).toBeTruthy();
        });

        it('should remove properties missing in new object', function() {
            var model = new ModelFactory({$urlBase:'test-url'});

            model.title = 'New title';
            model.id = 5;

            model.$set({id:1});

            expect(model.id).toBe(1);
            expect(model.title).toBeUndefined();
        });
    });

    describe('$delete', function () {
        it('should delete on $delete', function() {
            $httpBackend.expectDELETE('test-url/5').respond(200, {});

            var model = new ModelFactory({$urlBase:'test-url'});
            model.id = 5;

            var promise = model.$delete();
            $httpBackend.flush();

            expect(typeof promise.then).toBe('function');
        });
    });

    describe('$isDirty', function () {
        it('should return false if object is not changed since last save or delete ', function() {
            var model = new ModelFactory({id:1, $urlBase:'test-url'});
            expect(model.$isDirty).toBeFalsy();
        });

        it('should not be dirty initially', function() {
            var model = new ModelFactory({id:5, $urlBase:'test-url'});
            expect(model.$isDirty).toBeFalsy();
            $rootScope.$digest();
            expect(model.$isDirty).toBeFalsy();
        });

        it('should be dirty on change', function() {
            var model = new ModelFactory({id:5, $urlBase:'test-url'});
            $rootScope.$digest();
            model.thing = 'Data';
            $rootScope.$digest();
            expect(model.$isDirty).toBeTruthy();
        });

        it('should not be dirty after save', function() {
            var model = new ModelFactory({id:5, $urlBase:'test-url'});
            $rootScope.$digest();
            model.thing = 'Data';

            $httpBackend.expectPUT('test-url/5', {thing:'Data', id:5}).respond(200, {id: 5, thing:'Data'});
            model.$save();

            $httpBackend.flush();
            expect(model.$isDirty).toBeFalsy();
        });
    });

    describe('$onChange', function () {
        it('should call all registered callbacks on change', function() {
            var cb = jasmine.createSpy('callback1');

            var model = new ModelFactory({id:5, $urlBase:'test-url'});
            model.$onChange(cb);
            $rootScope.$digest();
            expect(cb).not.toHaveBeenCalled();

            model.thing = 'Data';
            $rootScope.$digest();
            expect(cb).toHaveBeenCalled();
        });
    });
});
