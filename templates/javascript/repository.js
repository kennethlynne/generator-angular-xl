(function(){
  'use strict';

  angular.module('<%= scriptAppName %>')
      .factory('<%= classedName %>Repository', factoryFunction);

    function factoryFunction ($injector, <%= classedName %>Model) {
      var BaseRepository = $injector.get('BaseRepository');
      return new BaseRepository({name: '<%= classedName %>Repository', model: <%= classedName %>Model});
    }

}());
