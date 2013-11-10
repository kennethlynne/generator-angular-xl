'use strict';

angular.module('<%= scriptAppName %>')
    .controller('<%= classedName %>Ctrl', function ($scope, init) {
        $scope.data = init;
    })
    .service('<%= classedName %>CtrlInit', function ($q) {

        var _prepare = function () {
            var deferred = $q.defer();

            deferred.resolve([
                'Awe',
                'Some',
                'Sauce'
            ]);

            return deferred.promise;
        };

        return {
            prepare: _prepare
        }

    });
