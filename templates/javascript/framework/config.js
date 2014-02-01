    angular.module('<%= scriptAppName %>')
        .constant('Config', {
            viewsDir:               'views/',
            componentsDir:          'components/',
            pagesDir:               'pages/',
            useMocks:               true,
            API: {
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
        .value('cgBusyTemplateName','views/angular-busy/default-spinner.html')<% if (xeditableModule) { %>
        .run(function(editableOptions) {editableOptions.theme = 'bs3'})<% } %>;




