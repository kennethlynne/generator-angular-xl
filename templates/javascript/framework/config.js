    angular.module('<%= scriptAppName %>')
        .constant('Config', {
            viewsDir:               'views/',
            componentsDir:          'components/',
            pagesDir:               'pages/',
            API: {
                useMocks:           true,
                protocol:           'http',
                host:               'api.example.com',
                port:               '8080',
                path:               '/api',
                fakeDelay:          800
            }
        })
        .config(function (componentFactoryProvider) { componentFactoryProvider.setViewPath(function (componentSnakeName, componentName) {
            return 'components/' + componentSnakeName + '/' + componentSnakeName + '.html';
        })})
        .value('cgBusyTemplateName','views/angular-busy/default-spinner.html')
        .factory('BaseUrl', function (Config) {
            return (Config.API.protocol + '://' + Config.API.host + ':' + Config.API.port + '/');
        })
        .factory('APIBaseUrl', function (Config) {
            return (Config.API.protocol + '://' + Config.API.host + ':' + Config.API.port + Config.API.path + '/');
        })<% if (xeditableModule) { %>
        .run(function(editableOptions) {editableOptions.theme = 'bs3'})<% } %>;




