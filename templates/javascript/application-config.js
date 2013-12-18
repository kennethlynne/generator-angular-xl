(function (angular) {

    function pageViewDirectoryFactory(pageName, state, viewName) {
        return 'pages/' + pageName + '/' + (state || 'index') + '/views/' + (viewName || state) + '.html';
    }

    function stateFactory(classedName) {
        return {
            url: '/' + classedName,
            templateUrl: pageViewDirectoryFactory(classedName),
            controller: classedName + 'Ctrl',
            resolve: {
                init: [classedName + 'CtrlInit', function (initService) {
                    return initService.prepare(params);
                }]
            }
        }
    }

    angular.module('<%= scriptAppName %>')
        .constant('Config', {
            useMocks:               true,
            viewsDir:               'views/',
            API: {
                protocol:           'http',
                host:               'api.example.com',
                port:               '8080',
                path:               '/api',
                fakeDelay:          2000
            }
        })
        .config(function (componentFactoryProvider) { componentFactoryProvider.setViewPath(function (componentSnakeName, componentName) {
            return 'components/' + componentSnakeName + '/views/' + componentSnakeName + '.html';
        })})
        .provider('pageViewDirectory', function () {
            this.$get = function () {
                return pageViewDirectoryFactory
            }
        })
        .provider('stateFactory', function () {
            this.$get = function () {
                return stateFactory
            }
        })
        .value('cgBusyTemplateName','views/angular-busy/default-spinner.html')
        .run(function(editableOptions) {editableOptions.theme = 'bs3'});

})(angular)