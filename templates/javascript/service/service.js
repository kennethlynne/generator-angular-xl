'use strict';

angular.module('<%= scriptAppName %>')
  .service('<%= cameledName %>', function () {

    var _privateVar = 42;

    this.meaningOfLife = function () {
      return _privateVar;
    };

  });
