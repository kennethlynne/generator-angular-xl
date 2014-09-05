'use strict';

describe('Model: <%= classedName %>Model', function () {

  var <%= classedName %>Model;

  beforeEach(function () {

    module('<%= scriptAppName %>');

    inject(function (_<%= classedName %>Model_) {
      <%= classedName %>Model = _<%= classedName %>Model_;
    });

  });


  it('should do something', function () {
    expect(!!<%= classedName %>Model).toBe(true);
  });

  describe('getById', function () {
    it('should return models by id', function () {
      $httpBackend.expectGET(Model.Settings.url + '/5').respond(200, {id: 5});

      var promise = <%= classedName %>Model.getById(5);

      var response;
      promise.then(function (r) {
        response = r;
      });

      $httpBackend.flush();

      expect(response instanceof Model).toBeTruthy();
      expect(response.id).toEqual(5);
    });

    it('should not do subsequent calls if model already exits in pool', function () {
      $httpBackend.expectGET(Model.Settings.url + '/5').respond(200, {id: 5});
      <%= classedName %>Model.getById(5);
      $httpBackend.flush();

      var promise = <%= classedName %>Model.getById(5);

      var response;
      promise.then(function (r) {
        response = r;
      });

      $rootScope.$digest();

      expect(response instanceof Model).toBeTruthy();
      expect(response.id).toEqual(5);
    });

    it('should handle rejects', function () {
      $httpBackend.expectGET(Model.Settings.url + '/5').respond(404, 'No such thang!');

      var promise = <%= classedName %>Model.getById(5),
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
    it('should return models by id', function () {
      $httpBackend.expectGET(Model.Settings.url).respond(200, [
        {id: 5},
        {id: 6}
      ]);

      var promise = <%= classedName %>Model.getAll();

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

    it('should handle rejects', function () {
      $httpBackend.expectGET(Model.Settings.url).respond(404, 'No such thang!');

      var promise = <%= classedName %>Model.getAll(5),
        success = jasmine.createSpy('success'),
        error = jasmine.createSpy('error');

      promise.then(success).catch(error);

      $httpBackend.flush();

      expect(success).not.toHaveBeenCalled();
      expect(error).toHaveBeenCalled();
    });
  });

});