'use strict';

angular.module('<%= scriptAppName %>')
  .config(function ($provide, Config) {
    $provide.decorator('$log', ['$delegate', function ($delegate) {

      var _log = $delegate.log;
      $delegate.log = function () {
        (window.log || _log).apply(null, arguments);
      };

      $delegate.debug = function () {
        if (Config.environment === 'development') _log.apply(null, arguments);
      };

      if (Config.environment === 'development') $delegate.log('[c="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; color: #fff; font-size: 20px; padding: 15px 20px; background: #444; border-radius: 4px; line-height: 100px; text-shadow: 0 1px #000"]development mode[c]');

      return $delegate;

    }]);
  });
