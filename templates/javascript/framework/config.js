(function () {
  "use strict";

  angular.module('<%= scriptAppName %>')
    .constant('Config', {
      viewsDir: 'views/',
      componentsDir: 'components/',
      statesDir: 'states/',
      API: {
        useMocks: true,
        protocol: window.location.protocol.split(':')[0],
        host: window.location.hostname,
        port: String(window.location.port || 80),
        path: '/api',
        fakeDelay: 800
      }
    })
    .config(configFunction)
    .value('cgBusyTemplateName', 'views/angular-busy/default-spinner.html')
    .factory('BaseUrl', getBaseUrl)
    .factory('APIBaseUrl', getAPIBaseUrl);

  function configFunction(componentFactoryProvider) {
    componentFactoryProvider.setViewPath(snakify)
  }

  function getBaseUrl (Config) {
    return (Config.API.protocol + '://' + Config.API.host + ':' + Config.API.port + '/');
  }

  function getAPIBaseUrl (Config) {
    return (Config.API.protocol + '://' + Config.API.host + ':' + Config.API.port + Config.API.path + '/');
  }

  function snakify (componentSnakeName, componentName) {
    return 'components/' + componentSnakeName + '/' + componentSnakeName + '.html';
  }

}());





