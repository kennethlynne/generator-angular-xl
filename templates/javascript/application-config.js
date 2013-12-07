angular.module().constant('Config', {
    useMocks:               true,
    view_dir:               'views/',
    API: {
        protocol:           'http',
        host:               'api.example.com',
        port:               '8080',
        path:               '/api',
        fakeDelay:          2000
    }
});

