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
.value('cgBusyTemplateName','views/angular-busy/default-spinner.html')
.run(function(editableOptions) {editableOptions.theme = 'bs3'});