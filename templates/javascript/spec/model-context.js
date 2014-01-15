describe('Model Context: ReportContext', function () {

    var ReportContext, $httpBackend, ReportModel, $rootScope;

    beforeEach(function () {

        module('nsbQualityOnBoard');

        inject(function (_ReportContext_, _$httpBackend_, _ReportModel_, _$rootScope_) {
            ReportContext = _ReportContext_;
            $httpBackend = _$httpBackend_;
            ReportModel = _ReportModel_;
            $rootScope = _$rootScope_;
        });

    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getById', function () {
        it('should return models by id', function() {
            $httpBackend.expectGET(ReportModel.$urlBase + '/5').respond(200, {id: 5, title:'Report title'});

            var promise = ReportContext.getById(5);

            var response;
            promise.then(function (r) {
                response = r;
            });

            $httpBackend.flush();

            expect(response instanceof ReportModel).toBe(true);
            expect(response.id).toEqual(5);
            expect(response.title).toEqual('Report title');
        });

        it('should not do subsequent calls if model already exits in pool', function() {
            $httpBackend.expectGET(ReportModel.$urlBase + '/5').respond(200, {id: 5, title:'Report title'});
            ReportContext.getById(5);
            $httpBackend.flush();

            var promise = ReportContext.getById(5);

            var response;
            promise.then(function (r) {
                response = r;
            });

            $rootScope.$digest();

            expect(response instanceof ReportModel).toBe(true);
            expect(response.id).toEqual(5);
            expect(response.title).toEqual('Report title');
        });

        it('should handle rejects', function() {
            $httpBackend.expectGET(ReportModel.$urlBase + '/5').respond(404, 'No such thang!');

            var promise = ReportContext.getById(5),
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
            $httpBackend.expectGET(ReportModel.$urlBase).respond(200, [{id: 5, title:'Report title'},{id: 6, title:'Report title'}]);

            var promise = ReportContext.getAll();

            var Report5, Report6;
            promise.then(function (r) {
                Report5 = r[0];
                Report6 = r[1];
            });

            $httpBackend.flush();

            expect(Report5 instanceof ReportModel).toBe(true);
            expect(Report5.id).toEqual(5);
            expect(Report5.title).toEqual('Report title');

            expect(Report6 instanceof ReportModel).toBe(true);
            expect(Report6.id).toEqual(6);
            expect(Report6.title).toEqual('Report title');
        });

        it('should handle rejects', function() {
            $httpBackend.expectGET(ReportModel.$urlBase).respond(404, 'No such thang!');

            var promise = ReportContext.getAll(5),
                success = jasmine.createSpy('success'),
                error = jasmine.createSpy('error');

            promise.then(success).catch(error);

            $httpBackend.flush();

            expect(success).not.toHaveBeenCalled();
            expect(error).toHaveBeenCalled();
        });
    });

    describe('attach', function () {

        var ReportModel;

        beforeEach(function () {
            inject(function (_ReportModel_) {
                ReportModel = _ReportModel_;
            });
        });

        it('should throw if trying to attach a model that is not of valid type', function() {
            function wrapper() {
                ReportContext.attach({fails: true});
            }
            expect(wrapper).toThrow();
        });

        it('should return the attached model on subsequent requests', function() {

            ReportContext.attach(new ReportModel({id: 5, title:'Report title'}));

            var Report;

            ReportContext.getById(5).then(function (response) {
                Report = response;
            });

            $rootScope.$digest();

            expect(Report instanceof ReportModel).toBe(true);
            expect(Report.id).toEqual(5);
            expect(Report.title).toEqual('Report title');
        });
    });

    describe('create', function () {
        it('should return a newed up instance of the Report Model', function() {
            var Report = ReportContext.create({title:'New title'});
            expect(Report instanceof ReportModel).toBe(true);
            expect(Report.title).toEqual('New title');
        });
    });

    describe('_pool', function () {
        it('should return a reference to the pool', function() {
            var newReport = {id:19, title:'Yeah!'};
            ReportContext._pool[19] = newReport;

            var Report;
            ReportContext.getById(19).then(function (response) {
                Report = response;
            });
            $rootScope.$digest();

            expect(Report).toBe(newReport);
        });
    });

    describe('saveChanges', function () {
       it('should save all changes in current context to the server');
    });
});