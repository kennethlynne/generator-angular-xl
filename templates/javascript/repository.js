'use strict';

angular.module('<%= scriptAppName %>')
    .factory('<%= classedName %>Repository', function ($injector) {
        var BaseRepository = $injector.get('BaseRepository');
        return new BaseRepository({name: '<%= classedName %>Repository', model: $injector.get('<%= classedName %>Model')});
    });