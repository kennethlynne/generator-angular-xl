angular.module('<%= scriptAppName %>')
.constant('Config', {
    useMocks:               true,
    viewsD1ir:               'views/',
    API: {
        protocol:           'http',
        host:               'api.example.com',
        port:               '8080',
        path:               '/api',
        fakeDelay:          2000
    }
})
.value('cgBusyTemplateName','views/angular-busy/default-spinner.html')
.run(function(editableOptions) {editableOptions.theme = 'bs3'});
