function stub() {
    var out = {};
    angular.forEach(arguments, function(m) {
        out[m] = jasmine.createSpy();
    });
    return out;
}

function reject($q, error) {
    var def = $q.defer();
    def.reject(error);
    return def.promise;
}

function resolve($q, val) {
    var def = $q.defer();
    def.resolve(val);
    return def.promise;
}

function customSpy(obj, m, fn) {
    obj[m] = fn;
    spyOn(obj, m).andCallThrough();
}